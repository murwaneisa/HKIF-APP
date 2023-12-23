import {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
} from '../Slices/activitySlice'
import { getActivities } from '../../Axios/activity'

export const fetchActivities = () => async dispatch => {
  try {
    dispatch(fetchActivitiesRequest())
    const data = await getActivities()
    dispatch(fetchActivitiesSuccess(data))
  } catch (error) {
    dispatch(fetchActivitiesFailure(error.message))
  }
}
