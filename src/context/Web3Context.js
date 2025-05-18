import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

// Configuración del conector para MetaMask
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001], // Mainnet, testnets y otras redes populares
});

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Función para conectar con MetaMask
  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        setError(null);
        
        // Solicitar conexión a la cuenta
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // Configurar provider y signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();
        
        setAccount(account);
        setProvider(provider);
        setSigner(signer);
        setChainId(network.chainId);
        
        return { success: true, account };
      } catch (error) {
        console.error('Error al conectar con MetaMask:', error);
        setError(error.message || 'Error al conectar con MetaMask');
        return { success: false, error: error.message };
      } finally {
        setIsConnecting(false);
      }
    } else {
      const errorMsg = 'MetaMask no está instalado';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Función para desconectar
  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  // Escuchar cambios de cuenta
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = (chainId) => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Verificar si ya está conectado
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            connect();
          }
        })
        .catch(console.error);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Valores y funciones que expondremos en el contexto
  const value = {
    account,
    provider,
    signer,
    chainId,
    error,
    isConnecting,
    connect,
    disconnect,
    isConnected: !!account,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
