import React, { useState, useEffect } from 'react'
import { addSchedule } from '../../modules/savedTripManager'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

const SaveTripButton = ({ tripId }) => {
  const [userProfileId, setUserProfileId] = useState(null)
    const navigate = useNavigate()

  useEffect(() => {
    const getUserProfileId = async () => {
      const firebaseUserId = firebase.auth().currentUser.uid
      const response = await fetch(`/api/userprofile/${firebaseUserId}`)
      const data = await response.json()
      setUserProfileId(data.id)
    }
    getUserProfileId()
  }, [])

  const handleSaveTrip = () => {
    // Gather data from form
    const newSchedule = {
      ferryScheduleId: tripId,
      userProfileId: userProfileId,
    }

    // Save schedule using scheduleManager module
    addSchedule(newSchedule)
      .then(() => {
        // Handle successful save
        console.log('Saved schedule:', newSchedule)
        // Navigate to Profile component
        navigate('/profile')
      })
      .catch((error) => {
        // Handle error
        console.error('Error saving schedule:', error)
      })
  }

  return React.createElement(
    'button',
    { className: 'btn btn-primary', onClick: handleSaveTrip },
    'Save Trip'
  )
}

export default SaveTripButton
