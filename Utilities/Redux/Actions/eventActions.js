import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
  addEventSuccess,
  addEventFailure,
  updateEventSuccess,
  updateEventFailure,
  deleteEventSuccess,
  deleteEventFailure,
  fetchEventByIdSuccess,
  fetchEventByIdFailure,
} from '../Slices/eventSlice'
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} from '../../Axios/event'

export const fetchEvents = () => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    const data = await getEvents()
    dispatch(fetchEventsSuccess(data))
  } catch (error) {
    dispatch(fetchEventsFailure(error.message))
  }
}

export const fetchEventById = id => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    const data = await getEventById(id)
    dispatch(fetchEventByIdSuccess(data))
  } catch (error) {
    console.error('Error fetching event by ID:', error)
    dispatch(fetchEventByIdFailure(error.message))
  }
}

// Create event action
export const createNewEvent = eventData => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    const data = await createEvent(eventData)
    dispatch(addEventSuccess(data))
  } catch (error) {
    console.error('Error creating event:', error)
    dispatch(addEventFailure(error.message))
  }
}

// Update event action
export const updateExistingEvent = (id, eventData) => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    await updateEvent(id, eventData)
    dispatch(updateEventSuccess({ _id: id, ...eventData }))
  } catch (error) {
    dispatch(updateEventFailure(error.message))
  }
}

// Delete event action
export const deleteExistingEvent = id => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    await deleteEvent(id)
    dispatch(deleteEventSuccess(id))
  } catch (error) {
    console.error('Error deleting event:', error)
    dispatch(deleteEventFailure(error.message))
  }
}
