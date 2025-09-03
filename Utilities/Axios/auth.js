import axios from 'axios'
import { GATEWAY_API_BASE } from '@env'
import { storeAccessToken, storeRefreshToken, storeUserID } from './storage'

// Fallback URL if environment variable is not set
const baseURL = GATEWAY_API_BASE || 'https://your-gateway-api.com/api/v1'

// Custom logging function for better formatting in React Native
const logData = (title, data) => {
  console.log(`\n${title}`)
  console.log('━'.repeat(50))
  Object.entries(data).forEach(([key, value]) => {
    console.log(`${key.padEnd(20)}: ${value}`)
  })
  console.log('━'.repeat(50))
} 

// Create axios instance for auth API
const authInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Registration response
 */
export const registerUser = async (userData) => {
  try {
    // Transform the data to match the server expected format
    // Spring Boot expects: ^(\+\d{1,3})?\d{7,15}$ or null/empty for optional
    let phoneNumber = null
    
    if (userData.phoneNumber && userData.phoneNumber.trim() !== '') {
      phoneNumber = `${userData.dialCode}${userData.phoneNumber}`
    } else {
      phoneNumber = null
    }
    
    const registrationData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phoneNumber: phoneNumber,
      birthDate: userData.birthDate ? userData.birthDate.toISOString().split('T')[0] : null,
      gender: userData.gender ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1) : null,
      nationality: userData.nationality || null,
      profilePictureUrl: "https://unsplash.com/photos/a-man-standing-in-a-dark-room-with-his-hands-in-his-pockets-gh5yr7EwchI",
      address: userData.address || null,
      city: userData.city || null,
      zipCode: userData.zipCode || null,
      organizationId: 1 // Default organization ID as specified
    }

    logData('📤 SENDING REGISTRATION DATA TO SERVER', registrationData)
    
    const response = await authInstance.post('/auth/register', registrationData)
    
    // If registration is successful and returns tokens, store them
  
    logData('✅ SERVER RESPONSE - REGISTRATION SUCCESSFUL', response.data)
    return {
      success: true,
      data: response.data,
      message: 'Registration successful'
    }
  } catch (error) {
    if (error.response?.data) {
      logData('❌ SERVER ERROR RESPONSE', error.response.data)
    }
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data,
        message: error.response.data.message || 'Registration failed',
        status: error.response.status
      }
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to server. Please check your internet connection.'
      }
    } else {
      // Other error
      return {
        success: false,
        error: error.message,
        message: 'An unexpected error occurred'
      }
    }
  }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Login response
 */
export const loginUser = async (email, password) => {
  try {
    const response = await authInstance.post('/auth/login', {
      email,
      password
    })
    
    const { userId, access, refresh } = response.data
    
    if (access) {
      await storeAccessToken(access)
    }
    if (refresh) {
      await storeRefreshToken(refresh)
    }
    if (userId) {
      await storeUserID(userId)
    }
    
    return {
      success: true,
      data: response.data,
      userId: userId
    }
  } catch (error) {
    console.error('Login failed:', error)
    
    if (error.response) {
      return {
        success: false,
        error: error.response.data,
        message: error.response.data.message || 'Login failed',
        status: error.response.status
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to server. Please check your internet connection.'
      }
    } else {
      return {
        success: false,
        error: error.message,
        message: 'An unexpected error occurred'
      }
    }
  }
}

export default authInstance
