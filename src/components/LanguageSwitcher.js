// src/components/LanguageSwitcher.js
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageContainer = styled.div`
  position: relative;
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.85rem;
  transition: all 0.2s;
  // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #dbdee4; // rgba(0, 0, 0, 0.06);
  font-weight: 500;
  
  &:hover {
    background: #fff;
    transform: translateY(-2px);
    // box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	border: 1px solid #dbdee4;
  }
`;

const Globe = styled.i`
  font-size: 1rem;
  color: #0066ff;
`;

const CurrentLanguage = styled.span`
  font-weight: 600;
  color: #212529;
`;

const Arrow = styled.i`
  font-size: 0.8rem;
  color: #6c757d;
  transition: transform 0.2s;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  transition: all 0.2s;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
`;

const LanguageOption = styled.div`
  padding: 0.75rem 1rem;
  // padding-right: 2rem;
  cursor: pointer;
  color: #212529;
  white-space: nowrap;
  transition: all 0.2s;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(0, 102, 255, 0.05);
    color: #0066ff;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  ${props => props.$isActive && `
    background: rgba(0, 102, 255, 0.1);
    color: #0066ff;
    font-weight: 600;
  `}
`;

const LanguageName = styled.span`
  flex: 1;
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Get language name and code
  const getLanguageData = (code) => {
    switch(code) {
      case 'en':
        return { code: 'EN', name: 'English' };
      case 'lt':
        return { code: 'LT', name: 'Lietuvių' };
      case 'lv':
        return { code: 'LV', name: 'Latviešu' };
      default:
        return { code: code.toUpperCase(), name: code };
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  setIsOpen(false);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lng);
  window.history.replaceState(null, '', url.toString());
};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = getLanguageData(i18n.language);

  return (
    <LanguageContainer ref={containerRef}>
      <LanguageSelector onClick={toggleDropdown}>
        <Globe className="uil uil-globe" />
        <CurrentLanguage>{currentLanguage.code}</CurrentLanguage>
        <Arrow 
          className="uil uil-angle-down" 
          $isOpen={isOpen}
        />
      </LanguageSelector>

      <Dropdown $isOpen={isOpen}>
        {['en', 'lt', 'lv'].map(langCode => {
          const langData = getLanguageData(langCode);
          const isActive = i18n.language === langCode;
          
          return (
            <LanguageOption 
              key={langCode}
              onClick={() => changeLanguage(langCode)}
              $isActive={isActive}
            >
              <LanguageName>{langData.name}</LanguageName>
            </LanguageOption>
          );
        })}
      </Dropdown>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;