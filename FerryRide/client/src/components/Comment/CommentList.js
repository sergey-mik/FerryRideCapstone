import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { getAllComments } from '../../modules/commentManager'

export default function CommentsList() {
  const [commentsState, setComments] = useState([])

  useEffect(() => {
    getAllComments().then(setComments)
  }, [])

  return (
    <>
      <h1 className="text-center">Share Your Experience</h1>
      <section>
        {commentsState.map((comment) => {
          // Convert the createDateTime from a string to a Date object
          const createDate = new Date(comment.createDateTime)

          // Format the date and time
          const dateString = createDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          const timeString = createDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })

          return (
            <Card key={comment.id} className="m-4">
              <CardBody>
                <CardTitle tag="h5">Subject: {comment.subject}</CardTitle>
                <CardText>Content: {comment.content}</CardText>
                <p className="text-muted">
                  Published on {dateString}, {timeString} by{' '}
                  <strong>{comment.authorName}</strong>
                </p>
              </CardBody>
            </Card>
          )
        })}
      </section>
    </>
  )
}
