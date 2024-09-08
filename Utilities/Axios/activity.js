import baseInstance from './api'

const activitySuffix = '/activities'

export const getActivities = async () => {
  try {
    const response = await baseInstance.get(activitySuffix)
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', JSON.stringify(error))
  }
}

export const toggleActivityMember = async (activityId, memberId) => {
  try {
    const response = await baseInstance.put(
      `${activitySuffix}/${activityId}/member/${memberId}`
    )
    return response.status
  } catch (error) {
    console.error('Error favoriting activity:', JSON.stringify(error))
  }
}
