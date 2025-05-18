import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import '../styles/ProviderDetails.css';

const ProviderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, connect } = useWeb3();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileViews, setProfileViews] = useState(0);
  
  // Scroll al inicio de la página al cargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Obtener el proveedor de la ubicación o cargar datos de ejemplo
  const provider = location.state?.provider || {
    id: id,
    name: 'Proveedor de Ejemplo',
    serviceType: 'SERVICIO',
    walletAddress: '0x1234...5678',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Profesional con amplia experiencia en el sector.',
    experience: '5 años',
    location: 'Lima, Perú',
    rating: 4.8,
    completedJobs: 127,
    contactInfo: {
      phone: '+51 987 654 321',
      email: 'proveedor@ejemplo.com'
    },
    isProvider: true,
    profileViews: 238
  };

  // Incrementar contador de vistas al cargar la página
  useEffect(() => {
    // En una aplicación real, esto se haría con una llamada a la API
    // Para esta simulación, solo actualizamos el estado local
    setProfileViews(provider.profileViews || Math.floor(Math.random() * 300) + 50);
    
    // Simulamos el incremento de vistas
    const timer = setTimeout(() => {
      setProfileViews(prev => prev + 1);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [provider.profileViews]);

  // Imágenes de muestra de trabajos realizados
  const sampleWorks = [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  const handleContactProvider = () => {
    if (!isConnected) {
      setShowLoginModal(true);
    } else {
      alert(`Contactando a ${provider.name}. En una aplicación real, esto enviaría un mensaje o iniciaría una conversación.`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="provider-details-container">
      <button className="back-button" onClick={handleGoBack}>
        ← Volver
      </button>
      
      <div className="provider-header">
        <div className="provider-image-large">
          <img src={provider.image} alt={provider.name} />
        </div>
        <div className="provider-info-header">
          <h1>{provider.name}</h1>
          <div className="provider-badge">{provider.serviceType}</div>
          <div className="provider-rating">
            {'★'.repeat(Math.floor(provider.rating))}
            {'☆'.repeat(5 - Math.floor(provider.rating))}
            <span className="rating-number">{provider.rating}</span>
          </div>
          <p className="provider-address">Wallet: {provider.walletAddress}</p>
          <p className="provider-location">{provider.location}</p>
          <div className="provider-stats">
            <div className="stat">
              <span className="stat-number">{provider.experience}</span>
              <span className="stat-label">Experiencia</span>
            </div>
            <div className="stat">
              <span className="stat-number">{provider.completedJobs}</span>
              <span className="stat-label">Trabajos</span>
            </div>
            {provider.isProvider && (
              <div className="stat">
                <span className="stat-number">{profileViews}</span>
                <span className="stat-label">Vistas</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="provider-section">
        <h2>Acerca del proveedor</h2>
        <p className="provider-description">{provider.description}</p>
      </div>
      
      <div className="provider-section">
        <h2>Trabajos realizados</h2>
        <div className="work-samples">
          {sampleWorks.map((work, index) => (
            <div key={index} className="work-sample">
              <img src={work} alt={`Trabajo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="provider-section">
        <h2>Información de contacto</h2>
        {isConnected ? (
          <div className="contact-info">
            <p><strong>Teléfono:</strong> {provider.contactInfo.phone}</p>
            <p><strong>Email:</strong> {provider.contactInfo.email}</p>
            <button 
              className="contact-button" 
              onClick={handleContactProvider}
            >
              Contactar
            </button>
          </div>
        ) : (
          <div className="connect-wallet-section">
            <p>Para ver la información de contacto, primero debes iniciar sesión</p>
            <p className="security-note">Esto nos ayuda a proteger la información personal de nuestros proveedores y evitar fraudes.</p>
            <button 
              onClick={() => setShowLoginModal(true)} 
              className="connect-wallet-btn"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>

      {/* Modal de inicio de sesión */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <h2>Iniciar Sesión</h2>
            <p>Para contactar a los proveedores y ver su información, necesitas iniciar sesión.</p>
            <p className="security-note">Esto nos ayuda a proteger la información personal de nuestros proveedores y evitar fraudes.</p>
            
            <div className="wallet-options">
              <button className="wallet-option" onClick={() => {
                connect();
                setShowLoginModal(false);
              }}>
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
    </div>
  );
};

export default ProviderDetails;
