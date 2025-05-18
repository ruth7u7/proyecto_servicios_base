import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import LoginSimulation from './LoginSimulation';
import UserMenu from './UserMenu';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, account, connect, disconnect, isConnecting } = useWeb3();
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulatedUser, setSimulatedUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userMenuRef = useRef(null);

  // Cerrar el menú de usuario al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Aplicar modo oscuro
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleConnectWallet = async () => {
    if (isConnected) {
      disconnect();
      setSimulatedUser(null);
    } else if (simulatedUser) {
      setShowUserMenu(!showUserMenu);
    } else {
      // En modo de simulación, mostrar el modal de simulación en lugar de conectar wallet
      setShowSimulationModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      await connect();
      setShowLoginModal(false);
    } catch (error) {
      console.error('Error al conectar wallet:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirigir a la página de inicio con el término de búsqueda
    navigate('/?search=' + encodeURIComponent(searchTerm));
  };

  const handleSimulatedLogin = (userData) => {
    setSimulatedUser(userData);
    setShowSimulationModal(false);
  };

  const handleLogout = () => {
    setSimulatedUser(null);
    setShowUserMenu(false);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const shortenAddress = (address) => {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <h1>[NombredelaWeb]</h1>
          </Link>
        </div>
        <div className="header-right">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="search" 
              value={searchTerm} 
              onChange={handleSearchChange} 
              placeholder="Buscar servicios o proveedores" 
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
          <button 
            className="dark-mode-toggle" 
            onClick={handleToggleDarkMode}
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/trabaja-con-nosotros" className="work-with-us-link-header">
            Trabaja con nosotros
          </Link>
          <div className="wallet-connect" ref={userMenuRef}>
            <button 
              className={`connect-button ${isConnected || simulatedUser ? 'connected' : ''}`} 
              onClick={handleConnectWallet}
              disabled={isConnecting}
            >
              {isConnecting 
                ? 'Conectando...' 
                : isConnected 
                  ? `Hola, ${shortenAddress(account)}` 
                  : simulatedUser
                    ? `Hola, ${simulatedUser.name.split(' ')[0]}`
                    : 'Ingresar'}
            </button>
            
            {showUserMenu && simulatedUser && (
              <UserMenu 
                user={simulatedUser}
                onLogout={handleLogout}
                onToggleDarkMode={handleToggleDarkMode}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de inicio de sesión con wallet */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <h2>Iniciar Sesión</h2>
            <p>Para acceder a todas las funcionalidades de nuestra plataforma, necesitas conectar tu wallet.</p>
            
            <div className="wallet-options">
              <button className="wallet-option" onClick={handleLogin}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" />
                <span>Conectar con MetaMask</span>
              </button>
              <button className="wallet-option">
                <img src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" alt="WalletConnect" />
                <span>Conectar con WalletConnect</span>
              </button>
            </div>
            
            <p className="login-info">
              ¿No tienes una wallet? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Instala MetaMask</a>
            </p>
            
            <button className="close-modal" onClick={() => setShowLoginModal(false)}>×</button>
          </div>
        </div>
      )}

      {/* Modal de simulación de inicio de sesión */}
      <LoginSimulation 
        isOpen={showSimulationModal} 
        onClose={() => setShowSimulationModal(false)}
        onLogin={handleSimulatedLogin}
      />
    </header>
  );
};

export default Header;
