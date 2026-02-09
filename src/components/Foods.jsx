import { useState } from 'react';
import { products, categories } from '../data/productData';
import ProductCard from './ProductCard';
import './Foods.css';

function Foods() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [koozhFilter, setKoozhFilter] = useState('All Koozh');

  const baseFiltered = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const filteredProducts = selectedCategory === 'Koozh'
    ? baseFiltered.filter(product => {
        if (koozhFilter === 'All Koozh') return true;
        const type = product.koozhType || product.packType || 'Normal';
        return type === koozhFilter;
      })
    : baseFiltered;

  const koozhSubFilters = ['All Koozh', 'Normal', 'With Mor', 'With Coconut Milk'];

  return (
    <div className="foods-container">
      <h1>Our Food Menu</h1>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              if (category !== 'Koozh') {
                setKoozhFilter('All Koozh');
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory !== 'All' && (
        <>
          <h2 className="category-subtitle">{selectedCategory}</h2>
          <div className="category-separator"></div>
          {selectedCategory === 'Koozh' && (
            <div className="subcategory-filters">
              {koozhSubFilters.map(filter => (
                <button
                  key={filter}
                  className={`subcategory-btn ${koozhFilter === filter ? 'active' : ''}`}
                  onClick={() => setKoozhFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Foods;
