import { toast } from "react-toastify"

/**
 * Structured error handler for the crypto investment API
 * Handles different types of API responses and displays appropriate messages
 */
export const handleError = (error, response = null, data = null) => {
  console.error("API Error:",  error)

  if (error?.data.errors) {
    
    toast.error(error?.data.errors[0], {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 8000,
    })
    return {
      type: "VALIDATION_ERROR",
      message: "Validation error",
      // shouldRetry: true,
    }
  }
  // Network/Connection Errors
  if (error?.name === "TypeError" && error?.message === "Failed to fetch") {
    toast.error("Unable to reach the server. Please check your internet connection or try again later.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "NETWORK_ERROR",
      message: "Network connection failed",
      shouldRetry: true,
    }
  }

  // Handle fetch errors
  if (error?.status === "FETCH_ERROR" || !response) {
    toast.error("Unable to reach the server. Please try again later or contact support.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "FETCH_ERROR",
      message: "Server unreachable",
      shouldRetry: true,
    }
  }

  // Parse response data if it's a Response object
  const statusCode = response?.status || error?.status
  const responseData = data || error?.data

  // Handle different HTTP status codes
  switch (statusCode) {
    case 400:
      return handleBadRequest(responseData)

    case 401:
      return handleUnauthorized(responseData)

    case 403:
      return handleForbidden(responseData)

    case 404:
      return handleNotFound(responseData)

    case 409:
      return handleConflict(responseData)

    case 422:
      return handleValidationError(responseData)

    case 429:
      return handleRateLimit(responseData)

    case 500:
    case 502:
    case 503:
    case 504:
      return handleServerError(responseData, statusCode)

    default:
      return handleUnknownError(responseData, statusCode)
  }
}

/**
 * Handle 400 Bad Request errors
 */
const handleBadRequest = (data) => {
  const message = data?.message || "Invalid request. Please check your input."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  return {
    type: "BAD_REQUEST",
    message,
    errors: data?.errors || [],
    shouldRetry: false,
  }
}

/**
 * Handle 401 Unauthorized errors
 */
const handleUnauthorized = (data) => {
  const message = data?.message || "Authentication failed. Please log in again."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  // Clear user session
  localStorage.removeItem("user")
  localStorage.removeItem("isLoggedIn")

  // Redirect to login after a short delay
  setTimeout(() => {
    window.location.href = "/"
  }, 2000)

  return {
    type: "AUTH_ERROR",
    message,
    shouldRetry: false,
    requiresReauth: true,
  }
}

/**
 * Handle 403 Forbidden errors
 */
const handleForbidden = (data) => {
  const message = data?.message || "You do not have permission to perform this action."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  return {
    type: "PERMISSION_ERROR",
    message,
    shouldRetry: false,
  }
}

/**
 * Handle 404 Not Found errors
 */
const handleNotFound = (data) => {
  const message = data?.message || "The requested resource was not found."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  return {
    type: "NOT_FOUND",
    message,
    shouldRetry: false,
  }
}

/**
 * Handle 409 Conflict errors
 */
const handleConflict = (data) => {
  const message = data?.message || "A conflict occurred. The resource may already exist."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  return {
    type: "CONFLICT_ERROR",
    message,
    errors: data?.errors || [],
    shouldRetry: false,
  }
}

/**
 * Handle 422 Validation errors
 */
const handleValidationError = (data) => {
  let message = "Please check your input and try again."
  let errors = []

  if (data?.errors && Array.isArray(data.errors)) {
    errors = data.errors
    // Show the first error message
    message = data.errors[0]?.msg || data.errors[0]?.message || data.errors[0] || message
  } else if (data?.message) {
    message = data.message
  }

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 5000,
  })

  return {
    type: "VALIDATION_ERROR",
    message,
    errors,
    shouldRetry: false,
  }
}

/**
 * Handle 429 Rate Limit errors
 */
const handleRateLimit = (data) => {
  const message = data?.message || "Too many requests. Please wait a moment before trying again."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 6000,
  })

  return {
    type: "RATE_LIMIT",
    message,
    retryAfter: data?.retryAfter || 60,
    shouldRetry: true,
  }
}

/**
 * Handle 5xx Server errors
 */
const handleServerError = (data, statusCode) => {
  const message = data?.message || "A server error occurred. Please try again later."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 5000,
  })

  return {
    type: "SERVER_ERROR",
    message,
    statusCode,
    shouldRetry: true,
  }
}

/**
 * Handle unknown/unexpected errors
 */
const handleUnknownError = (data, statusCode) => {
  const message = data?.message || "An unexpected error occurred. Please try again."

  toast.error(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
  })

  return {
    type: "UNKNOWN_ERROR",
    message,
    statusCode,
    shouldRetry: false,
  }
}

/**
 * Handle specific API endpoint errors
 */
export const handleAuthError = (error, response, data) => {
  // Special handling for authentication endpoints
  if (data?.message?.includes("User already exists")) {
    toast.error("An account with this email already exists. Please try logging in instead.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "USER_EXISTS",
      message: "User already exists",
      shouldSwitchToLogin: true,
    }
  }

  if (data?.message?.includes("Invalid credentials")) {
    toast.error("Invalid email or password. Please check your credentials and try again.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "INVALID_CREDENTIALS",
      message: "Invalid credentials",
      shouldRetry: false,
    }
  }

  // Fall back to general error handling
  return handleError(error, response, data)
}

/**
 * Handle investment-related errors
 */
export const handleInvestmentError = (error, response, data) => {
  if (data?.message?.includes("Insufficient balance")) {
    toast.error("Insufficient balance. Please add funds to your account.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "INSUFFICIENT_BALANCE",
      message: "Insufficient balance",
      shouldRedirectToDeposit: true,
    }
  }

  if (data?.message?.includes("Investment plan not found")) {
    toast.error("The selected investment plan is no longer available.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "PLAN_NOT_FOUND",
      message: "Investment plan not found",
      shouldRefreshPlans: true,
    }
  }

  // Fall back to general error handling
  return handleError(error, response, data)
}

/**
 * Handle file upload errors
 */
export const handleFileUploadError = (error, response, data) => {
  if (data?.message?.includes("File too large")) {
    toast.error("File is too large. Please select a file smaller than 5MB.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "FILE_TOO_LARGE",
      message: "File too large",
      maxSize: "5MB",
    }
  }

  if (data?.message?.includes("Invalid file type")) {
    toast.error("Invalid file type. Please upload a PDF, JPG, or PNG file.", {
      style: { background: "#fff", color: "#000" },
      position: "top-right",
      autoClose: 5000,
    })
    return {
      type: "INVALID_FILE_TYPE",
      message: "Invalid file type",
      allowedTypes: ["PDF", "JPG", "PNG"],
    }
  }

  // Fall back to general error handling
  return handleError(error, response, data)
}

/**
 * Success message handler
 */
export const handleSuccess = (message, options = {}) => {
  toast.success(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 3000,
    ...options,
  })
}

/**
 * Info message handler
 */
export const handleInfo = (message, options = {}) => {
  toast.info(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
    ...options,
  })
}

/**
 * Warning message handler
 */
export const handleWarning = (message, options = {}) => {
  toast.warn(message, {
    style: { background: "#fff", color: "#000" },
    position: "top-right",
    autoClose: 4000,
    ...options,
  })
}
