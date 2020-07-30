import React, { useState, useEffect } from 'react'

const LauncherShow = props =>{
  const [launcher, setLauncher] = useState({})

  useEffect(() => {
    let launcherId = props.match.params.id
    fetch(`/api/v1/launchers/${launcherId}`)
      .then((response) => {
        if (response.ok) {
          return response
        }
      })
      .then(response => response.json())
      .then(body => {
        setLauncher(body)
      })
  }, [])
  return(
    <div>
      <h1>{launcher.name} {launcher.bio}</h1>
    </div>
  )
}

export default LauncherShow