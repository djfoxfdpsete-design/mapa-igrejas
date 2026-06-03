import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Map, List, Edit2, Download, LogOut, ChevronLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Sidebar = () => {
  const { 
    macros, 
    regionals, 
    churches,
    selectedMacro, 
    setSelectedMacro, 
    selectedRegional, 
    setSelectedRegional,
    updateRegional,
    addChurch,
    deleteChurch,
    setIsAuthenticated // Mock logout
  } = useContext(AppContext);

  const [newChurchName, setNewChurchName] = useState('');

  const totalIgrejas = regionals.reduce((sum, r) => sum + r.churchesCount, 0);

  const exportPDF = async () => {
    const element = document.getElementById('map-export-area');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const title = selectedRegional 
        ? `Relatorio_Regional_${selectedRegional.name}.pdf` 
        : `Relatorio_Geral_Igrejas_GO.pdf`;
        
      pdf.save(title);
    } catch (e) {
      console.error("Erro ao gerar PDF", e);
      alert("Erro ao gerar o PDF. Tente novamente.");
    }
  };

  return (
    <div className="glass-panel" style={{ 
      width: 'var(--sidebar-width)', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '0',
      borderLeft: 'none',
      borderTop: 'none',
      borderBottom: 'none',
      zIndex: 10
    }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
          Mapa Estratégico
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>Estado de Goiás</p>
      </div>

      {/* Global Stats */}
      {!selectedRegional && !selectedMacro && (
        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>145</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Total Mapa</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{totalIgrejas}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Cadastradas</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>46</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Regionais</div>
            </div>
          </div>
          
          <button onClick={exportPDF} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Download size={16} /> Baixar PDF Geral
          </button>
        </div>
      )}

      {/* Navigation & Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        
        {/* View: Regional Selected */}
        {selectedRegional && (
          <div>
             <button 
              onClick={() => setSelectedRegional(null)}
              style={{ background: 'transparent', color: 'var(--primary)', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center' }}
            >
              <ChevronLeft size={20} /> Voltar
            </button>

            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Editar Regional</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Nome da Sede (Cidade)</label>
              <input 
                type="text" 
                className="edit-input" 
                value={selectedRegional.name}
                onChange={(e) => updateRegional(selectedRegional.id, e.target.value, selectedRegional.churchesCount, selectedRegional.pastor_name, selectedRegional.phone, selectedRegional.address, selectedRegional.photo_url)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Pastor / Liderança</label>
              <input 
                type="text" 
                className="edit-input" 
                placeholder="Ex: Pr. João"
                value={selectedRegional.pastor_name || ''}
                onChange={(e) => updateRegional(selectedRegional.id, selectedRegional.name, selectedRegional.churchesCount, e.target.value, selectedRegional.phone, selectedRegional.address, selectedRegional.photo_url)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Telefone de Contato</label>
              <input 
                type="text" 
                className="edit-input" 
                placeholder="(62) 99999-9999"
                value={selectedRegional.phone || ''}
                onChange={(e) => updateRegional(selectedRegional.id, selectedRegional.name, selectedRegional.churchesCount, selectedRegional.pastor_name, e.target.value, selectedRegional.address, selectedRegional.photo_url)}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Qtd de Igrejas Vinculadas</label>
              <input 
                type="number" 
                className="edit-input" 
                value={selectedRegional.churchesCount}
                onChange={(e) => updateRegional(selectedRegional.id, selectedRegional.name, e.target.value, selectedRegional.pastor_name, selectedRegional.phone, selectedRegional.address, selectedRegional.photo_url)}
              />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
            
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Igrejas Locais</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input 
                type="text" 
                className="edit-input" 
                placeholder="Nome da Igreja..."
                value={newChurchName}
                onChange={(e) => setNewChurchName(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
              />
              <button 
                onClick={() => {
                  if(newChurchName.trim()) {
                    addChurch(selectedRegional.id, newChurchName);
                    setNewChurchName('');
                  }
                }}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0 12px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
              {churches.filter(c => c.regional_id === selectedRegional.id).map(church => (
                <li key={church.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', marginBottom: '6px', fontSize: '13px' }}>
                  <span>{church.name}</span>
                  <button 
                    onClick={() => deleteChurch(church.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    X
                  </button>
                </li>
              ))}
              {churches.filter(c => c.regional_id === selectedRegional.id).length === 0 && (
                <li style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '10px 0' }}>Nenhuma igreja cadastrada</li>
              )}
            </ul>

            <button onClick={exportPDF} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', marginTop: '24px' }}>
              <Download size={16} /> Baixar PDF da Regional
            </button>
          </div>
        )}

        {/* View: Macro Selected */}
        {selectedMacro && !selectedRegional && (
          <div>
            <button 
              onClick={() => setSelectedMacro(null)}
              style={{ background: 'transparent', color: 'var(--primary)', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center' }}
            >
              <ChevronLeft size={20} /> Voltar
            </button>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: selectedMacro.colorHex }}></span>
              Região {selectedMacro.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {regionals.filter(r => r.macroRegionId === selectedMacro.id).map(r => (
                <div 
                  key={r.id} 
                  onClick={() => setSelectedRegional(r)}
                  style={{ 
                    padding: '12px', 
                    background: 'rgba(255,255,255,0.5)', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid transparent',
                    transition: '0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <span style={{ fontWeight: 500 }}>{r.name}</span>
                  <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>{r.churchesCount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View: List All Macros */}
        {!selectedRegional && !selectedMacro && (
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#64748b', marginBottom: '16px', letterSpacing: '1px' }}>Macrorregiões</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {macros.map(macro => {
                const regCount = regionals.filter(r => r.macroRegionId === macro.id).length;
                return (
                  <div 
                    key={macro.id} 
                    onClick={() => setSelectedMacro(macro)}
                    style={{ 
                      padding: '12px', 
                      background: 'rgba(255,255,255,0.5)', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: '0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'white'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                  >
                    <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: macro.colorHex }}></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '14px' }}>{macro.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{regCount} Regionais</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Footer Logout */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)' }}>
        <button 
          onClick={() => window.location.reload()} // For simplicity in mock logout
          style={{ width: '100%', background: 'transparent', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #ef4444' }}
        >
          <LogOut size={16} /> Sair do Sistema
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
