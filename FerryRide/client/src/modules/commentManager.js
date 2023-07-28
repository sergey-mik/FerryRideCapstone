import { getToken } from './authManager'

const apiUrl = '/api/comment'

export const getAllComments = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error('An unknown error occurred while trying to get posts.')
      }
    })
  })
}

  export const getUserComments = () => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error(
            'An unknown error occurred while trying to get posts.'
          )
        }
      })
    })
  }

export const AddComment = (addComment) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addComment),
    })
  })
}

export const deleteComment = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })
}

export const getCommentsByTicketPurchaseId = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/ticket/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error(
          'An unknown error occurred while trying to get comments.'
        )
      }
    })
  })
}

export const updateComment = (comment) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${comment.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
  })
}

export const getCommentDetails = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error(
          'An unknown error occurred while trying to get comment details.'
        )
      }
    })
  })
}
