import baseInstance from './api'

const activitySuffix = '/activities'

export const getActivities = async () => {
  try {
    const response = await baseInstance.get(activitySuffix)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', JSON.stringify(error))
  }
}
