import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from '../Slices/eventSlice'
import { getEvents } from '../../Axios/event'

export const fetchEvents = () => async dispatch => {
  try {
    dispatch(fetchEventsRequest())
    const data = await getEvents()
    dispatch(fetchEventsSuccess(data))
  } catch (error) {
    dispatch(fetchEventsFailure(error.message))
  }
}
