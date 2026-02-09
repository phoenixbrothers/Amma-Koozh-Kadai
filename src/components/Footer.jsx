import React from 'react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import fssaiLogo from './images/fssai.png';
import phoenix from './images/PHOENIX.png';
import './Footer.css';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>
      
      <div className="footer-content">
        {/* Left Section - Brand */}
        <div className="footer-left">
          <h2 className="brand-title">
            Amma Koozh<span className="brand-green">kadai</span> 
          </h2>
          <p className="brand-tagline">
            Reviving ancient South Indian fermentation wisdom for the modern lifestyle.
          </p>
        </div>

        {/* Right Section - Contact & Badges */}
        <div className="footer-right">
          <div className="contact-cards">
            <a href="https://wa.me/917339214327" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon"><WhatsAppIcon /></div>
              <div className="contact-content">
                <span className="contact-label">WHATSAPP</span>
                <span className="contact-value">+91 7339214327</span>
              </div>
              <ArrowRight size={16} className="contact-arrow" />
            </a>

            <a href="mailto:asmobiles327@gmail.com" className="contact-card">
              <div className="contact-icon"><Mail size={20} /></div>
              <div className="contact-content">
                <span className="contact-label">EMAIL</span>
                <span className="contact-value">ammakoozhkadaii@gmail.com</span>
              </div>
              <ArrowRight size={16} className="contact-arrow" />
            </a>

            <div className="contact-card">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div className="contact-content">
                <span className="contact-label">VISIT</span>
                <p className="contact-value">Hosur, India</p>
              </div>
            </div>
          </div>

          <div className="footer-badges">
            <div className="fssai-badge">
              <img src={fssaiLogo} alt="FSSAI" className="fssai-logo" />
              <div className="fssai-text">
                <span className="fssai-label">LIC. NO.</span>
                <span className="fssai-number">22425431000479</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Section */}
          <div className="footer-bottom">
            <a
              href="mailto:phoenixbrothersofficial@gmail.com?subject=Hello%20from%20Amma%20Koozhkadai&body=Hi%20Phoenix%20Brothers%2C%0A%0AI%20saw%20your%20work%20on%20Amma%20Koozhkadai%20and%20would%20like%20to%20connect."
              className="made-by-container"
              aria-label="Email Phoenix Brothers"
              title="Email Phoenix Brothers"
              onClick={(e) => {
                e.preventDefault();
                // Use window.location to reliably open the mail client on touch devices
                window.location.href = 'mailto:phoenixbrothersofficial@gmail.com?subject=Hello%20from%20Amma%20Koozhkadai&body=Hi%20Phoenix%20Brothers%2C%0A%0AI%20saw%20your%20work%20on%20Amma%20Koozhkadai%20and%20would%20like%20to%20connect.';
              }}
            >
              <span className="made-by-text">Made by</span>
              <img src={phoenix} alt="Phoenix Logo" className="made-by-logo" />
            </a>
          </div>
      {/* Floating WhatsApp */}
      <a href="https://wa.me/917339214327" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
      </a>
    </footer>
  );
}

export default Footer;