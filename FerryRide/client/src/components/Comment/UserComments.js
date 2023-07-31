import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getCommentsByTicketPurchaseId } from '../../modules/commentManager'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

export default function UserComments() {
  const [comments, setComments] = useState([])
  const [refreshComments, setRefreshComments] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/comment/add/${id}`)
  }

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
        <h1 className="profile-title">Your Comments</h1>
        {comments.map((c) => (
          <Comment key={c.id} comment={c} onDelete={handleDeleteComment} />
        ))}
        <Row className="justify-content-end">
          <Col xs={12} md={4}>
            <Button color="primary" onClick={handleClick}>
              Add Comment
            </Button>
          </Col>
        </Row>
      </section>
    )
  } else {
    return (
      <>
        <h1 className="profile-title">Your Comments</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={4}>
            <Card>
              <CardBody>
                <CardTitle>You have no comments yet</CardTitle>
                <p>
                  Click <Link to={`/comment/add/${id}`}>here</Link> to make your
                  first comment!
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
