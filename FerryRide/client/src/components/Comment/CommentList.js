import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getAllComments } from '../../modules/commentManager'

export default function CommentList() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getAllComments().then(setComments)
  }, [])

  return (
    <>
      <h1 className="text-center">Comments</h1>
      <section>
        {comments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </section>
    </>
  )
}
