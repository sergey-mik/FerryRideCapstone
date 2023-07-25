import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCommentDetails } from '../../modules/commentManager'

export default function CommentDetails() {
  const { id } = useParams()
  const [comment, setComment] = useState({})

  useEffect(() => {
    getCommentDetails(id).then(setComment)
  }, [])

  if (comment === null) {
    return <p>404 not found</p>
  } else {
    return (
      <div className="m-4 text-center">
        <h1 className="bold">{comment.subject}</h1>
        <p>{comment.content}</p>
        <p>
          Author: {comment.userProfile?.displayName}   Published on{' '}
          {comment.createDateTime}
        </p>
      </div>
    )
  }
}
