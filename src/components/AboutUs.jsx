import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, X, Building2, ChevronDown, ChevronUp, Globe, Star, Send, Trash2
} from "lucide-react";
import { supabase } from "../firebase/config";
import "./AboutUs.css";

// Image Imports (WebP format for better performance)
import img from "../assets/asset/ori.webp";
import imgMobile from "../assets/asset/ori-mobile.webp";
import owner from "../assets/asset/owner.webp";
import img1 from "../assets/asset/img1.webp";
import img2 from "../assets/asset/img2.webp";
import img3 from "../assets/asset/img3.webp";
import img4 from "../assets/asset/img4.webp";
import img5 from "../assets/asset/img5.webp";
import img6 from "../assets/asset/img6.webp";
import img7 from "../assets/asset/img7.webp";
import img8 from "../assets/asset/img8.webp";
import img9 from "../assets/asset/img9.webp";
import i10 from "../assets/asset/i10.jpeg";
import i11 from "../assets/asset/i11.jpeg";
import i12 from "../assets/asset/i12.jpeg";
import i13 from "../assets/asset/i13.jpeg";
import i14 from "../assets/asset/i14.jpeg";
import i15 from "../assets/asset/i15.jpeg";
import i16 from "../assets/asset/i16.jpeg";
import i17 from "../assets/asset/i17.jpeg";
import i18 from "../assets/asset/i18.jpeg";
import i19 from "../assets/asset/i19.jpeg";
import i20 from "../assets/asset/i20.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const ownerContent = {
  en: {
    badge: "The Mind Behind The Flavor",
    role: "Founder & Executive Chef",
    bio: "The owner of this restaurant brings years of experience in authentic South Indian cuisine. From an early age, he developed a deep appreciation for traditional, time-honored cooking methods passed down through generations. Inspired by the flavors of his grandmother's home cooking, he set out to recreate those cherished tastes for a wider audience. This restaurant was born from that vision. Quality, hygiene, and authenticity remain at the heart of everything he does, with meticulous attention given to every dish served. His ultimate goal is to preserve the essence of traditional South Indian flavors while presenting them to the present generation in a memorable and satisfying way.",
    readMore: "Read More",
    showLess: "Show Less"
  },
  ta: {
    badge: "சுவையின் பின்னணியில் உள்ள மனம்",
    role: "நிறுவனர் மற்றும் தலைமை சமையல் கலைஞர்",
    bio: "இந்த உணவகத்தின் உரிமையாளர் பாரம்பரிய தென்னிந்திய சமையலில் ஆழ்ந்த அனுபவம் கொண்டவர். சிறுவயதிலிருந்தே பழமையான சமையல் முறைகளில் ஆர்வம் கொண்டு வளர்ந்தவர். பாட்டி வீட்டு சுவையை மக்களுக்கு வழங்க வேண்டும் என்பதே இவரின் கனவு. அந்த எண்ணத்தின் விளைவாக இந்த உணவகம் தொடங்கப்பட்டது. உணவின் தரமும் சுத்தமும் எப்போதும் முதன்மையாக கருதப்படுகின்றது. வாடிக்கையாளர்கள் திருப்தியாக உணவு உண்ண வேண்டும் என்பதில் மிகுந்த கவனம் செலுத்துகிறார். பாரம்பரிய சுவையை இன்றைய தலைமுறைக்கும் கொண்டு சேர்ப்பதே இவரின் நோக்கம்.",
    readMore: "மேலும் படிக்க",
    showLess: "சுருக்கமாக"
  }
};

const hotelContent = {
  en: {
    badge: "Our Base",
    title: "The Heritage Hotel",
    desc: "We are a special restaurant that serves traditional South Indian food. We strictly follow age-old South Indian cooking methods in our kitchen. The taste of grandmother's home cooking and natural aroma are the true identity of our food. Our dishes are prepared daily using only fresh and high-quality ingredients. From breakfast to lunch and dinner, we serve a wide variety of South Indian meals. All food is cooked naturally, without adding any artificial flavors. Cleanliness and food quality are very important to us. Our restaurant is a perfect place to enjoy a peaceful meal with your family.",
    readMore: "Read More",
    showLess: "Show Less"
  },
  ta: {
    badge: "எங்கள் தளம்",
    title: "பாரம்பரிய விடுதி",
    desc: "நாங்கள் பாரம்பரிய தென்னிந்திய உணவுகளை வழங்கும் ஒரு சிறப்பு உணவகம். எங்கள் சமையலில் பழமையான தென்னிந்திய சமையல் முறைகளையே முழுமையாக கடைபிடிக்கிறோம். பாட்டி வீட்டு சுவையும் இயற்கையான மணமும் எங்கள் உணவின் முக்கிய அடையாளமாகும். தினமும் புதியதும் தரமானதுமான மூலப்பொருட்களை மட்டுமே பயன்படுத்தி உணவு தயாரிக்கப்படுகிறது. காலை உணவு முதல் மதிய உணவு மற்றும் இரவு உணவு வரை அனைத்து தென்னிந்திய உணவுகளும் கிடைக்கின்றன. எந்த செயற்கை சுவை பொருட்களும் சேர்க்காமல் இயற்கையான முறையில் சமையல் செய்யப்படுகிறது. உணவின் சுத்தமும் தரமும் எங்களுக்கு மிக முக்கியமானதாக கருதப்படுகிறது.",
    readMore: "மேலும் படிக்க",
    showLess: "சுருக்கமாக"
  }
};

const ratingsContent = {
  en: {
    title: "Customer Reviews",
    badge: "What Our Customers Say",
    avgRating: "4.8",
    totalRatings: "500+ Reviews"
  },
  ta: {
    title: "வாடிக்கையாளர் மதிப்பீடுகள்",
    badge: "எங்கள் வாடிக்கையாளர்கள் சொல்வது",
    avgRating: "4.8",
    totalRatings: "500+ மதிப்பீடுகள்"
  }
};

const customerReviews = [
];

const galleryImages = [
  { src: img1, },
  { src: img2, },
  { src: img3, },
  { src: img4, },
  { src: img5, },
  { src: img6, },
  { src: img7, },
  { src: img8, },
  { src: img9, },
  { src: i10, },
  { src: i11, },
  { src: i12, },
  { src: i13, },
  { src: i14, },
  { src: i15, },
  { src: i16, },
  { src: i17, },
  { src: i18, },
  { src: i19, },
  { src: i20, },
];

export default function AboutUs() {
  const [language, setLanguage] = useState("en");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isOwnerReadMore, setIsOwnerReadMore] = useState(false);
  const [isHotelReadMore, setIsHotelReadMore] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5
  });
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Generate or retrieve unique user ID
  useEffect(() => {
    let id = localStorage.getItem("userSessionId");
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userSessionId", id);
    }
    setUserId(id);
  }, []);

  // Load reviews from Supabase on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching reviews from Supabase...");
        
        // Check if supabase is properly initialized
        if (!supabase || !supabase.from) {
          console.warn("Supabase not properly initialized, using fallback");
          const savedReviews = localStorage.getItem("userReviews");
          if (savedReviews) {
            setUserReviews(JSON.parse(savedReviews));
          }
          return;
        }
        
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) {
          console.warn("Supabase error, using fallback:", error.message);
          const savedReviews = localStorage.getItem("userReviews");
          if (savedReviews) {
            setUserReviews(JSON.parse(savedReviews));
          }
          return;
        }

        console.log("Total documents found:", data?.length || 0);
        console.log("Loaded reviews from Supabase:", data);
        setUserReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Fallback to localStorage if Supabase fails
        try {
          const savedReviews = localStorage.getItem("userReviews");
          if (savedReviews) {
            setUserReviews(JSON.parse(savedReviews));
          }
        } catch (parseError) {
          console.error("Error parsing localStorage:", parseError);
          // If everything fails, just use empty array
          setUserReviews([]);
        }
      }
    };

    // Ensure this runs after component mounts
    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  // Save reviews to localStorage
  const saveReviewsToStorage = (reviews) => {
    localStorage.setItem("userReviews", JSON.stringify(reviews));
  };

  // Handle form submission
  const handleSubmitReview = async (e) => {
    console.log("Submit clicked!");
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.comment.trim()) errors.comment = "Comment is required";
    if (formData.comment.trim().length < 10) errors.comment = "Comment must be at least 10 characters";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newReview = {
      name: formData.name,
      comment: formData.comment,
      rating: formData.rating,
      user_id: userId,
      timestamp: Date.now(),
      created_at: new Date().toISOString()
    };

    try {
      console.log("Saving to Supabase...");
      // Add to Supabase
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select();

      if (error) throw error;

      console.log("Saved with ID:", data[0]?.id);

      // Update local state with the new review
      const updatedReviews = [data[0], ...userReviews];
      setUserReviews(updatedReviews);

      // Also save to localStorage as backup
      saveReviewsToStorage(updatedReviews);

      // Reset form
      setFormData({ name: "", comment: "", rating: 5 });
      setFormErrors({});
      setShowReviewForm(false);

      alert(language === 'en' ? 'Review submitted successfully!' : 'மதிப்பீடு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!');
    } catch (error) {
      console.error("Error adding review:", error);
      alert(language === 'en'
        ? 'Failed to submit review. Please try again.'
        : 'மதிப்பீட்டை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    }
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    const allReviews = [...customerReviews, ...userReviews];
    if (allReviews.length === 0) return "4.8";
    const totalRating = allReviews.reduce((sum, review) => sum + (review?.rating || 0), 0);
    return (totalRating / allReviews.length).toFixed(1);
  };

  // Get total ratings count
  const getTotalRatingsCount = () => {
    return customerReviews.length + userReviews.length;
  };

  // Delete review with confirmation
  const handleDeleteReview = async (index) => {
    const reviewToDelete = userReviews[index];

    try {
      // Delete from Supabase if it has an ID
      if (reviewToDelete.id) {
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', reviewToDelete.id);

        if (error) throw error;
      }

      // Update local state
      const updatedReviews = userReviews.filter((_, i) => i !== index);
      setUserReviews(updatedReviews);
      saveReviewsToStorage(updatedReviews);
      setDeleteConfirmation(null);

      alert(language === 'en' ? 'Review deleted successfully!' : 'மதிப்பீடு வெற்றிகரமாக நீக்கப்பட்டது!');
    } catch (error) {
      console.error("Error deleting review:", error);
      alert(language === 'en'
        ? 'Failed to delete review. Please try again.'
        : 'மதிப்பீட்டை நீக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    }
  };

  // Check if review can be deleted (same user and within 10 minutes)
  const canDeleteReview = (review) => {
    if (!userId || !review.user_id || !review.timestamp) return false;
    if (review.user_id !== userId) return false;

    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const timeSinceCreation = Date.now() - review.timestamp;
    return timeSinceCreation < tenMinutes;
  };

  // Get remaining time for delete button
  const getTimeRemaining = (review) => {
    if (!review.timestamp) return 0;
    const tenMinutes = 10 * 60 * 1000;
    const timeSinceCreation = Date.now() - review.timestamp;
    const remaining = Math.ceil((tenMinutes - timeSinceCreation) / 1000);
    return Math.max(0, remaining);
  };

  // Sort reviews
  const getSortedAndFilteredReviews = () => {
    let allReviews = [...customerReviews, ...userReviews];

    if (filterRating) {
      allReviews = allReviews.filter(review => review?.rating === filterRating);
    }

    if (sortBy === "recent") {
      allReviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } else if (sortBy === "highest") {
      allReviews.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    } else if (sortBy === "lowest") {
      allReviews.sort((a, b) => (a?.rating || 0) - (b?.rating || 0));
    }

    return allReviews;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "Recently";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const LanguageToggle = () => (
    <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200 w-fit">
      {["en", "ta"].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${language === lang ? 'bg-amber-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'
            }`}
        >
          {lang === 'en' ? 'EN' : 'தமிழ்'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-[#fffcf7] text-stone-800 font-sans selection:bg-amber-200 overflow-x-hidden">

      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={img} />
            <img
              src={imgMobile || img}
              alt="Restaurant Ambience"
              className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/40 to-[#fffcf7]" />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-6">
          <span className="uppercase tracking-[0.2em] text-amber-300 font-bold text-xs md:text-sm mb-3 block">
            Natural • Healthy • Since 1998
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-4 leading-tight">
            Authentic <span className="italic text-amber-300 font-light block md:inline">Real Koozh</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-100 italic text-base md:text-xl font-light leading-relaxed">
            "The soul of the village in every bowl. Traditional millets, diverse flavors, naturally healthy."
          </p>
        </motion.div>
      </section>

      {/* --- 2. OWNER PROFILE SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-20 pb-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-100"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 relative h-[400px] md:h-[500px] lg:h-auto">
              <img
                src={owner}
                alt="Founder"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <h3 className="text-3xl font-serif uppercase tracking-wider">Suresh</h3>
                <div className="h-1 w-16 bg-amber-400 mt-2 mb-1"></div>
                <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">{ownerContent[language].role}</p>
              </div>
            </div>

            <div className="lg:w-3/5 p-6 md:p-12 lg:p-16">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="hidden lg:block">
                  <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">{ownerContent[language].badge}</span>
                  <h2 className="text-4xl font-serif text-stone-900 mt-1">Suresh</h2>
                  <p className="text-stone-500 font-medium italic">{ownerContent[language].role}</p>
                </div>
                <LanguageToggle />
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={language}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <p className={`text-stone-600 leading-relaxed text-base md:text-lg transition-all duration-500 ${!isOwnerReadMore ? "line-clamp-4 lg:line-clamp-none" : ""}`}>
                      {ownerContent[language].bio}
                    </p>
                    {!isOwnerReadMore && <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent lg:hidden" />}
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => setIsOwnerReadMore(!isOwnerReadMore)}
                  className="lg:hidden mt-4 flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-wider hover:text-amber-600 transition-colors"
                >
                  {isOwnerReadMore ? (
                    <>{ownerContent[language].showLess} <ChevronUp size={18} /></>
                  ) : (
                    <>{ownerContent[language].readMore} <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- 3. FLAGSHIP HOTEL SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                <Building2 size={20} />
              </div>
              <span className="text-amber-800 text-sm font-bold uppercase tracking-widest">{hotelContent[language].badge}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">{hotelContent[language].title}</h2>

            <div className="relative">
              <p className={`text-stone-600 text-base md:text-lg leading-relaxed transition-all ${!isHotelReadMore ? "line-clamp-3" : ""}`}>
                {hotelContent[language].desc}
              </p>
              <button
                onClick={() => setIsHotelReadMore(!isHotelReadMore)}
                className="mt-3 mb-8 flex items-center gap-1 text-amber-700 font-bold text-xs md:text-sm uppercase tracking-widest"
              >
                {isHotelReadMore ? hotelContent[language].showLess : hotelContent[language].readMore}
                {isHotelReadMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
              <div className="space-y-1">
                <p className="text-4xl font-serif text-amber-600">200+</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-bold">Daily Servings Across 3 Branches</p>
              </div>
              <div className="space-y-1 border-l border-stone-200 pl-8">
                <div className="flex items-center gap-1">
                  <p className="text-4xl font-serif text-amber-600">4.4</p>
                  <span className="text-amber-500 text-xl">★</span>
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-bold">Customer Satisfaction Rating</p>
              </div>
            </div>
          </motion.div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-100/50 rounded-[2.5rem] -rotate-2 scale-95 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-stone-200 h-[350px] md:h-[450px]">
              <iframe
                width="100%" height="100%"
                src="https://my.matterport.com/show/?m=KuMbmb66WbD&play=1&qs=1&dh=0&lp=0&m=0&search=0&hr=0&help=0&brand=0&title=0&tourbuttons=0"
                allowFullScreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
                className="w-full h-full border-0"
                title="360 View"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. RATINGS & REVIEWS SECTION --- */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-amber-800 text-sm font-bold uppercase tracking-widest">{ratingsContent[language].badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mt-3 mb-8">{ratingsContent[language].title}</h2>

            {/* Average Rating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex flex-col items-center bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl shadow-xl p-10 md:p-16 border-2 border-amber-200 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200 rounded-full opacity-10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200 rounded-full opacity-10 blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-6xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-bold">
                    {calculateAverageRating()}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={28} className="fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Based on {getTotalRatingsCount()} reviews</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-amber-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{[...customerReviews, ...userReviews].filter(r => r?.rating === 5).length}</p>
                    <p className="text-xs text-stone-500 mt-1">★★★★★</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{[...customerReviews, ...userReviews].filter(r => r?.rating >= 3 && r?.rating < 5).length}</p>
                    <p className="text-xs text-stone-500 mt-1">★★★+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{[...customerReviews, ...userReviews].filter(r => r?.rating < 3).length}</p>
                    <p className="text-xs text-stone-500 mt-1">Below ★★★</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* View All Comments Button */}
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCommentsOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:shadow-lg transition-shadow"
            >
              <Camera size={20} />
              {language === 'en' ? `View All ${getTotalRatingsCount()} Comments` : `அனைத்து ${getTotalRatingsCount()} கருத்துக்களை பார்க்க`}
            </motion.button>
          </div>

          {/* Review Form Modal */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
                onClick={() => setShowReviewForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif text-stone-900">
                      {language === 'en' ? 'Share Your Experience' : 'உங்கள் அனுபவத்தைப் பகிரவும்'}
                    </h3>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">
                        {language === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                        }}
                        placeholder={language === 'en' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500'
                          }`}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>

                    {/* Comment Input */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">
                        {language === 'en' ? 'Your Comment' : 'உங்கள் கருத்து'} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.comment}
                        onChange={(e) => {
                          setFormData({ ...formData, comment: e.target.value });
                          if (formErrors.comment) setFormErrors({ ...formErrors, comment: null });
                        }}
                        placeholder={language === 'en' ? 'Share your experience...' : 'உங்கள் அனுபவத்தைப் பகிரவும்...'}
                        rows="4"
                        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all resize-none ${formErrors.comment ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-amber-500'
                          }`}
                      />
                      <div className="flex justify-between mt-1">
                        {formErrors.comment && <p className="text-red-500 text-xs">{formErrors.comment}</p>}
                        <p className="text-xs text-stone-400 ml-auto">{formData.comment.length}/500</p>
                      </div>
                    </div>

                    {/* Rating Input */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-3">
                        {language === 'en' ? 'Your Rating' : 'உங்கள் மதிப்பீடு'} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3 bg-stone-50 p-4 rounded-lg">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="transition-all hover:scale-125 active:scale-110"
                          >
                            <Star
                              size={32}
                              className={`transition-all ${star <= formData.rating ? "fill-amber-500 text-amber-500 drop-shadow-lg" : "text-stone-300 hover:text-amber-400"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowReviewForm(false);
                          setFormErrors({});
                        }}
                        className="flex-1 px-4 py-2.5 border-2 border-stone-300 text-stone-700 rounded-lg font-bold hover:bg-stone-50 transition-all"
                      >
                        {language === 'en' ? 'Cancel' : 'ரத்துசெய்'}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
                      >
                        {language === 'en' ? 'Submit Review' : 'மதிப்பீட்டை சமர்ப்பிக்க'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- COMMENTS POPUP MODAL --- */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
            onClick={() => setIsCommentsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl w-[98vw] sm:w-[95vw] h-[95vh] max-w-7xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-6 border-b border-amber-200">
                <div>
                  <h2 className="text-xl sm:text-3xl font-serif text-stone-900">
                    {language === 'en' ? 'All Reviews' : 'அனைத்து மதிப்பீடுகள்'}
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">
                    {getTotalRatingsCount()} {language === 'en' ? 'customer reviews' : 'வாடிக்கையாளர் மதிப்பீடுகள்'}
                  </p>
                </div>
                <button
                  onClick={() => setIsCommentsOpen(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors p-2 hover:bg-white rounded-full ml-auto"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Sort and Filter */}
              <div className="sticky top-16 sm:top-20 z-10 flex gap-2 sm:gap-4 bg-white p-2 sm:p-4 border-b border-stone-200 flex-wrap">

                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-sm font-semibold text-stone-600">{language === 'en' ? 'Filter:' : 'வடிகட்ட:'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterRating(null)}
                      className={`px-3 py-1.5 text-xs rounded-full font-semibold transition-all ${filterRating === null
                          ? 'bg-amber-500 text-white'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                    >
                      {language === 'en' ? 'All' : 'அனைத்து'}
                    </button>
                    {[5, 4, 3].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                        className={`px-2.5 py-1.5 text-xs rounded-full font-semibold transition-all flex items-center gap-1 ${filterRating === rating
                            ? 'bg-amber-500 text-white'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                          }`}
                      >
                        {rating}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments Grid */}
              <div className="overflow-y-auto flex-1 p-3 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {getSortedAndFilteredReviews().map((review, index) => {
                    const isUserReview = userReviews.includes(review);
                    const userReviewIndex = isUserReview ? userReviews.indexOf(review) : -1;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group bg-gradient-to-br from-stone-50 via-white to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${isUserReview ? 'border-amber-400 bg-amber-50/30' : 'border-stone-200 hover:border-amber-300'}`}
                      >
                        {/* User Info and Rating */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                {review?.name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <p className="font-serif text-stone-900 font-bold text-xs sm:text-sm">{review?.name || 'Anonymous'}</p>
                                <p className="text-xs text-stone-400">{formatTime(review?.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                          {isUserReview && review?.user_id === userId && (
                            <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">
                              {language === 'en' ? 'Your Review' : 'உங்கள் மதிப்பீடு'}
                            </div>
                          )}
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(review?.rating || 5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
                          ))}
                          {[...Array(5 - (review?.rating || 5))].map((_, i) => (
                            <Star key={i + (review?.rating || 5)} size={16} className="text-stone-300" />
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-stone-700 leading-relaxed mb-4 text-sm">
                          "{review?.comment || ''}"
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {getSortedAndFilteredReviews().length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                      <Star size={40} className="text-amber-600" />
                    </div>
                    <p className="text-stone-600 text-lg font-medium mb-2">
                      {language === 'en' ? 'No reviews found' : 'மதிப்பீடுகள் இல்லை'}
                    </p>
                    <p className="text-stone-500 text-sm max-w-xs">
                      {language === 'en'
                        ? 'Be the first to share your experience with our restaurant!'
                        : 'நமது உணவகத்துடனான உங்கள் அனுபவத்தைப் பகிரவும்!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <div className="sticky bottom-0 bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-6 border-t border-amber-200 flex gap-2 sm:gap-3 flex-col sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsCommentsOpen(false);
                    setShowReviewForm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:shadow-lg transition-shadow"
                >
                  <Send size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Share Your Review' : 'உங்கள் மதிப்பீட்டைப் பகிரவும்'}</span>
                  <span className="sm:hidden">{language === 'en' ? 'Share' : 'பகிரவும்'}</span>
                </motion.button>
                <button
                  onClick={() => setIsCommentsOpen(false)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-2 border-stone-300 text-stone-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-base hover:bg-stone-50 transition-colors"
                >
                  {language === 'en' ? 'Close' : 'மூட'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deleteConfirmation !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
            onClick={() => setDeleteConfirmation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 size={24} className="text-red-600" />
                </div>
              </div>

              <h3 className="text-2xl font-serif text-stone-900 text-center mb-2">
                {language === 'en' ? 'Delete Review?' : 'மதிப்பீட்டை நீக்க வேண்டுமா?'}
              </h3>

              <p className="text-stone-600 text-center mb-6">
                {language === 'en'
                  ? 'Are you sure you want to delete this review? This action cannot be undone.'
                  : 'இந்த மதிப்பீட்டை நீக்க விரும்புகிறீர்களா? இந்த செயலை செயல்தவிர்க்க முடியாது.'}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-1 px-4 py-3 border border-stone-300 text-stone-700 rounded-lg font-bold hover:bg-stone-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'ரத்துசெய்'}
                </button>
                <button
                  onClick={() => handleDeleteReview(deleteConfirmation)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  {language === 'en' ? 'Delete' : 'நீக்கு'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 5. VISUAL JOURNEY SECTION --- */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Visual Journey</h2>
            <p className="text-stone-500 mt-3 text-lg italic">Explore the craft and heritage behind every meal.</p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {galleryImages.slice(0, 4).map((item, index) => {
            const isLast = index === 3;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => setIsGalleryOpen(true)}
                className="relative min-w-[280px] md:min-w-[380px] aspect-[4/5] overflow-hidden rounded-2xl snap-start cursor-pointer shadow-lg group"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />

                {isLast ? (
                  <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
                    <span className="text-6xl font-serif mb-2">+{galleryImages.length - 3}</span>
                    <p className="uppercase tracking-widest text-xs font-bold text-amber-400">View All Gallery</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                    <p className="text-white font-medium tracking-wide">{item.title}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- FULLSCREEN GALLERY MODAL --- */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-stone-950 p-4 md:p-12 overflow-y-auto"
          >
            <div className="sticky top-1  z-10 flex justify-between items-center mb-2 bg-stone-950/80 backdrop-blur-md py-20 px-5 rounded-xl">
              <h3 className="text-2xl font-serif text-white flex items-center  gap-3">
                <Camera className="text-amber-500" /> Our Gallery
              </h3>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:text-amber-500 transition-colors p-1 bg-white/5 rounded-full"
              >
                <X size={30} />
              </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="group relative aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-serif italic text-lg">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
