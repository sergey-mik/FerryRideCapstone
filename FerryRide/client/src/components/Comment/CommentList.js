import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap'
import { getAllComments } from '../../modules/commentManager'
import './CommentList.css'

export default function CommentsList() {
  const [commentsState, setComments] = useState([])

  useEffect(() => {
    getAllComments().then(setComments)
  }, [])

  return (
    <>
      <h1 className="profile-title">Share Your Experience</h1>
        {commentsState.map((comment) => {
          // Convert the createDateTime from a string to a Date object
          const createDate = new Date(comment.createDateTime)

          // Format the date and time
          const dateString = createDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          // const timeString = createDate.toLocaleTimeString('en-US', {
          //   hour: '2-digit',
          //   minute: '2-digit',
          //   hour12: true,
          // })

          return (
            <div key={comment.id} className="container-comment">
              <Row>
                <Col xs={12} md={6} className="mx-auto">
                  <Card className="m-2">
                    <CardBody>
                      <CardTitle className="card-title" tag="h5">
                        <em>Subject:</em> {comment.subject}
                      </CardTitle>
                      <hr />
                      <CardText className="card-content">
                        <em>Content:</em> {comment.content}
                      </CardText>
                      <hr />
                      <p className="ports-name">
                        Departure Port: {comment.departurePortName}
                      </p>
                      <p className="ports-name">
                        Arrival Port: {comment.arrivalPortName}
                      </p>
                      <p className="text-date">
                        <em>
                          Published on {dateString} by{' '}
                          <strong>{comment.authorName}</strong>
                        </em>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )
        })}

    </>
  )
}
