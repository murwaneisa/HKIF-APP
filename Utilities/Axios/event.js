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
    throw error
  }
}

// Fetch a single event by ID
export const getEventById = async id => {
  try {
    const response = await baseInstance.get(`${eventSuffix}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching event by ID:', JSON.stringify(error))
    throw error
  }
}

// Create a new event
export const createEvent = async eventData => {
  try {
    const response = await baseInstance.post(eventSuffix, eventData)
    return response.data
  } catch (error) {
    console.error('Error creating event:', JSON.stringify(error))
    throw error
  }
}

// Update an existing event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await baseInstance.put(`${eventSuffix}/${id}`, eventData)
    return response.data
  } catch (error) {
    console.error('Error updating event:', JSON.stringify(error))
    throw error
  }
}

// Delete an event
export const deleteEvent = async id => {
  try {
    const response = await baseInstance.delete(`${eventSuffix}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting event:', JSON.stringify(error))
    throw error
  }
}
