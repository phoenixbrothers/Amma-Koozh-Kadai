import React from 'react'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
          decoding="async"
        />
        <span className="organic-badge">{product.badge}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <span className="product-name-en">{product.nameEnglish || product.name}</span>
          {(product.nameTamil || product.tamilName) && (
            <span className="product-name-ta">{product.nameTamil || product.tamilName}</span>
          )}
        </h3>
        
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
