import React, { useState, useEffect } from 'react'
import './HeroCarousel.css'

const slides = [
  {
    id: 1,
    title: 'Mappillai Samba Koozh',
    subtitle: '100% Organic',
    description: 'Traditional fermented rice — the ultimate probiotic superfood',
    image: new URL('./images/1.png', import.meta.url).href,
    bgColor: '#161518'
  },
  {
    id: 2,
    title: 'Kambu Koozh',
    subtitle: '100% Organic',
    description: 'Pearl millet porridge rich in iron and nutrients for energy',
    image: new URL('./images/2.png', import.meta.url).href,
    bgColor: '#8b7355'
  },
  {
    id: 3,
    title: 'Karuppu Kavuni Koozh',
    subtitle: '100% Organic',
    description: 'Black rice porridge packed with antioxidants and fiber',
    image: new URL('./images/3.png', import.meta.url).href,
    bgColor: '#5a4a6a'
  },
  {
    id: 4,
    title: 'Kelvargu Koozh',
    subtitle: '100% Organic',
    description: 'Foxtail millet porridge for better digestion and wellness',
    image: new URL('./images/5.png', import.meta.url).href,
    bgColor: '#6b8e6f'
  }
]

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  return (
    <div className="hero-carousel" role="region" aria-label="Product carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${slide.image})`,
            backgroundColor: '#fff'
          }}
          role={index === currentSlide ? "main" : "img"}
          aria-label={`Slide ${index + 1}: ${slide.title}`}
        >
          <div className="carousel-right-overlay"></div>
          <div className="carousel-content">
            <h1 className="carousel-title">{slide.title}</h1>
            <p className="carousel-subtitle">{slide.subtitle}</p>
            <p className="carousel-description">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        className="carousel-arrow prev" 
        onClick={prevSlide} 
        aria-label="Previous slide"
        type="button"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        className="carousel-arrow next" 
        onClick={nextSlide} 
        aria-label="Next slide"
        type="button"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
