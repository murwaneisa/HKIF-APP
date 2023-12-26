import baseInstance from './api'

const eventSuffix = '/events'

export const getEvents = async () => {
  try {
    const response = await baseInstance.get(eventSuffix)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching events:', JSON.stringify(error))
  }
}
