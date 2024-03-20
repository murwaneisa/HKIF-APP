import { getActivityLeaders } from '../../Axios/activityleader'
import {
  fetchActivitiesLeadersFailure,
  fetchActivitiesLeadersRequest,
  fetchActivitiesLeadersSuccess,
} from '../Slices/leaderSlice'

export const fetchActivitiesLeaders = () => async dispatch => {
  try {
    dispatch(fetchActivitiesLeadersRequest())
    const data = await getActivityLeaders()
    dispatch(fetchActivitiesLeadersSuccess(data))
  } catch (error) {
    dispatch(fetchActivitiesLeadersFailure(error.message))
  }
}
