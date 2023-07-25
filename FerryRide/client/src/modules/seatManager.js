import firebase from 'firebase/app'
import 'firebase/auth'

export const getToken = () => firebase.auth().currentUser.getIdToken()

const apiUrl = '/api/SeatReservation'

export const getAllSeatReservations = (ferryScheduleId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}?ferryScheduleId=${ferryScheduleId}`, {
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

export const addSeatReservation = (seatReservation) => {
  return getToken().then((token) => {
    return fetch(apiUrl + '?ticketPurchaseId='+ seatReservation.TicketPurchaseId, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seatReservation),
    })
  })
}
