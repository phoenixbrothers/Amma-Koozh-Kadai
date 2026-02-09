import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/dist/Draggable"
import { InertiaPlugin } from "gsap/dist/InertiaPlugin"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./FeaturedBenefits.css"

// Register Plugins
gsap.registerPlugin(Draggable, InertiaPlugin)

// Single array - GSAP will handle the looping
const benefits = [
  { 
    title: "பழைய சாதம் நன்மைகள்", 
    description: "பழைய சோறு உடலுக்கு மிகவும் நல்லது மற்றும் ஜீரண சக்தியை அதிகரிக்கும்.", 
    image: new URL('./images/Mappilai samba koozh.jpeg', import.meta.url).href 
  },
  { 
    title: "சிவப்பு அரிசி நன்மைகள்", 
    description: "எலும்புகளுக்கு மிகவும் நல்லது மற்றும் இரும்புச்சத்து நிறைந்தது.", 
    image: new URL('./images/RED RICE KOOZH.jpeg', import.meta.url).href 
  },
  { 
    title: "கம்பு நன்மைகள்", 
    description: "கம்பு அதிக சக்தி மற்றும் நார்ச்சத்து கொண்ட ஒரு சிறந்த பாரம்பரிய உணவு.", 
    image: new URL('./images/Kambu koozh.jpeg', import.meta.url).href 
  },
  { 
    title: "Fermented Rice Benefits", 
    description: "In recent times, the West has started acknowledging traditional Indian foods.", 
    image: new URL('./images/Mappilai samba koozh.jpeg', import.meta.url).href 
  },
  { 
    title: "Health Benefits of red rice", 
    description: "Ragi is a traditional whole grain rich in fiber, calcium, and iron.", 
    image: new URL('./images/RED RICE KOOZH.jpeg', import.meta.url).href 
  },
  { 
    title: "Health Benefits of Pearl Millet", 
    description: "Pearl millet is a high-energy food and an excellent source of protein.", 
    image: new URL('./images/Kambu koozh.jpeg', import.meta.url).href 
  },
]

const FeaturedBenefits = () => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const loopRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [enlargedImage, setEnlargedImage] = useState(null)
  
  const handleImageClick = (image, e) => {
    e.stopPropagation()
    setEnlargedImage(image)
    // Resume carousel when modal opens
    if (loopRef.current?.tl) {
      loopRef.current.tl.resume()
    }
  }

  const closeEnlargedImage = () => {
    setEnlargedImage(null)
    // Resume carousel when modal closes
    if (loopRef.current?.tl) {
      loopRef.current.tl.resume()
    }
  }

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    // Add delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const items = gsap.utils.toArray(".carousel-item")
      
      if (items.length === 0) return
      
      // 1. Initial setup
      gsap.set(items, { x: 0 })

      let lastUpdateTime = 0
      const updateScales = () => {
        const containerRect = container.getBoundingClientRect()
        const center = containerRect.width / 2

        items.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const itemCenter = rect.left + rect.width / 2 - containerRect.left
          const distanceFromCenter = Math.abs(center - itemCenter)
          const maxDistance = 500
          
          const scale = gsap.utils.mapRange(0, maxDistance, 1.1, 0.85, distanceFromCenter)
          const opacity = gsap.utils.mapRange(0, maxDistance, 1, 0.6, distanceFromCenter)
          const zIndex = Math.round(gsap.utils.mapRange(0, maxDistance, 100, 1, distanceFromCenter))

          gsap.set(item, { 
            scale: Math.max(0.85, scale), 
            opacity: Math.max(0.6, opacity),
            zIndex: zIndex,
            overwrite: "auto" 
          })
        })
      }

      // 2. The Horizontal Loop Logic - Don't call updateScales on every frame
      loopRef.current = horizontalLoop(items, {
        repeat: -1,
        speed: 1,
        paddingRight: 0,
        draggable: true,
        inertia: true,
      })

      updateScales()

      // 3. Update active index & scales at reduced frequency
      const observer = setInterval(() => {
        updateScales()
        
        const center = container.offsetWidth / 2
        let closestIdx = 0
        let minDistance = Infinity
        const containerLeft = container.getBoundingClientRect().left

        items.forEach((item, i) => {
          const rect = item.getBoundingClientRect()
          const dist = Math.abs(rect.left + rect.width / 2 - (containerLeft + center))
          if (dist < minDistance) {
            minDistance = dist
            closestIdx = i % benefits.length
          }
        })
        setActiveIndex(closestIdx)
      }, 100)

      return () => {
        clearInterval(observer)
        if (loopRef.current) loopRef.current.kill()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items)
    config = config || {}
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onUpdate: config.onUpdate,
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i

    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")))
        xPercents[i] = parseFloat(gsap.getProperty(el, "xPercent"))
        return xPercents[i]
      },
    })

    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0)

    for (i = 0; i < length; i++) {
      item = items[i]
      curX = (xPercents[i] / 100) * widths[i]
      distanceToStart = item.offsetLeft - startX
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX")
      tl.to(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop) / widths[i]) * 100
          ),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond)
      times[i] = distanceToStart / pixelsPerSecond
    }

    function toIndex(index, vars) {
      vars = vars || {}
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length)
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex]
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
        time += tl.duration() * (index > curIndex ? 1 : -1)
      }
      curIndex = newIndex
      vars.overwrite = true
      if (config.onChange) config.onChange(newIndex)
      return tl.tweenTo(time, vars)
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars)
    tl.prev = (vars) => toIndex(curIndex - 1, vars)
    tl.toIndex = (index, vars) => toIndex(index, vars)

    if (config.draggable && typeof Draggable !== "undefined") {
      let proxy = document.createElement("div"),
        cbw = () => {
          const p = gsap.utils.wrap(
            0,
            1,
            gsap.getProperty(proxy, "x") / -totalWidth
          )
          tl.progress(p)
          const closestIndex = Math.round(p * length) % length
          if (config.onChange) config.onChange(closestIndex)
        }

      Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        inertia: true,
        onPress() {
          this.startProgress = tl.progress()
          tl.pause()
          gsap.set(proxy, { x: this.startProgress * -totalWidth })
        },
        onDrag: cbw,
        onThrowUpdate: cbw,
        onThrowComplete: () => tl.resume(),
      })
    }

    return tl
  }

  return (
    <section className="featured-benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">FEATURED BENEFITS</h2>
          <p className="benefits-subtitle">
            Discover the power of traditional nutrition for a modern lifestyle.
          </p>
        </div>

        <div ref={containerRef} className="carousel-container">
          <div ref={trackRef} className="carousel-track">
            {benefits.map((benefit, i) => (
              <div key={i} className="carousel-item">
                <div className="benefit-card">
                  <div className="benefit-image-wrapper">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="benefit-image"
                      onClick={(e) => handleImageClick(benefit.image, e)}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="benefit-overlay">
                      <h3 className="benefit-card-title">{benefit.title}</h3>
                      <p className="benefit-card-desc">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <div className="carousel-buttons">
              <button
                onClick={() =>
                  loopRef.current?.prev({ duration: 0.8, ease: "power3.out" })
                }
                className="carousel-btn prev-btn"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  loopRef.current?.next({ duration: 0.8, ease: "power3.out" })
                }
                className="carousel-btn next-btn"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="carousel-dots">
              {benefits.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    loopRef.current?.toIndex(i, { duration: 0.8 })
                  }
                  className={`dot ${activeIndex === i ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Image Lightbox */}
      {enlargedImage && (
        <div className="image-lightbox" onClick={closeEnlargedImage}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={closeEnlargedImage}
              aria-label="Close enlarged image"
            >
              ✕
            </button>
            <img 
              src={enlargedImage} 
              alt="Enlarged" 
              className="lightbox-image" 
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturedBenefits
