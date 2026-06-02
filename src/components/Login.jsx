import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Senha incorreta. Acesso restrito à liderança.');
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="glass-panel" style={{
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
          Mapa Estratégico
        </h1>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Acesso Exclusivo Liderança - Goiás</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Digite a senha de acesso..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.8)',
              marginBottom: '16px',
              fontSize: '16px'
            }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
            Entrar no Painel
          </button>
        </form>
        
        <p style={{ marginTop: '24px', fontSize: '12px', color: '#64748b' }}>
          Dica para testes: use a senha <b>1234</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
