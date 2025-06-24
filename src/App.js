// src/App.js
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LanguageSwitcher from './components/LanguageSwitcher';
import StoreList from './components/StoreList';
import MarketplaceList from './components/MarketplaceList';
import { useTranslation } from 'react-i18next';
import './i18n';
import axios from 'axios';

const logoImage = '/assets/logo.svg'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    background-color: #f8f9fa;
    color: #212529;
    scroll-behavior: smooth;
  }
  
  a {
    color: #0066ff;
    text-decoration: none;
    transition: all 0.2s;
    
    &:hover {
      color: #0044cc;
    }
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  z-index: -2;
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
`;

const HeaderContainer = styled.header`
  padding: 1.2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #dbdee4;
`;

const Header = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  gap: 1.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 48px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 36px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  padding-bottom: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: #212529;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 10px 10px 0 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 4rem;
  
  @media (max-width: 992px) {
    &:last-child {
		margin-top: 2rem;
	}
  }
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  // box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #dbdee4;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 294px;
  
  // &:hover {
    // transform: translateY(-5px);
    // box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  // }

  @media (max-width: 768px) {
    max-height: 453px;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 0;
  border-radius: 16px;border-radius: 32px;
  overflow: hidden;
  background: #1a1a1a;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.1);
  // min-height: 500px;
  
  // @media (max-width: 768px) {
    // min-height: 400px;
  // }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
`;

// const HeroOverlay = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background: linear-gradient(
    // 135deg,
    // rgba(0, 0, 0, 0.7) 0%,
    // rgba(0, 0, 0, 0.5) 50%,
    // rgba(0, 0, 0, 0.3) 100%
  // );
  // background: none; // <----------------
  // z-index: 2;
// `;
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  background: 0;
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  text-align: left;
  flex: 1;
  padding: 4rem;
  border-radius: 15px;
  // min-height: 350px;
  
  @media (max-width: 768px) {
    padding: 2.5rem;
  }
  
  @media (max-width: 350px) {
    padding: 2rem;
  }
  
  @media (max-width: 300px) {
    padding: 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0;
  margin-bottom: 0.5rem;
  // background: #0066ff;
  // border-radius: 15px;
  // padding: 0.5rem 0.8rem;
  position: relative;

  &:before{
    content:"";
    background-color: #ff4242;
    width:100%;
    height:1.25em;
    position:absolute;
    z-index:-1;
    filter:url(#marker-shape);
    left:-0.25em;border-radius: 5px;
    top:-0.1em;
    padding: 0 0.25em;
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 468px) {
    font-size: 1.3rem;
  }
`;

const HeroTitle2 = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0;
  
  @media (max-width: 992px) {
    font-size: 2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 468px) {
    font-size: 1.7rem;
  }
`;


const HeroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroInfoCards = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 2rem;
  border: 1px solid #dbdee4;
  // box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  // background: rgba(255, 255, 255, 0.1);
  // backdrop-filter: blur(10px);
  background: #fff;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dbdee4;
  transition: all 0.3s ease;
  
  &:last-child {
    border-right: none;
  }
  
  &:hover {
    background: #fff;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 992px) {
    &:nth-child(2n) {
      border-right: none;
    }
    &:nth-child(3), &:nth-child(4) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  
  @media (max-width: 576px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
    &:nth-child(3), &:nth-child(4) {
      border-top: 0;
    }
	&:nth-child(4) {
		padding-bottom: 2rem;
	}
  }
`;

const InfoCardLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const InfoCardContent = styled.div`
  color: #212529;
  font-weight: 500;
  
  a {
    color: #212529;
    text-decoration: none;
    
    &:hover {
      color: #0066ff;
    }
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  // margin-bottom: 0.5rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 32px;
  height: 32px;
  // background: rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: #212529;
  font-size: 1.2rem;
  transition: all 0.2s;
  
  &:hover {
	// background: rgba(0, 0, 0, 0.1);
	color: #0066ff;
  }
  
  i {
	color: #212529;
	transition: all 0.2s;
  }
  i:hover {
	color: #0066ff;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
	 gap: 0rem;
  }
`;

const Copyright = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 0px solid rgba(0, 0, 0, 0.06);
`;

function App() {
  const { t, i18n  } = useTranslation();
  const currentYear = new Date().getFullYear();
// В компоненте App.js, функция компонента App
const [contactInfo, setContactInfo] = useState({
  address: '-',
  email: '-',
  phone: '-',
  heroImage: null,
  facebookUrl: '#',
  youtubeUrl: '#'
});

// Обновляем функцию fetchContactInfo в useEffect
useEffect(() => {
  axios.get('/data/contact.json')
    .then(res => setContactInfo(res.data))
    .catch(err => console.error('Error loading contact.json:', err));
}, []);

useEffect(() => {
document.title = `KENWOOD | ${t('home.subTitle2')}`;
}, [i18n.language, t]);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const host = window.location.hostname;

  const supportedLanguages = ['lt', 'lv', 'en'];

  if (urlLang && supportedLanguages.includes(urlLang)) {
    i18n.changeLanguage(urlLang);
  } else {
    if (host.includes('kenwood.lv')) {
      i18n.changeLanguage('lv');
    } else if (host.includes('kenwood.lt')) {
      i18n.changeLanguage('lt');
    }
  }
}, [i18n]);

  return (
    <>
      <GlobalStyle />
      <GradientBackground />
      <BackgroundPattern />
      <AppContainer>
        <HeaderContainer>
          <Header>
            <LogoContainer>
              <LogoImage src={logoImage} alt="KENWOOD Logo" />
            </LogoContainer>
            <LanguageSwitcher />
          </Header>
        </HeaderContainer>
        
        <MainContent>
		<Hero>
		  <HeroBackground $imageUrl={contactInfo.heroImage || null} />
		  <HeroOverlay />
		  
		  <HeroContent>
			<HeroTitle>{t('home.title')}</HeroTitle>
			<HeroTitle2>{t('home.subTitle2')}</HeroTitle2>
			<HeroSubtitle>{t('home.subTitle')}</HeroSubtitle>
		  </HeroContent>
		  
		</Hero>

		  <HeroInfoCards>
			<InfoCard>
			  <InfoCardLabel>{t('contact.address')}</InfoCardLabel>
			  <InfoCardContent>{contactInfo.address}</InfoCardContent>
			</InfoCard>
			
			<InfoCard>
			  <InfoCardLabel>{t('contact.email')}</InfoCardLabel>
			  <InfoCardContent>
				<a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
			  </InfoCardContent>
			</InfoCard>
			
			<InfoCard>
			  <InfoCardLabel>{t('contact.phone')}</InfoCardLabel>
			  <InfoCardContent>{contactInfo.phone}</InfoCardContent>
			</InfoCard>
			
			<InfoCard>
			  <InfoCardLabel>{t('contact.social')}</InfoCardLabel>
			  <InfoCardContent>
				<SocialLinksContainer>
				  <SocialIconLink 
					href={contactInfo.facebookUrl} 
					aria-label="Facebook" 
					target="_blank" 
					rel="noopener noreferrer"
				  >
					<i className="uil uil-facebook-f"></i>
				  </SocialIconLink>
				  <SocialIconLink 
					href={contactInfo.youtubeUrl} 
					aria-label="YouTube" 
					target="_blank" 
					rel="noopener noreferrer"
				  >
					<i className="uil uil-youtube"></i>
				  </SocialIconLink>
				</SocialLinksContainer>
			  </InfoCardContent>
			</InfoCard>
		  </HeroInfoCards>
		  
          <ContentLayout>
            <SectionsContainer>
              <Section>
                <SectionTitle>{t('stores.title')}</SectionTitle>
                <StoreList />
              </Section>
            </SectionsContainer>
            
            <SectionsContainer>
              <Section>
                <SectionTitle>{t('marketplaces.title')}</SectionTitle>
                <MarketplaceList />
              </Section>
            </SectionsContainer>
          </ContentLayout>
          
          <Copyright>
            © {currentYear} {t('footer.copyright')}
          </Copyright>
        </MainContent>
        
      </AppContainer>
    </>
  );
}

export default App;