import firebase from 'firebase/app'
import 'firebase/auth'

export const getToken = () => firebase.auth().currentUser.getIdToken()

const apiUrl = '/api/TicketPurchase'

export const getAllTicketPurchases = () => {
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
          'An unknown error occurred while trying to get ticket purchases.'
        )
      }
    })
  })
}

export const addTicketPurchase = (ticketPurchase) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketPurchase),
    })
  })
}
