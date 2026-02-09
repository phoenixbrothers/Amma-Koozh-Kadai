import React from 'react'
import './FreshnessDelivered.css'

const FreshnessDelivered = () => {
  return (
    <section className="freshness-delivered">
      <div className="freshness-container">
        <h2 className="freshness-title">
          Freshness Delivered<br />
          Straight to you <span className="heart-icon"></span>
        </h2>
        <p className="freshness-subtitle">
          Premium flavors, zero hassle. Order through our trusted delivery partners.
        </p>

        <div className="delivery-cards">
          <a 
            href="https://www.swiggy.com/menu/1027214?source=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="delivery-card swiggy-card"
          >
            <img 
              src={new URL('./images/swiggy.jpg', import.meta.url).href}
              alt="Swiggy" 
              className="delivery-logo"
            />
            <div className="card-content">
              <span className="delivery-label">DELIVERY</span>
              <div className="rating">
                <span className="star">⭐</span>
                <span className="rating-value">4.6</span>
              </div>
              <h3 className="delivery-name">Swiggy</h3>
            </div>
            <span className="arrow-icon">↗</span>
          </a>

          <a 
            href="https://zomato.onelink.me/xqzv/q64csod8"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-card zomato-card"
          >
            <img 
              src={new URL('./images/zomato.jpg', import.meta.url).href}
              alt="Zomato" 
              className="delivery-logo"
            />
            <div className="card-content">
              <span className="delivery-label">DELIVERY</span>
              <div className="rating">
                <span className="star">⭐</span>
                <span className="rating-value">4.7</span>
              </div>
              <h3 className="delivery-name">Zomato</h3>
            </div>
            <span className="arrow-icon">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FreshnessDelivered
