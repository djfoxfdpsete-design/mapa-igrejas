import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { macroRegions as initialMacros, initialRegionals } from '../data/initialData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [macros, setMacros] = useState([]);
  const [regionals, setRegionals] = useState([]);
  const [churches, setChurches] = useState([]);
  
  const [selectedMacro, setSelectedMacro] = useState(null);
  const [selectedRegional, setSelectedRegional] = useState(null);

  // Load Data from Supabase
  const loadData = async () => {
    let { data: macrosData } = await supabase.from('macros').select('*');
    let { data: regionalsData } = await supabase.from('regionals').select('*');
    let { data: churchesData } = await supabase.from('churches').select('*');

    // Inicialização da base de dados se estiver vazia
    if (!macrosData || macrosData.length === 0) {
      await supabase.from('macros').insert(initialMacros);
      macrosData = initialMacros;
    }
    
    if (!regionalsData || regionalsData.length === 0) {
      await supabase.from('regionals').insert(initialRegionals);
      regionalsData = initialRegionals;
    }

    setMacros(macrosData || []);
    setRegionals(regionalsData || []);
    setChurches(churchesData || []);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Update in Supabase and State
  const updateRegional = async (id, newName, newCount, pastorName = '', phone = '', address = '', photoUrl = '') => {
    const updatedCount = parseInt(newCount) || 0;
    
    // Optimistic UI Update
    setRegionals(prev => 
      prev.map(r => r.id === id ? { ...r, name: newName, churchesCount: updatedCount, pastor_name: pastorName, phone, address, photo_url: photoUrl } : r)
    );

    if (selectedRegional && selectedRegional.id === id) {
      setSelectedRegional(prev => ({ ...prev, name: newName, churchesCount: updatedCount, pastor_name: pastorName, phone, address, photo_url: photoUrl }));
    }

    // Database Update
    await supabase
      .from('regionals')
      .update({ name: newName, churchesCount: updatedCount, pastor_name: pastorName, phone, address, photo_url: photoUrl })
      .eq('id', id);
  };

  const addChurch = async (regionalId, churchName) => {
    const { data, error } = await supabase
      .from('churches')
      .insert([{ name: churchName, regional_id: regionalId }])
      .select();
    
    if (data && data.length > 0) {
      setChurches(prev => [...prev, data[0]]);
    }
  };

  const deleteChurch = async (churchId) => {
    await supabase.from('churches').delete().eq('id', churchId);
    setChurches(prev => prev.filter(c => c.id !== churchId));
  };

  const login = (password) => {
    if (password === 'lideranca123' || password === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      macros,
      regionals,
      churches,
      selectedMacro, setSelectedMacro,
      selectedRegional, setSelectedRegional,
      updateRegional,
      addChurch,
      deleteChurch
    }}>
      {children}
    </AppContext.Provider>
  );
};
