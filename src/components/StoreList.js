// src/components/StoreList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StoreItem from './StoreItem';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // в начало файла


const StoresContainer = styled.div`
  flex: 1; // Занимает все доступное пространство
  overflow-y: auto;
 
  
  &::-webkit-scrollbar {
    width: 8px;
	
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
	
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
	border: 1px solid #fff;
	
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  color: #6c757d;
  flex: 1;
  
  i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 0.95rem;
	margin: 0;
  }
`;

const ErrorMessage = styled.div`
  padding: 1.5rem;
  background-color: rgba(255, 0, 0, 0.05);
  border-radius: 8px;
  margin: 1rem;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  i {
    font-size: 1.5rem;
  }
`;

const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  
  .loader {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #0066ff;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const StoreList = () => {
  const { i18n } = useTranslation();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/data/stores.json');
        console.log('Stores data from JSON:', response.data);

        const currentLang = i18n.language;
        let filteredStores = response.data;

        if (currentLang === 'lt') {
          filteredStores = response.data.filter(store =>
            store.Country && store.Country.toLowerCase().includes('lt')
          );
        } else if (currentLang === 'lv') {
          filteredStores = response.data.filter(store =>
            store.Country && store.Country.toLowerCase().includes('lv')
          );
        }

        // setStores(filteredStores);
		// Сортировка: сначала по City, затем по Name
		filteredStores.sort((a, b) => {
		  const cityA = (a.City || '').toLowerCase();
		  const cityB = (b.City || '').toLowerCase();
		  if (cityA < cityB) return -1;
		  if (cityA > cityB) return 1;

		  const nameA = (a.Name || '').toLowerCase();
		  const nameB = (b.Name || '').toLowerCase();
		  return nameA.localeCompare(nameB);
		});
		setStores(filteredStores);
		
		
      } catch (err) {
        console.error("Error fetching stores:", err);
        setError(`Failed to load stores: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [i18n.language]);

  if (loading) {
    return (
      <LoadingAnimation>
        <div className="loader"></div>
      </LoadingAnimation>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <i className="uil uil-exclamation-triangle"></i>
        <div>{error}</div>
      </ErrorMessage>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <EmptyState>
        <p>No stores found.</p>
      </EmptyState>
    );
  }

  return (
    <StoresContainer>
		{stores.map((store, index) => (
		  <StoreItem
			key={`${store.Name}-${store.Address}-${index}`}
			store={store}
		  />
		))}
    </StoresContainer>
  );
};

export default StoreList;