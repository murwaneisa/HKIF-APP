import {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  updateActivityFavorite,
} from '../Slices/activitySlice'
import { getActivities, toggleActivityMember } from '../../Axios/activity'

export const fetchActivities = () => async dispatch => {
  try {
    dispatch(fetchActivitiesRequest())
    const data = await getActivities()
    dispatch(fetchActivitiesSuccess(data))
  } catch (error) {
    dispatch(fetchActivitiesFailure(error.message))
  }
}

export const toggleActivityFavorite =
  (activityId, userId) => async dispatch => {
    try {
      const status = await toggleActivityMember(activityId, userId)
      if (status === 200) {
        dispatch(updateActivityFavorite({ _id: activityId, userId }))
      }
    } catch (error) {
      console.error('Error updating activity member:', error)
    }
  }
