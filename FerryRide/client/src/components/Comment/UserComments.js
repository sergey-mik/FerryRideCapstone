import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getCommentsByTicketPurchaseId } from '../../modules/commentManager'
import { Link, useParams } from 'react-router-dom'

export default function UserComments() {
  const [comments, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getCommentsByTicketPurchaseId(id).then(setComments)
  }, [id])

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
          Click <Link to={`/comment/add/${id}`}>here</Link> to make your first
          comment!
        </p>
      </>
    )
  }
}
