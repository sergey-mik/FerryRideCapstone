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

export const AddComment = (post) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }).then((resp) => {
      if (resp.ok) {
        console.log('Comment made successfully!')
        return resp.json()
      } else {
        throw new Error('An error occurred while trying to add a post.')
      }
    })
  })
}
