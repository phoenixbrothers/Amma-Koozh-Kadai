import React, { useState } from 'react'
import './SignatureSelection.css'
import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    name: 'Chola Koozh',
    tamilName: 'சோளம் கூழ்',
    price: '₹60.00',
    image: new URL('./images/Chola koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 2,
    name: 'Pani Varagu Koozh with coconut milk',
    tamilName: 'பனிவரகு கூழ் தேங்காய்ப்பால் உடன்',
    price: '₹110.00',
    image: new URL('./images/Pani varagu coconut milk koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 3,
    name: 'Kambu Koozh with mor',
    tamilName: 'கம்பு கூழ் மோர் உடன்',
    price: '₹70.00',
    image: new URL('./images/Kambu koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  },
  {
    id: 4,
    name: 'Poongar Koozh with coconut milk',
    tamilName: 'பூங்கார் கூழ் தேங்காய்ப்பால் உடன்',
    price: '₹110.00',
    image: new URL('./images/Poongar coconut mil koozh.jpeg', import.meta.url).href,
    badge: 'Organic'
  }
]

const SignatureSelection = () => {
  return (
    <section className="signature-selection">
      <div className="selection-container">
        <h2 className="selection-title">
          Signature <span className="highlight">Selection</span>
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

export default SignatureSelection
