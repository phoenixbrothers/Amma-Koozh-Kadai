import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import emailjs from '@emailjs/browser'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import * as EmailValidator from 'email-validator'
import './FranchiseEnquiry.css'

const FranchiseEnquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    remark: ''
  })
  const [countryCode, setCountryCode] = useState('+91')
  const [errors, setErrors] = useState({})
  const [recaptchaValue, setRecaptchaValue] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  // Country codes list
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+61', country: 'Australia' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+46', country: 'Sweden' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+45', country: 'Denmark' },
    { code: '+47', country: 'Norway' },
    { code: '+48', country: 'Poland' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+82', country: 'South Korea' },
    { code: '+60', country: 'Malaysia' },
    { code: '+65', country: 'Singapore' },
    { code: '+66', country: 'Thailand' },
    { code: '+64', country: 'New Zealand' },
    { code: '+27', country: 'South Africa' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+57', country: 'Colombia' }
  ]
  
  // Use environment variable for reCAPTCHA site key, fallback to test key
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

  // Email validation function - comprehensive validation
  const validateEmail = (email) => {
    // Use email-validator library for comprehensive validation
    // It checks: format, domain validity, special characters, length, etc.
    if (!EmailValidator.validate(email)) {
      return false
    }
    
    // Additional custom checks
    if (email.length > 254) return false
    if (email.split('@')[0].length > 64) return false
    
    // Check for common disposable email domains
    const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com']
    const domain = email.split('@')[1]?.toLowerCase()
    if (disposableDomains.includes(domain)) {
      return false
    }
    
    return true
  }

  // Phone validation function - international format validation
  const validatePhone = (phone, countryCode) => {
    try {
      // Check if phone number is exactly 10 digits
      if (phone.length !== 10) {
        return false
      }
      
      // Ensure only numbers
      if (!/^\d{10}$/.test(phone)) {
        return false
      }
      
      // Get country code from the selected country code string (e.g., "+91" -> "IN")
      const fullPhoneNumber = `${countryCode}${phone}`
      
      // Validate using libphonenumber-js
      const isValid = isValidPhoneNumber(fullPhoneNumber)
      return isValid
    } catch (error) {
      console.error('Phone validation error:', error)
      return false
    }
  }

  const benefits = [
    'Excellent opportunity for people with interest in business.',
    'Easy to handle, no experience/chef needed.',
    'Return of investment (ROI) within 8 to 12 months.',
    'More stable income with less investment.',
    'Automated billing system.',
    'Precautionary steps and ideas to avoid loss.',
    'Life time validity.',
    'Free training',
    'Continued customer support'
  ]

  // Tamil translations for benefits (keeps same index order)
  const benefitsTA = [
    'வணிகத்தில் ஆர்வமுள்ளவர்களுக்கு சிறந்த வாய்ப்பு.',
    'கையாள எளிமையானது, அனுபவம்/சமையலர் தேவையில்லை.',
    'முதலீட்டின் திருப்பம் (ROI) 8–12 மாதங்களில்.',
    'குறைந்த முதலீட்டில் நிலையான வருமானம்.',
    'தானியங்கி பில்லிங் அமைப்பு.',
    'நஷ்டம் தவிர்ப்பதற்கான எச்சரிக்கை நடவடிக்கைகள் மற்றும் யோசனைகள்.',
    'ராயல்டி இல்லை.',
    'ஆயுள் முழுவதும் செல்லுபடியாகும்.',
    'இலவச பயிற்சி',
    'தொடர்ந்த பயனாளர் ஆதரவு'
  ]

  // UI language state: 'en' or 'ta'
  const [lang, setLang] = useState('en')

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // If it's the mobile field, only allow numbers and limit to 10 digits
    if (name === 'mobile') {
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)'
    }
    
    // Validate phone number
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone number is required'
    } else if (!validatePhone(formData.mobile, countryCode)) {
      newErrors.mobile = 'Please enter a valid 10-digit phone number'
    }
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'Frances Location is required'
    }
    
    setErrors(newErrors)
    
    // If there are validation errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      return
    }
    
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA verification')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // EmailJS configuration via environment variables (with safe fallbacks)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_2jokgb2'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_v345iht'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '-2EIAAeBVeZp1fiAi'
      const toEmail = import.meta.env.VITE_CONTACT_EMAIL || 'ammakoozhkadaii@gmail.com'
      const toPhone = import.meta.env.VITE_CONTACT_PHONE || '+91733 921 4327'
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      const fullPhoneNumber = `${countryCode}${formData.mobile}`
      
      // Pass clean data to EmailJS - no template literals here!
      const templateParams = {
        to_email: toEmail,
        to_phone: toPhone,
        name: formData.name,
        email: formData.email,
        phone: fullPhoneNumber,
        city: formData.city,
        remark: formData.remark || 'N/A',
        submitted_at: submittedAt,
        year: new Date().getFullYear()
      }
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setSubmitSuccess(true)
      alert('Thank you! Your enquiry has been submitted successfully. We will contact you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        remark: ''
      })
      setRecaptchaValue(null)
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to submit enquiry. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="franchise-enquiry">
      <div className="franchise-container">
        {/* Left Section */}
        <div className="franchise-left">
          {/* <p className="franchise-intro">Franchise : Good reasons,</p> */}
          <h1 className="franchise-title">TO START A FRANCHISE WITH US!</h1>

          <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200 w-fit" role="tablist" aria-label="Language toggle">
            {['en', 'ta'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                type="button"
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  lang === l ? 'bg-amber-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {l === 'en' ? 'EN' : 'தமிழ்'}
              </button>
            ))}
          </div>

          <ul className="benefits-list">
            {benefits.map((benefit, index) => {
              const text = lang === 'en' ? benefit : (benefitsTA[index] || benefit)
              return <li key={index}>{text}</li>
            })}
          </ul>
        </div>

        {/* Right Section - Form */}
        <div className="franchise-right">
          <div className="enquiry-form-card">
            <h2 className="form-title">Enquiry Form</h2>
            
            <form onSubmit={handleSubmit} className="enquiry-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Full Name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Email Address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group mobile-group">
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="country-select"
                  aria-label="Country Code"
                >
                  {countryCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} {item.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile No"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  inputMode="numeric"
                  aria-label="Mobile Number"
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  placeholder="Frances Location"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  aria-label="Franchise Location"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <textarea
                  name="remark"
                  placeholder="Remark (optional)"
                  value={formData.remark}
                  onChange={handleChange}
                  rows={3}
                  aria-label="Additional Remarks"
                />
              </div>

              <div className="form-group recaptcha-group">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={onRecaptchaChange}
                  theme="light"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FranchiseEnquiry
