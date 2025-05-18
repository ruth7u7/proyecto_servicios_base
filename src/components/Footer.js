import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Sobre nosotros</h3>
          <p className="footer-text">
            Plataforma descentralizada que conecta proveedores de servicios con clientes utilizando tecnología blockchain.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Enlaces rápidos</h3>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-contact">
            <li><span className="contact-icon">📧</span> info@nombredelaweb.com</li>
            <li><span className="contact-icon">📱</span> +51 999 999 999</li>
            <li><span className="contact-icon">📍</span> Lima, Perú</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <span className="social-icon">📘</span> Facebook
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">📷</span> Instagram
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">🐦</span> Twitter
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} [NombredelaWeb]. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
