"use client"

import React from "react"

// src/globalAnimations.js
// A utility to add animations to all divs in a Vite React application

/**
 * Sets up global animations for all divs in the application
 * @param {Object} options - Animation configuration options
 */
export function setupGlobalAnimations(options = {}) {
  const {
    // Animation type: 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale'
    animationType = "fade",

    // Animation duration in milliseconds
    duration = 600,

    // Base delay in milliseconds
    baseDelay = 0,

    // Additional delay per element in milliseconds (for staggered animations)
    staggerDelay = 50,

    // Maximum stagger delay to prevent very late animations
    maxStaggerDelay = 1000,

    // CSS selector for elements to animate
    selector = "div",

    // CSS selector for elements to exclude from animation
    excludeSelector = ".no-animation, .animate-none",

    // Whether to animate elements only once
    once = true,

    // Threshold for intersection observer (0 to 1)
    threshold = 0.1,

    // Root margin for intersection observer
    rootMargin = "0px",

    // Whether to enable debug mode
    debug = false,
  } = options

  // Create a style element for our animations
  const styleEl = document.createElement("style")
  styleEl.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes scale {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    
    .animate-hidden {
      opacity: 0;
    }
    
    .animate-fade {
      animation: fadeIn ${duration}ms ease forwards;
    }
    
    .animate-slide-up {
      animation: slideUp ${duration}ms ease forwards;
    }
    
    .animate-slide-down {
      animation: slideDown ${duration}ms ease forwards;
    }
    
    .animate-slide-left {
      animation: slideLeft ${duration}ms ease forwards;
    }
    
    .animate-slide-right {
      animation: slideRight ${duration}ms ease forwards;
    }
    
    .animate-scale {
      animation: scale ${duration}ms ease forwards;
    }
  `
  document.head.appendChild(styleEl)

  // Get the animation class based on the animation type
  const getAnimationClass = (type) => {
    switch (type) {
      case "fade":
        return "animate-fade"
      case "slide-up":
        return "animate-slide-up"
      case "slide-down":
        return "animate-slide-down"
      case "slide-left":
        return "animate-slide-left"
      case "slide-right":
        return "animate-slide-right"
      case "scale":
        return "animate-scale"
      default:
        return "animate-fade"
    }
  }

  // Function to check if an element should be animated
  const shouldAnimate = (element) => {
    // Check if the element matches the exclude selector
    if (excludeSelector && element.matches(excludeSelector)) {
      return false
    }

    // Check if the element is visible
    const style = window.getComputedStyle(element)
    return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0"
  }

  // Set up the intersection observer
  let animatedCount = 0
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target

          if (shouldAnimate(element)) {
            // Calculate delay based on element index with a maximum
            const delay = Math.min(baseDelay + staggerDelay * animatedCount, baseDelay + maxStaggerDelay)

            // Apply animation with delay
            element.style.animationDelay = `${delay}ms`
            element.classList.remove("animate-hidden")
            element.classList.add(getAnimationClass(animationType))

            animatedCount++

            if (debug) {
              console.log(`Animating element #${animatedCount}:`, element, `with delay: ${delay}ms`)
            }

            // Unobserve if we only want to animate once
            if (once) {
              observer.unobserve(element)
            }
          } else if (debug) {
            console.log("Skipping element (excluded):", element)
          }
        }
      })
    },
    { threshold, rootMargin },
  )

  // Function to initialize animations
  const initializeAnimations = () => {
    // Select all elements matching the selector
    const elements = document.querySelectorAll(selector)

    if (debug) {
      console.log(`Found ${elements.length} elements matching selector "${selector}"`)
    }

    // Observe each element
    elements.forEach((element) => {
      // Add the hidden class to all elements initially
      if (shouldAnimate(element)) {
        element.classList.add("animate-hidden")
        observer.observe(element)
      }
    })
  }

  // Initialize animations when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAnimations)
  } else {
    initializeAnimations()
  }

  // Return a cleanup function
  return () => {
    observer.disconnect()
    document.head.removeChild(styleEl)
  }
}

/**
 * React component that sets up global animations
 * @param {Object} props - Component props
 * @param {Object} props.options - Animation options
 * @param {React.ReactNode} props.children - Child components
 */
export function GlobalAnimationProvider({ children, options = {} }) {
  React.useEffect(() => {
    // Set up animations and store cleanup function
    const cleanup = setupGlobalAnimations(options)

    // Clean up when component unmounts
    return cleanup
  }, [options])

  return children
}
