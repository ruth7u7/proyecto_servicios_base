import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import ServiceCard from '../components/ServiceCard';
import ProviderCard from '../components/ProviderCard';
import Carousel from '../components/Carousel';
import '../styles/Home.css';

const Home = () => {
  const { isConnected, connect } = useWeb3();
  const [selectedService, setSelectedService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Datos para el carrusel
  const carouselSlides = [
    {
      title: "¿Qué es Web3?",
      description: "Web3 es la nueva generación de internet basada en tecnología blockchain, que permite interacciones descentralizadas y mayor control de tus datos. Con Web3, tú eres el dueño de tu información digital.",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Servicios con Blockchain",
      description: "Nuestra plataforma utiliza tecnología blockchain para garantizar transacciones seguras y transparentes entre clientes y proveedores de servicios, eliminando intermediarios y reduciendo costos.",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Conecta tu Wallet",
      description: "Usa tu wallet digital como MetaMask para acceder a todas las funcionalidades de nuestra plataforma. Tu wallet es tu identidad digital segura en el mundo Web3.",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  // Servicios disponibles
  const services = [
    { id: 1, icon: '🔧', title: 'MANTENIMIENTO' },
    { id: 2, icon: '⚡', title: 'ELECTRICIDAD' },
    { id: 3, icon: '🚿', title: 'GASFITERÍA' },
    { id: 4, icon: '🏗️', title: 'CONSTRUCCIÓN' },
    { id: 5, icon: '🎨', title: 'PINTURA' },
    { id: 6, icon: '🧹', title: 'LIMPIEZA' },
    { id: 7, icon: '🦟', title: 'FUMIGACIÓN' },
    { id: 8, icon: '🚚', title: 'MUDANZA' }
  ];

  // Datos de ejemplo para los proveedores (en una aplicación real, esto vendría de un smart contract)
  const mockProviders = useMemo(() => ({
    'MANTENIMIENTO': [
      {
        id: 1,
        name: 'Jose Hernández',
        serviceType: 'MANTENIMIENTO',
        walletAddress: '0x1234...5678',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        name: 'Jose Hernández',
        serviceType: 'MANTENIMIENTO',
        walletAddress: '0x2345...6789',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      {
        id: 3,
        name: 'Jose Hernández',
        serviceType: 'MANTENIMIENTO',
        walletAddress: '0x3456...7890',
        image: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      {
        id: 4,
        name: 'Jose Hernández',
        serviceType: 'MANTENIMIENTO',
        walletAddress: '0x4567...8901',
        image: 'https://randomuser.me/api/portraits/men/4.jpg'
      },
      {
        id: 5,
        name: 'Jose Hernández',
        serviceType: 'MANTENIMIENTO',
        walletAddress: '0x5678...9012',
        image: 'https://randomuser.me/api/portraits/men/5.jpg'
      }
    ],
    'ELECTRICIDAD': [
      {
        id: 6,
        name: 'María López',
        serviceType: 'ELECTRICIDAD',
        walletAddress: '0x6789...0123',
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 7,
        name: 'Carlos Ramírez',
        serviceType: 'ELECTRICIDAD',
        walletAddress: '0x7890...1234',
        image: 'https://randomuser.me/api/portraits/men/6.jpg'
      },
      {
        id: 8,
        name: 'Ana Martínez',
        serviceType: 'ELECTRICIDAD',
        walletAddress: '0x8901...2345',
        image: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    ],
    'GASFITERÍA': [
      {
        id: 9,
        name: 'Pedro Sánchez',
        serviceType: 'GASFITERÍA',
        walletAddress: '0x9012...3456',
        image: 'https://randomuser.me/api/portraits/men/7.jpg'
      },
      {
        id: 10,
        name: 'Luisa Fernández',
        serviceType: 'GASFITERÍA',
        walletAddress: '0x0123...4567',
        image: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    ],
    'CONSTRUCCIÓN': [
      {
        id: 11,
        name: 'Roberto Gómez',
        serviceType: 'CONSTRUCCIÓN',
        walletAddress: '0x1234...5678',
        image: 'https://randomuser.me/api/portraits/men/8.jpg'
      },
      {
        id: 12,
        name: 'Carmen Díaz',
        serviceType: 'CONSTRUCCIÓN',
        walletAddress: '0x2345...6789',
        image: 'https://randomuser.me/api/portraits/women/4.jpg'
      }
    ],
    'PINTURA': [
      {
        id: 13,
        name: 'Miguel Torres',
        serviceType: 'PINTURA',
        walletAddress: '0x3456...7890',
        image: 'https://randomuser.me/api/portraits/men/9.jpg'
      },
      {
        id: 14,
        name: 'Laura Pérez',
        serviceType: 'PINTURA',
        walletAddress: '0x4567...8901',
        image: 'https://randomuser.me/api/portraits/women/5.jpg'
      }
    ],
    'LIMPIEZA': [
      {
        id: 15,
        name: 'Javier Rodríguez',
        serviceType: 'LIMPIEZA',
        walletAddress: '0x5678...9012',
        image: 'https://randomuser.me/api/portraits/men/10.jpg'
      },
      {
        id: 16,
        name: 'Patricia Vargas',
        serviceType: 'LIMPIEZA',
        walletAddress: '0x6789...0123',
        image: 'https://randomuser.me/api/portraits/women/6.jpg'
      }
    ],
    'FUMIGACIÓN': [
      {
        id: 17,
        name: 'Fernando Castro',
        serviceType: 'FUMIGACIÓN',
        walletAddress: '0x7890...1234',
        image: 'https://randomuser.me/api/portraits/men/11.jpg'
      },
      {
        id: 18,
        name: 'Sofía Mendoza',
        serviceType: 'FUMIGACIÓN',
        walletAddress: '0x8901...2345',
        image: 'https://randomuser.me/api/portraits/women/7.jpg'
      }
    ],
    'MUDANZA': [
      {
        id: 19,
        name: 'Ricardo Ortega',
        serviceType: 'MUDANZA',
        walletAddress: '0x9012...3456',
        image: 'https://randomuser.me/api/portraits/men/12.jpg'
      },
      {
        id: 20,
        name: 'Elena Gutiérrez',
        serviceType: 'MUDANZA',
        walletAddress: '0x0123...4567',
        image: 'https://randomuser.me/api/portraits/women/8.jpg'
      }
    ]
  }), []);

  // Obtener el término de búsqueda de la URL si existe
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      
      // Si hay un término de búsqueda, cargar todos los proveedores
      const allProviders = [];
      Object.values(mockProviders).forEach(serviceProviders => {
        allProviders.push(...serviceProviders);
      });
      
      setProviders(allProviders);
    } else {
      // Si no hay término de búsqueda, cargar todos los proveedores por defecto
      const allProviders = [];
      Object.values(mockProviders).forEach(serviceProviders => {
        allProviders.push(...serviceProviders);
      });
      
      setProviders(allProviders);
    }
  }, [location.search, mockProviders]);

  // Cargar proveedores cuando se selecciona un servicio
  useEffect(() => {
    if (selectedService) {
      setIsLoadingProviders(true);
      
      // Simulamos una carga de datos (en una aplicación real, esto vendría de un smart contract)
      // Usamos un timeout más largo para evitar parpadeos
      const timer = setTimeout(() => {
        setProviders(mockProviders[selectedService] || []);
        setIsLoadingProviders(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedService, mockProviders]);

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setSearchTerm(''); // Limpiar el término de búsqueda al seleccionar un servicio
    
    // Desplazarse a la sección de proveedores
    document.getElementById('providers-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowAllProviders = () => {
    setSelectedService(null);
    setSearchTerm('');
    
    // Cargar todos los proveedores
    const allProviders = [];
    Object.values(mockProviders).forEach(serviceProviders => {
      allProviders.push(...serviceProviders);
    });
    
    setProviders(allProviders);
    
    // Desplazarse a la sección de proveedores
    document.getElementById('providers-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleProviderClick = (provider) => {
    // Redirigir a la página de detalles del proveedor
    navigate(`/proveedor/${provider.id}`, { state: { provider } });
  };

  const handleConnectWallet = async () => {
    if (!isConnected) {
      await connect();
    }
  };

  // Filtrar proveedores según el término de búsqueda
  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className="hero-section">
        <Carousel slides={carouselSlides} />
      </section>

      <section className="services-section">
        <h3 onClick={handleShowAllProviders} className="clickable-title">SERVICIOS DISPONIBLES</h3>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} onClick={() => handleServiceClick(service.title)}>
              <ServiceCard 
                icon={service.icon} 
                title={service.title} 
              />
            </div>
          ))}
        </div>
      </section>

      <section id="providers-section" className="providers-section">
        {searchTerm ? (
          <>
            <h3>RESULTADOS DE BÚSQUEDA: "{searchTerm}"</h3>
            {filteredProviders.length > 0 ? (
              <div className="providers-grid">
                {filteredProviders.map(provider => (
                  <div key={provider.id} onClick={() => handleProviderClick(provider)}>
                    <ProviderCard
                      image={provider.image}
                      name={provider.name}
                      serviceType={provider.serviceType}
                      walletAddress={provider.walletAddress}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-providers-message">
                No se encontraron resultados para "{searchTerm}"
              </div>
            )}
          </>
        ) : selectedService ? (
          <>
            <h3>PROVEEDORES DE {selectedService}</h3>
            {isLoadingProviders ? (
              <div className="loading-providers">Cargando proveedores...</div>
            ) : providers.length > 0 ? (
              <div className="providers-grid">
                {providers.map(provider => (
                  <div key={provider.id} onClick={() => handleProviderClick(provider)}>
                    <ProviderCard
                      image={provider.image}
                      name={provider.name}
                      serviceType={provider.serviceType}
                      walletAddress={provider.walletAddress}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-providers-message">
                No hay proveedores disponibles para este servicio
              </div>
            )}
          </>
        ) : (
          <>
            <h3>TODOS LOS PROVEEDORES</h3>
            {providers.length > 0 ? (
              <div className="providers-grid">
                {providers.map(provider => (
                  <div key={provider.id} onClick={() => handleProviderClick(provider)}>
                    <ProviderCard
                      image={provider.image}
                      name={provider.name}
                      serviceType={provider.serviceType}
                      walletAddress={provider.walletAddress}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="loading-providers">Cargando proveedores...</div>
            )}
          </>
        )}
      </section>

      <section className="wallet-info-section">
        <h3>¿Cómo funciona nuestra plataforma?</h3>
        <div className="wallet-info-container">
          <div className="wallet-info-text">
            <h4>Conecta tu Wallet para acceder a todas las funcionalidades</h4>
            <p>Nuestra plataforma utiliza tecnología blockchain para garantizar transacciones seguras y transparentes entre clientes y proveedores de servicios.</p>
            
            <div className="wallet-steps-home">
              <div className="wallet-step-home">
                <div className="step-icon">🔑</div>
                <div className="step-content">
                  <h5>Inicia sesión con tu wallet</h5>
                  <p>Haz clic en "Ingresar" en la parte superior y conecta tu wallet digital</p>
                </div>
              </div>
              <div className="wallet-step-home">
                <div className="step-icon">👨‍🔧</div>
                <div className="step-content">
                  <h5>Contacta con proveedores</h5>
                  <p>Selecciona un proveedor y accede a su información de contacto</p>
                </div>
              </div>
              <div className="wallet-step-home">
                <div className="step-icon">💰</div>
                <div className="step-content">
                  <h5>Paga de forma segura</h5>
                  <p>Realiza pagos directamente a través de la blockchain sin intermediarios</p>
                </div>
              </div>
            </div>
            
            <div className="wallet-cta">
              <p>¿No tienes una wallet? Es fácil comenzar:</p>
              <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="wallet-link">
                Instalar MetaMask
              </a>
            </div>
          </div>
          <div className="wallet-info-image">
            <img src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Web3 wallet" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
