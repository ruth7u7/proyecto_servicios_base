import React from 'react';
import '../styles/ServiceCard.css';

const ServiceCard = ({ icon, title }) => {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <div className="service-title">{title}</div>
    </div>
  );
};

export default ServiceCard;
