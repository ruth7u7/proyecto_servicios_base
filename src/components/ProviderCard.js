import React from 'react';
import '../styles/ProviderCard.css';

const ProviderCard = ({ image, name, serviceType, walletAddress }) => {
  return (
    <div className="provider-card">
      <div className="provider-image">
        <img src={image} alt={name} />
      </div>
      <div className="provider-info">
        <h3>{name}</h3>
        <p className="service-type">{serviceType}</p>
        <p className="wallet-address">{walletAddress}</p>
      </div>
    </div>
  );
};

export default ProviderCard;
