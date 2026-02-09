import React, { useState } from 'react'
import './TraditionalSelection.css'
import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    name: 'KaruppuKavuni Koozh',
    tamilName: 'கருப்பு கவுணி கூழ்',
    price: '₹130.00',
    image: new URL('./images/KARUPPU KAVUNI KOOZH.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 2,
    name: 'Kambu Koozh',
    tamilName: 'கம்பு கூழ்',
    price: '₹60.00',
    image: new URL('./images/Kambu koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 3,
    name: 'Red Rice koozh',
    tamilName: 'சிவப்பு அரிசி கூழ்',
    price: '₹80.00',
    image: new URL('./images/RED RICE KOOZH.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 4,
    name: 'Kelvaragu koozh',
    tamilName: 'கேழ்வரகு கூழ்',
    price: '₹40.00',
    image: new URL('./images/Kelvaragu koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  }
]

const TraditionalSelection = () => {
  return (
    <section className="traditional-selection">
      <div className="selection-container">
        <h2 className="selection-title">
          Traditional <span className="highlight">Selection</span>
        </h2>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TraditionalSelection
