import { useSelector } from 'react-redux'

export const findActivityLeaders = leadersIds => {
  const leadersData = useSelector(state => state.leader.publicLeadersData)
  return leadersData.filter(leader => leadersIds.includes(leader._id))
}
