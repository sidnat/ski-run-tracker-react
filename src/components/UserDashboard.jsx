import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTrails, updateRunCount } from '../features/trailsSlice'
import useGetRuns from '../fetches/useGetRuns';
import Chart from './Chart';
import BasicTable from './Table';

const UserDashboard = () => {
  const dispatch = useDispatch()
  const mountainTrails = useSelector(selectTrails)
  const getRuns = useGetRuns()

  console.log('m', mountainTrails)

  const handleSort = (field, direction) => {
    console.log('test', field, direction)
  }

  const [tableConfig, setTableConfig] = useState({
    headers: {
      "Trail Name": { key: "name" },
      "Difficulty": { key: "difficulty" },
      "Run Counter": { key: 'runCounter', onSort: handleSort }
    },
    rows: Object.values(mountainTrails.trails)
  })

  useEffect(() => {
    setTableConfig(prevState => ({
      ...prevState,
      rows: Object.values(mountainTrails.trails)
    }))
  
  }, [mountainTrails])

  useEffect(() => {
    getRuns()
      .then(res => {
        const runsArray = res.data.runs

        console.log(runsArray)

        runsArray.forEach(run => {
          dispatch(updateRunCount({ name: run.trailName, value: run.runCounter }))
        })
      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <h1>User Dashboard</h1>
        <Chart />
        <BasicTable config={tableConfig} />
      </div>
    </>
  )
}

export default UserDashboard