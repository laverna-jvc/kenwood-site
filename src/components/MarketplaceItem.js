// src/components/MarketplaceItem.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const lithuaniaIcon = process.env.PUBLIC_URL + '/assets/Lithuania.png';
const latviaIcon = process.env.PUBLIC_URL + '/assets/Latvia.png'; 

const MarketplaceCard = styled.div`
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

const MarketplaceName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #212529;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const MarketplaceUrl = styled.a`
  font-size: 0.9rem;
  display: flex;
  align-items: start;
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


const MarketplaceItem = ({ marketplace }) => {
  const { i18n } = useTranslation();
  const isEN = i18n.language === 'en';
  
  if (!marketplace) {
    console.error('Marketplace is undefined');
    return null;
  }

  // Get marketplace name and URL
  const marketplaceName = marketplace.Name || 'Unnamed Store';
  const marketplaceUrl = marketplace.URL || '#';
  const marketplaceCountry = marketplace.Country || 'Country not specified';

  // Determine country icon
  const getCountryIcon = (country) => {
    if (country && country.toLowerCase().includes('lt')) {
      return lithuaniaIcon;
    } else if (country && country.toLowerCase().includes('lv')) {
      return latviaIcon;
    }
    return null;
  };
  
  const countryIcon = getCountryIcon(marketplaceCountry);
  
  return (
    <MarketplaceCard>
      <MarketplaceName>
          {marketplaceName}
          {isEN && countryIcon && (
            <CountryIcon 
              src={countryIcon} 
              alt={marketplaceCountry} 
              title={marketplaceCountry}
            />
          )}
	  </MarketplaceName>
      <MarketplaceUrl 
        href={marketplaceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        
        {marketplaceUrl}
      </MarketplaceUrl>
    </MarketplaceCard>
  );
};

export default MarketplaceItem;