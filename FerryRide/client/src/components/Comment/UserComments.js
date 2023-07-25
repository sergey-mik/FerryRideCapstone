import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getUserComments } from '../../modules/commentManager'
import { Link } from 'react-router-dom'

export default function UserComments() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getUserComments().then(setComments)
  }, [])

  if (comments.length > 0) {
    return (
      <section>
        {comments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </section>
    )
  } else {
    return (
      <>
        <p>You have no comments yet.</p>
        <p>
          Click <Link to="/addcomment">here</Link> to make your first comment!
        </p>
      </>
    )
  }
}
