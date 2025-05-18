import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import '../styles/WorkWithUs.css';

const WorkWithUs = () => {
  const navigate = useNavigate();
  const { isConnected, account, connect } = useWeb3();
  const [formData, setFormData] = useState({
    fullName: '',
    serviceType: '',
    experience: '',
    city: '',
    province: '',
    district: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    portfolio: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Lista de servicios disponibles
  const serviceTypes = [
    'MANTENIMIENTO',
    'ELECTRICIDAD',
    'GASFITERÍA',
    'CONSTRUCCIÓN',
    'PINTURA',
    'LIMPIEZA',
    'FUMIGACIÓN',
    'MUDANZA'
  ];

  // Ciudades del Perú (ejemplo)
  const cities = ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco', 'Iquitos', 'Huancayo'];
  
  // Provincias (ejemplo para Lima)
  const provinces = {
    'Lima': ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Oyón', 'Yauyos'],
    'Arequipa': ['Arequipa', 'Camaná', 'Caravelí', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Unión'],
    // Otras ciudades...
  };
  
  // Distritos (ejemplo para Lima)
  const districts = {
    'Lima': ['Cercado de Lima', 'Ate', 'Barranco', 'Breña', 'Comas', 'Chorrillos', 'El Agustino', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Magdalena', 'Miraflores', 'Pueblo Libre', 'Rímac', 'San Borja', 'San Isidro', 'San Miguel', 'Santiago de Surco', 'Surquillo'],
    // Otras provincias...
  };

  // Si el usuario no está conectado, solicitamos que conecte su wallet
  useEffect(() => {
    if (isConnected) {
      setActiveTab('form');
    }
  }, [isConnected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Resetear campos dependientes si cambia la ciudad o provincia
    if (name === 'city') {
      setFormData(prev => ({ ...prev, province: '', district: '' }));
    } else if (name === 'province') {
      setFormData(prev => ({ ...prev, district: '' }));
    }
  };

  const handleConnectWallet = () => {
    setShowLoginModal(true);
  };

  const handleLogin = async () => {
    try {
      await connect();
      setShowLoginModal(false);
      setActiveTab('form');
    } catch (error) {
      setError('Error al conectar con la wallet: ' + error.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // En una aplicación real, aquí se subirían los archivos a un servidor
      // Para este ejemplo, solo guardamos los nombres de los archivos
      setFormData(prev => ({
        ...prev,
        portfolio: [...prev.portfolio, ...files.map(file => file.name)]
      }));
    }
  };

  const handleRemoveFile = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError('Debes conectar tu wallet para registrarte');
      return;
    }

    // Validación básica
    const requiredFields = ['fullName', 'serviceType', 'experience', 'city', 'province', 'district', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Por favor, completa los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      // En una aplicación real, aquí se enviaría la información a un smart contract
      // Para este ejemplo, simulamos un registro exitoso
      
      // Simulamos un tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registro exitoso
      setSuccess(true);
      
      // Redirigir a la página de inicio después de un breve retraso
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al procesar el registro: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contenido de las pestañas
  const tabContent = {
    info: (
      <div className="info-section">
        <h3>¿Quieres ofrecer tus servicios?</h3>
        <div className="info-content">
          <div className="info-text">
            <h4>¿Cómo funciona?</h4>
            <p>Nuestra plataforma conecta a proveedores de servicios con clientes que necesitan soluciones rápidas y confiables. Al registrarte como proveedor, podrás:</p>
            <ul>
              <li>Crear tu perfil profesional</li>
              <li>Mostrar tus trabajos anteriores</li>
              <li>Recibir solicitudes de clientes</li>
              <li>Gestionar tus servicios y pagos</li>
            </ul>
            
            <h4>Beneficios de usar nuestra plataforma</h4>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h5>Pagos seguros</h5>
                <p>Recibe pagos directamente en tu wallet sin intermediarios</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔍</div>
                <h5>Mayor visibilidad</h5>
                <p>Destaca entre los proveedores de tu zona</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⭐</div>
                <h5>Sistema de reputación</h5>
                <p>Construye tu reputación con calificaciones verificadas</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📱</div>
                <h5>Gestión sencilla</h5>
                <p>Administra tus servicios desde cualquier dispositivo</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="action-section">
          <p>¿Listo para empezar?</p>
          <button 
            onClick={() => setActiveTab('connect')} 
            className="next-step-btn"
          >
            Comenzar registro
          </button>
        </div>
      </div>
    ),
    connect: (
      <div className="wallet-info-section">
        <h3>Conecta tu Wallet para comenzar</h3>
        <div className="wallet-info-content">
          <div className="wallet-info-text">
            <h4>¿Qué es una Wallet?</h4>
            <p>Una wallet o billetera digital es una aplicación que te permite almacenar, enviar y recibir criptomonedas de forma segura. Funciona como tu identidad digital en el mundo Web3.</p>
            
            <h4>¿Por qué necesito una Wallet?</h4>
            <p>En nuestra plataforma, utilizamos tecnología blockchain para garantizar transacciones seguras y transparentes. Tu wallet te permite:</p>
            <div className="wallet-benefits">
              <div className="wallet-benefit">
                <span className="wallet-benefit-icon">🔐</span>
                <span>Identificarte de forma segura</span>
              </div>
              <div className="wallet-benefit">
                <span className="wallet-benefit-icon">💸</span>
                <span>Recibir pagos directamente</span>
              </div>
              <div className="wallet-benefit">
                <span className="wallet-benefit-icon">🔄</span>
                <span>Control total sobre tus transacciones</span>
              </div>
              <div className="wallet-benefit">
                <span className="wallet-benefit-icon">🚀</span>
                <span>Acceso a funcionalidades exclusivas</span>
              </div>
            </div>
            
            <h4>¿Cómo conectar tu Wallet?</h4>
            <div className="wallet-steps">
              <div className="wallet-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Instala una wallet</h5>
                  <p>Descarga <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">MetaMask</a> u otra wallet compatible</p>
                </div>
              </div>
              <div className="wallet-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Crea o importa una wallet</h5>
                  <p>Sigue las instrucciones para crear una nueva o importar una existente</p>
                </div>
              </div>
              <div className="wallet-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Conecta tu wallet</h5>
                  <p>Haz clic en "Conectar Wallet" y aprueba la conexión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="connect-wallet-section">
          {isConnected ? (
            <div className="wallet-connected">
              <p>Wallet conectada: <span>{account}</span></p>
              <button 
                onClick={() => handleTabChange('form')} 
                className="next-step-btn"
              >
                Continuar al formulario
              </button>
            </div>
          ) : (
            <>
              <p>Para registrarte como proveedor de servicios, primero debes conectar tu wallet</p>
              <button 
                onClick={handleConnectWallet} 
                className="connect-wallet-btn"
                disabled={isSubmitting}
              >
                Conectar Wallet
              </button>
            </>
          )}
        </div>
      </div>
    ),
    form: (
      <div className="registration-form-section">
        <h3>Completa tus datos para registrarte</h3>
        {success ? (
          <div className="success-message">
            <h3>¡Registro exitoso!</h3>
            <p>Tu información ha sido registrada correctamente. Serás redirigido a la página de inicio.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="serviceType">Tipo de servicio*</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un servicio</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Experiencia (años)*</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad*</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
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
                <label htmlFor="province">Provincia*</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  disabled={!formData.city}
                >
                  <option value="">Selecciona una provincia</option>
                  {formData.city && provinces[formData.city]?.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="district">Distrito*</label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  disabled={!formData.province}
                >
                  <option value="">Selecciona un distrito</option>
                  {formData.province && districts[formData.province]?.map(district => (
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
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Descripción de tus servicios</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe los servicios que ofreces, tu especialidad, etc."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="portfolio">Fotos de trabajos anteriores</label>
              <input
                type="file"
                id="portfolio"
                name="portfolio"
                onChange={handleFileUpload}
                multiple
                accept="image/*"
                className="file-input"
              />
              {formData.portfolio.length > 0 && (
                <div className="uploaded-files">
                  <p>Archivos seleccionados:</p>
                  <ul>
                    {formData.portfolio.map((file, index) => (
                      <li key={index}>
                        {file}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveFile(index)}
                          className="remove-file"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="wallet-address">
              <p>Wallet conectada: <span>{account}</span></p>
              <small>Esta wallet se utilizará para recibir pagos por tus servicios</small>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        )}
      </div>
    )
  };

  return (
    <div className="work-with-us-container">
      <div className="work-with-us-content">
        <div className="work-with-us-image">
          {/* Imagen del trabajador, como se ve en el Figma */}
          <div className="worker-image-placeholder"></div>
        </div>
        
        <div className="work-with-us-form-container">
          <h2>Trabaja con nosotros</h2>
          <p className="subtitle">¿Te gustaría formar parte de nuestra familia?</p>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'info' ? 'active' : ''}`} 
              onClick={() => handleTabChange('info')}
            >
              1. Información
            </button>
            <button 
              className={`tab ${activeTab === 'connect' ? 'active' : ''}`} 
              onClick={() => handleTabChange('connect')}
            >
              2. Conecta tu Wallet
            </button>
            <button 
              className={`tab ${activeTab === 'form' ? 'active' : ''}`} 
              onClick={() => isConnected && handleTabChange('form')}
              disabled={!isConnected}
            >
              3. Completa tus datos
            </button>
          </div>
          
          <div className="tab-content">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>

      {/* Modal de inicio de sesión */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <h2>Conectar Wallet</h2>
            <p>Para registrarte como proveedor, necesitas conectar tu wallet.</p>
            
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
    </div>
  );
};

export default WorkWithUs;
