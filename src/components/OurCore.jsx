import React from 'react'
import './OurCore.css'
import { FaStar, FaLeaf, FaBolt, FaShieldAlt } from 'react-icons/fa'

const OurCore = () => {
  return (
    <section className="our-core">
      <div className="core-container">
        <span className="core-label">OUR CORE VALUES</span>
        <h2 className="core-title">
          WHY <span className="highlight">AMMA KOOZH KADAI?</span>
        </h2>

        <div className="values-list">
          {/* Step 1: 100% Organic */}
          <div className="value-step">
            
            <div className="step-content">
              <div className="value-icon green-icon">
                <FaLeaf />
              </div>
              <h3 className="value-name">100% ORGANIC</h3>
              <p className="value-desc">Chemical free.</p>
            </div>
          </div>

          {/* Step 2: Fast Delivery */}
          <div className="value-step">
            
            <div className="step-content">
              <div className="value-icon green-icon-2">
                <FaBolt />
              </div>
              <h3 className="value-name">FAST DELIVERY</h3>
              <p className="value-desc">Fresh in hours.</p>
            </div>
          </div>

          {/* Step 3: Trusted */}
          <div className="value-step">
           
            <div className="step-content">
              <div className="value-icon brown-icon">
                <FaShieldAlt />
              </div>
              <h3 className="value-name">TRUSTED</h3>
              <p className="value-desc">FSSAI quality.</p>
            </div>
          </div>

          {/* Step 4: Top Rank */}
          <div className="value-step">
           
            <div className="step-content">
              <div className="value-icon orange-icon">
                <FaStar />
              </div>
              <h3 className="value-name">TOP RANK</h3>
              <p className="value-desc">Certified organic.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurCore
