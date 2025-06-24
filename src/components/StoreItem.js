// src/components/StoreItem.js
import React from 'react';
import styled from 'styled-components';
// import lithuaniaIcon from '../assets/Lithuania.png';
// import latviaIcon from '../assets/Latvia.png'; 


const lithuaniaIcon = '/assets/Lithuania.png';
const latviaIcon = '/assets/Latvia.png'; 

const StoreCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const StoreInfo = styled.div`
  flex: 1;
`;

const StoreName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #212529;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const StoreAddress = styled.a`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: #6c757d;
  transition: all 0.2s;
  
  &:hover {
    color: #0066ff;
    text-decoration: underline;
  }
  
  i {
    font-size: 0.9rem;
  }
`;

const CountryIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
  border-radius: 2px;
`;

const StoreItem = ({ store }) => {
  if (!store) {
    return null;
  }

  const storeName = store.Name || 'Unnamed Store';
  const storeAddress = store.Address || 'No address available';
  const storeCountry = store.Country || 'Country not specified';
  
  // Generate Google Maps URL - either using coordinates or address for fallback
  const getMapsUrl = () => {
    return `https://maps.google.com/?q=${encodeURIComponent(storeAddress)}`;
  };

  // Determine country icon
  const getCountryIcon = (country) => {
    if (country && country.toLowerCase().includes('lithuania')) {
      return lithuaniaIcon;
    } else if (country && country.toLowerCase().includes('latvia')) {
      return latviaIcon;
    }
    return null;
  };

  const countryIcon = getCountryIcon(storeCountry);

  return (
    <StoreCard>
      <StoreInfo>
        <StoreName>
          {storeName}
          {countryIcon && (
            <CountryIcon 
              src={countryIcon} 
              alt={storeCountry} 
              title={storeCountry}
            />
          )}
        </StoreName>

        <StoreAddress 
          href={getMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="uil uil-map-marker"></i>
          {storeAddress}
        </StoreAddress>
      </StoreInfo>
    </StoreCard>
  );
};

export default StoreItem;