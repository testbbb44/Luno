/**
 * Get environment configuration based on the current environment
 * @returns {Object} Environment-specific configuration
 */
export const getEnvironmentConfig = () => {
    const mode = import.meta.env.MODE || "development"
  
    // Configuration for different environments
    const configs = {
      development: {
        useCsrf: false,
        debug: true,
        apiTimeout: 10000,
        retryAttempts: 1,
      },
      staging: {
        useCsrf: true,
        debug: true,
        apiTimeout: 8000,
        retryAttempts: 2,
      },
      production: {
        useCsrf: true,
        debug: false,
        apiTimeout: 5000,
        retryAttempts: 3,
      },
    }
  
    // Return config for current environment, fallback to development if not found
    return configs[mode] || configs.development
  }
  
  /**
   * Get current environment name
   * @returns {string} Current environment name
   */
  export const getCurrentEnvironment = () => {
    return import.meta.env.MODE || "development"
  }
  
  /**
   * Check if current environment is production
   * @returns {boolean} True if production environment
   */
  export const isProduction = () => {
    return getCurrentEnvironment() === "production"
  }
  
  /**
   * Check if current environment is development
   * @returns {boolean} True if development environment
   */
  export const isDevelopment = () => {
    return getCurrentEnvironment() === "development"
  }
  
  /**
   * Check if current environment is staging
   * @returns {boolean} True if staging environment
   */
  export const isStaging = () => {
    return getCurrentEnvironment() === "staging"
  }
  
  /**
   * Log environment information
   */
  export const logEnvironmentInfo = () => {
    if (isDevelopment() || isStaging() || isProduction()) {
      const config = getEnvironmentConfig()
      console.log(`Environment: ${getCurrentEnvironment().toUpperCase()}`)
      console.log(`API Base URL: ${import.meta.env.VITE_API_BASE_URL}`)
      console.log(`CSRF Enabled: ${config.useCsrf}`)
      console.log(`Debug Mode: ${config.debug}`)
    }
  }
  