import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserMenu.css';

const UserMenu = ({ user, onLogout, onToggleDarkMode, isDarkMode }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    profileImage: user?.profileImage || null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    // En una aplicación real, aquí se enviarían los datos al backend
    // Para esta simulación, solo actualizamos el estado local
    if (selectedImage) {
      setProfileData(prev => ({ ...prev, profileImage: selectedImage }));
    }
    setIsEditing(false);
  };

  return (
    <div className="user-menu-container">
      <div className="user-menu">
        <div className="user-menu-item" onClick={() => setShowProfileModal(true)}>
          <span className="menu-icon">👤</span>
          <span>Ver Perfil</span>
        </div>
        <div className="user-menu-item" onClick={onToggleDarkMode}>
          <span className="menu-icon">{isDarkMode ? '☀️' : '🌙'}</span>
          <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </div>
        <div className="user-menu-item logout" onClick={onLogout}>
          <span className="menu-icon">🚪</span>
          <span>Cerrar Sesión</span>
        </div>
      </div>

      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <h2>Mi Perfil</h2>
            
            <div className="profile-content">
              <div className="profile-image-section">
                <div className="profile-image-container">
                  {profileData.profileImage || selectedImage ? (
                    <img 
                      src={selectedImage || profileData.profileImage} 
                      alt="Perfil" 
                      className="profile-image" 
                    />
                  ) : (
                    <div className="profile-image-placeholder">
                      {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  {isEditing && (
                    <label className="change-image-button">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }} 
                      />
                      <span>Cambiar</span>
                    </label>
                  )}
                </div>
              </div>
              
              <div className="profile-details">
                <div className="profile-field">
                  <label>Nombre completo</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="fullName" 
                      value={profileData.fullName} 
                      onChange={handleChange} 
                    />
                  ) : (
                    <p>{profileData.fullName || 'No especificado'}</p>
                  )}
                  {!isEditing && (
                    <div className="name-change-info">
                      Puedes cambiar tu nombre 1 vez cada 3 meses
                    </div>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Dirección de wallet</label>
                  <p className="wallet-address">{user?.walletAddress || '0x0000...0000'}</p>
                </div>
                
                <div className="profile-field">
                  <label>Teléfono</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleChange} 
                      placeholder="+51 999 999 999"
                    />
                  ) : (
                    <p>{profileData.phone || 'No especificado'}</p>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Ubicación</label>
                  <p>{user?.city ? `${user.district}, ${user.city}` : 'No especificada'}</p>
                </div>
                
                <div className="profile-field">
                  <label>Dirección</label>
                  <p>{user?.address || 'No especificada'}</p>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button 
                    className="cancel-button" 
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedImage(null);
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    className="save-button" 
                    onClick={handleSaveProfile}
                  >
                    Guardar cambios
                  </button>
                </>
              ) : (
                <button 
                  className="edit-button" 
                  onClick={() => setIsEditing(true)}
                >
                  Editar perfil
                </button>
              )}
            </div>
            
            <button className="close-modal-button" onClick={() => setShowProfileModal(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
