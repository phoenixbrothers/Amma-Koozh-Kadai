import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

// Lazy load home page components
const HeroCarousel = lazy(() => import('./components/HeroCarousel'))
const TraditionalSelection = lazy(() => import('./components/TraditionalSelection'))
const SignatureSelection = lazy(() => import('./components/SignatureSelection'))
const FreshnessDelivered = lazy(() => import('./components/FreshnessDelivered'))
const OurCore = lazy(() => import('./components/OurCore'))
const FeaturedBenefits = lazy(() => import('./components/FeaturedBenefits'))

// Lazy load route components
const AboutUs = lazy(() => import('./components/AboutUs'))
const Foods = lazy(() => import('./components/Foods'))
const FranchiseEnquiry = lazy(() => import('./components/FranchiseEnquiry'))
const BlogPost = lazy(() => import('./components/BlogPost'))

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    minHeight: '100vh',
    width: '100%',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '18px',
    color: '#7b2d8e',
    backgroundColor: '#fffcf7',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999
  }}>
    <div style={{
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #7b2d8e',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 15px'
      }}></div>
      <div>Loading...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <>
                <HeroCarousel />
                <TraditionalSelection />
                <SignatureSelection />
                <FreshnessDelivered />
                <OurCore />
                <FeaturedBenefits />
              </>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/franchise" element={<FranchiseEnquiry />} />
            <Route path="/post/:id" element={<BlogPost />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}

export default App
