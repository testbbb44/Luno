"use client"

import { useState, useEffect, useRef } from "react"

export function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  clearDelay = 1000,
  clearSpeed = 30,
  onComplete = () => {},
  className = "",
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState("initial") // initial, typing, waiting, clearing
  const timeoutRef = useRef(null)

  // Reset all timeouts when component unmounts or text changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text])

  // Initial delay before starting the cycle
  useEffect(() => {
    if (phase === "initial") {
      timeoutRef.current = setTimeout(() => {
        setPhase("typing")
      }, delay)
    }
  }, [phase, delay])

  // Handle typing phase
  useEffect(() => {
    if (phase !== "typing") return

    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    } else {
      onComplete()
      setPhase("waiting")
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, phase, text, speed, onComplete])

  // Handle waiting phase
  useEffect(() => {
    if (phase !== "waiting") return

    timeoutRef.current = setTimeout(() => {
      setPhase("clearing")
    }, clearDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [phase, clearDelay])

  // Handle clearing phase
  useEffect(() => {
    if (phase !== "clearing") return

    if (displayedText.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
      }, clearSpeed)
    } else {
      setCurrentIndex(0)
      setPhase("typing") // Restart the cycle
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayedText, phase, clearSpeed])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="typing-cursor">|</span>}
      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          width: 2px;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  )
}
