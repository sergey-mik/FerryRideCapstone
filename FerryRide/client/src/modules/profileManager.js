import { getUserProfileId } from '../modules/userProfileManager'
import firebase from 'firebase/app'
import 'firebase/auth'

export const getToken = () => firebase.auth().currentUser.getIdToken()

const baseUrl = '/api/profile'

export const getAllTrips = () => {
  const user = firebase.auth().currentUser
  if (user) {
    const firebaseUserId = user.uid
    return getUserProfileId(firebaseUserId).then((userProfileId) => {
      return getToken().then((token) => {
        return fetch(`${baseUrl}/${userProfileId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            switch (res.status) {
              case 404:
                throw new Error('No trip history found for this user.')
              case 500:
                throw new Error(
                  'A server error occurred while trying to get trip history.'
                )
              default:
                throw new Error(
                  'An unknown error occurred while trying to get trip history.'
                )
            }
          }
        })
      })
    })
  } else {
    throw new Error('No user is signed in.')
  }
}

export const getSavedTrips = (firebaseUserId) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/savedTrips/${firebaseUserId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          'An unknown error occurred while trying to get seat reservations.'
        )
      }
    })
  })
}
