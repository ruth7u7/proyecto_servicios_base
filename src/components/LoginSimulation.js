import React, { useState } from 'react';
import '../styles/LoginSimulation.css';

const LoginSimulation = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState('connect');
  const [walletData, setWalletData] = useState({
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    balance: '1.245 ETH'
  });
  const [userData, setUserData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ciudades del Perú (ejemplo)
  const cities = ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco', 'Iquitos', 'Huancayo'];
  
  // Distritos (ejemplo para Lima)
  const districts = {
    'Lima': ['Cercado de Lima', 'Ate', 'Barranco', 'Breña', 'Comas', 'Chorrillos', 'El Agustino', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Magdalena', 'Miraflores', 'Pueblo Libre', 'Rímac', 'San Borja', 'San Isidro', 'San Miguel', 'Santiago de Surco', 'Surquillo'],
    'Arequipa': ['Arequipa', 'Alto Selva Alegre', 'Cayma', 'Cerro Colorado', 'Jacobo Hunter', 'Mariano Melgar', 'Miraflores', 'Paucarpata', 'Sabandía', 'Sachaca', 'Socabaya', 'Tiabaya', 'Yanahuara'],
    'Trujillo': ['Trujillo', 'El Porvenir', 'Florencia de Mora', 'Huanchaco', 'La Esperanza', 'Laredo', 'Moche', 'Salaverry', 'Víctor Larco Herrera'],
    'Chiclayo': ['Chiclayo', 'José Leonardo Ortiz', 'La Victoria', 'Pimentel', 'Pomalca', 'Monsefú', 'Reque', 'Santa Rosa'],
    'Piura': ['Piura', 'Castilla', 'Catacaos', 'La Arena', 'La Unión', 'Las Lomas', 'Tambo Grande', 'Veintiséis de Octubre'],
    'Cusco': ['Cusco', 'Ccorca', 'Poroy', 'San Jerónimo', 'San Sebastián', 'Santiago', 'Saylla', 'Wanchaq'],
    'Iquitos': ['Iquitos', 'Belén', 'Punchana', 'San Juan Bautista'],
    'Huancayo': ['Huancayo', 'Chilca', 'El Tambo', 'Pilcomayo', 'San Agustín', 'San Jerónimo de Tunán']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    
    // Resetear distrito si cambia la ciudad
    if (name === 'city') {
      setUserData(prev => ({ ...prev, district: '' }));
    }
  };

  const handleConnectWallet = () => {
    setIsLoading(true);
    
    // Simulamos la conexión con la wallet
    setTimeout(() => {
      setIsLoading(false);
      setStep('profile');
    }, 1500);
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    const requiredFields = ['fullName', 'city', 'district', 'address'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      setError(`Por favor, completa los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      return;
    }
    
    // Simulación de registro exitoso
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: userData.fullName,
        walletAddress: walletData.address
      });
      onClose();
    }, 1000);
  };

  const resetModal = () => {
    setStep('connect');
    setUserData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      district: ''
    });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="login-simulation-overlay" onClick={() => { onClose(); resetModal(); }}>
      <div className="login-simulation-modal" onClick={e => e.stopPropagation()}>
        {step === 'connect' ? (
          <div className="wallet-connect-step">
            <h2>Conecta tu Wallet</h2>
            <p className="wallet-connect-intro">Para acceder a nuestra plataforma, necesitas conectar tu wallet digital.</p>
            
            <div className="wallet-selection">
              <div className="wallet-option-card" onClick={handleConnectWallet}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" />
                <h3>MetaMask</h3>
                <p>La wallet más popular para navegadores web</p>
              </div>
              
              <div className="wallet-option-card" onClick={handleConnectWallet}>
                <img src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" alt="WalletConnect" />
                <h3>WalletConnect</h3>
                <p>Conecta con cualquier wallet móvil</p>
              </div>
            </div>
            
            <div className="wallet-info-footer">
              <p>
                <span className="info-icon">ℹ️</span> 
                Esta es una simulación. En una aplicación real, se te pediría aprobar la conexión en tu wallet.
              </p>
              <p className="wallet-help-text">
                ¿No tienes una wallet? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Instala MetaMask</a>
              </p>
            </div>
          </div>
        ) : (
          <div className="profile-setup-step">
            <h2>Completa tu perfil</h2>
            
            <div className="wallet-connected-info">
              <div className="wallet-icon">🦊</div>
              <div className="wallet-details">
                <p className="wallet-status">Wallet conectada</p>
                <p className="wallet-address">{walletData.address}</p>
                <p className="wallet-balance">Saldo: {walletData.balance}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmitProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="fullName">Nombre completo*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                />
              </div>
              
              <h3 className="location-heading">Ubicación</h3>
              <p className="location-subheading">Para mostrarte servicios cercanos a tu domicilio</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Ciudad*</label>
                  <select
                    id="city"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una ciudad</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="district">Distrito*</label>
                  <select
                    id="district"
                    name="district"
                    value={userData.district}
                    onChange={handleChange}
                    required
                    disabled={!userData.city}
                  >
                    <option value="">Selecciona un distrito</option>
                    {userData.city && districts[userData.city]?.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Dirección completa*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Av. Principal 123, Urb. Los Jardines"
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setStep('connect')}
                >
                  Volver
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Procesando...' : 'Completar registro'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <button className="close-modal-button" onClick={() => { onClose(); resetModal(); }}>×</button>
      </div>
    </div>
  );
};

export default LoginSimulation;
