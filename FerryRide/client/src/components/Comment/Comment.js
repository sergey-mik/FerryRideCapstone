import React from 'react'
import { Card } from 'reactstrap'

export default function Comment({ comment }) {
  return (
    <Card className="m-5 text-center" style={{ borderRadius: '20px' }}>
      <div style={{ borderRadius: '20px' }}>
        {/* <h3>{comment.text}</h3> */}
        <p>
          {/* Author: {comment.author}   Published on {comment.date} */}
        </p>
      </div>
    </Card>
  )
}
