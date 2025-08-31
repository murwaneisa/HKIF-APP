import axios from 'axios'
import { ORGANIZATION_API_URL } from '@env'


console.log('ORGANIZATION_API_URL', ORGANIZATION_API_URL)


const organizationInstance = axios.create({
  baseURL: ORGANIZATION_API_URL, // .../organizations
  timeout: 10000,
})

// GET /organizations/active


// Add interceptors if needed (similar to the main api.js)
organizationInstance.interceptors.request.use(
  config => {
    // Add any organization-specific headers if needed
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

organizationInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Get all active organizations
 * @returns {Promise<Array>} Array of active organizations
 */
export const getActiveOrganizations = async () => {
  try {
    const response = await organizationInstance.get('/active')
    return response.data
  } catch (error) {
    console.error('Failed to fetch active organizations:', error)
    throw error
  }
}
