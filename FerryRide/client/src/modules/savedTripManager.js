import 'firebase/auth'
import firebase from 'firebase/app'

export const getToken = () => firebase.auth().currentUser.getIdToken()

const apiUrl = '/api/SavedFerryDeparture'

export const getSavedSchedules = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          'An unknown error occurred while trying to get schedules.'
        )
      }
    })
  })
}

export const addSchedule = (schedule) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schedule),
    })
  })
}

export const deleteSchedule = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })
}