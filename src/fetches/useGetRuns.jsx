import instance from "../utils/axios"
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { selectTrails } from '../features/trailsSlice';

const useGetRuns = () => {
  const [cookies,] = useCookies(['token']);
  const mountainTrails = useSelector(selectTrails)
  const mountainName = mountainTrails.name

  return (sortField, sortDirection) => {
    if (sortField && sortDirection) {
      return instance.get(`getSortedRuns?userID=${cookies.token}&mountainName=${mountainName}&sortBy=${sortField}|${sortDirection}`)
    } else {
      return instance.get(`getRuns?userID=${cookies.token}&mountainName=${mountainName}`)
    }
  }
}

export default useGetRuns