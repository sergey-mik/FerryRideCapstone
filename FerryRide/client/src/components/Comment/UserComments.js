import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getCommentsByTicketPurchaseId } from '../../modules/commentManager'
import { Link, useParams } from 'react-router-dom'

export default function UserComments() {
  const [comments, setComments] = useState([])
  const [refreshComments, setRefreshComments] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getCommentsByTicketPurchaseId(id).then(setComments)
  }, [id, refreshComments]) // Add refreshComments here

  function handleDeleteComment(commentId) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    )
    setRefreshComments(!refreshComments) // Toggle refreshComments state
  }

  if (comments.length > 0) {
    return (
      <section>
        {comments.map((c) => (
          <Comment key={c.id} comment={c} onDelete={handleDeleteComment} />
        ))}
        <p>
          <Link to={`/comment/add/${id}`}>Add Comment</Link>
        </p>
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
