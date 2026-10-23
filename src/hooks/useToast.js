"use client"

import { useState, useCallback } from "react"

// Toast context and provider would normally go here, but for simplicity
// we'll create a basic implementation

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }) => {
    const id = ++toastId

    const newToast = {
      id,
      title,
      description,
      variant,
      duration,
    }

    setToasts((prev) => [...prev, newToast])

    // Create and show the toast element
    showToast(newToast)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    hideToast(id)
  }, [])

  return {
    toast,
    toasts,
    removeToast,
  }
}

// Simple toast display implementation
function showToast(toast) {
  // Remove any existing toast container
  const existingContainer = document.getElementById("toast-container")
  if (existingContainer) {
    existingContainer.remove()
  }

  // Create toast container
  const container = document.createElement("div")
  container.id = "toast-container"
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    pointer-events: none;
  `

  // Create toast element
  const toastElement = document.createElement("div")
  toastElement.id = `toast-${toast.id}`
  toastElement.style.cssText = `
    background: ${toast.variant === "destructive" ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "linear-gradient(135deg, #7c3aed, #06b6d4)"};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid ${toast.variant === "destructive" ? "rgba(220, 38, 38, 0.3)" : "rgba(124, 58, 237, 0.3)"};
    max-width: 400px;
    margin-bottom: 12px;
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
    pointer-events: auto;
    cursor: pointer;
  `

  toastElement.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="flex: 1;">
        ${toast.title ? `<div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${toast.title}</div>` : ""}
        ${toast.description ? `<div style="font-size: 13px; opacity: 0.9; line-height: 1.4;">${toast.description}</div>` : ""}
      </div>
      <button style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        opacity: 0.7;
        padding: 0;
        margin-left: 8px;
      " onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `

  // Add click to dismiss
  toastElement.addEventListener("click", () => {
    hideToast(toast.id)
  })

  container.appendChild(toastElement)
  document.body.appendChild(container)

  // Animate in
  setTimeout(() => {
    toastElement.style.transform = "translateX(0)"
  }, 10)
}

function hideToast(id) {
  const toastElement = document.getElementById(`toast-${id}`)
  if (toastElement) {
    toastElement.style.transform = "translateX(100%)"
    toastElement.style.opacity = "0"
    setTimeout(() => {
      const container = document.getElementById("toast-container")
      if (container && container.children.length <= 1) {
        container.remove()
      } else if (toastElement.parentElement) {
        toastElement.remove()
      }
    }, 300)
  }
}
