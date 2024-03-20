import baseInstance from './api'

const activityLeaderSuffix = '/activityLeaders'

export const getActivityLeaders = async () => {
  try {
    const response = await baseInstance.get(`${activityLeaderSuffix}/public`)
    console.log('activity leaders data', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', JSON.stringify(error))
  }
}
