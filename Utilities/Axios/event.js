import baseInstance from './api'

const eventSuffix = '/events'

export const getEvents = async () => {
  try {
    const response = await baseInstance.get(eventSuffix)
    const sortedEvents = response.data.sort((event1, event2) => {
      const startTime1 = new Date(event1.startTime).getTime()
      const startTime2 = new Date(event2.startTime).getTime()
      return startTime2 - startTime1
    })
    return sortedEvents
  } catch (error) {
    console.error('Error fetching events:', JSON.stringify(error))
  }
}
