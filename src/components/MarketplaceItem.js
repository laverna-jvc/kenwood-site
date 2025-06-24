// src/components/MarketplaceItem.js
import React from 'react';
import styled from 'styled-components';

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
  font-weight: 600;
`;

const MarketplaceUrl = styled.a`
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

const MarketplaceItem = ({ marketplace }) => {
  if (!marketplace) {
    console.error('Marketplace is undefined');
    return null;
  }

  // Get marketplace name and URL
  const marketplaceName = marketplace.Name || 'Unnamed Store';
  const marketplaceUrl = marketplace.URL || '#';

  return (
    <MarketplaceCard>
      <MarketplaceName>{marketplaceName}</MarketplaceName>
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