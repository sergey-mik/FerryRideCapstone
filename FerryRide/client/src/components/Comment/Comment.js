import React, { useState } from 'react'
import { Card, CardBody, CardTitle, CardText, Button, Input, Modal, ModalHeader, ModalBody, } from 'reactstrap'
import { updateComment, deleteComment } from '../../modules/commentManager'
import './Comment.css'

export default function Comment({ comment, currentUserId, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentComment, setCurrentComment] = useState(comment)
  const [updatedSubject, setUpdatedSubject] = useState(comment.subject)
  const [updatedContent, setUpdatedContent] = useState(comment.content)

  // Convert the createDateTime from a string to a Date object
  const createDate = new Date(currentComment.createDateTime)

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

  function handleSubjectChange(event) {
    setUpdatedSubject(event.target.value)
  }

  function handleContentChange(event) {
    setUpdatedContent(event.target.value)
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleSave() {
    const newComment = {
      ...currentComment,
      subject: updatedSubject,
      content: updatedContent,
    }

    updateComment(newComment).then(() => {
      setCurrentComment(newComment)
      setIsEditing(false)
    })
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(currentComment.id).then(() => {
        onDelete(currentComment.id)
      })
    }
  }

  return (
    <div className="center">
      <Card className="m-4">
        <CardBody>
          <div>
            <CardTitle tag="h5">Subject: {currentComment.subject}</CardTitle>
            <CardText>Content: {currentComment.content}</CardText>
            <p className="text-muted">
              Published on {dateString}, {timeString}
            </p>
            {currentUserId === currentComment.authorId && (
              <>
                <Button color="primary" onClick={handleEdit}>
                  Edit
                </Button>{' '}
                <Button color="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isEditing} toggle={() => setIsEditing(false)}>
        <ModalHeader toggle={() => setIsEditing(false)}>
          Edit Comment
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={updatedSubject}
            onChange={handleSubjectChange}
            placeholder="Subject"
            style={{ width: '50%' }}
          />
          <Input
            type="textarea"
            value={updatedContent}
            onChange={handleContentChange}
            placeholder="Content"
            style={{ height: '200px' }}
          />
          <Button color="success" onClick={handleSave} className="mt-3">
            Save
          </Button>
        </ModalBody>
      </Modal>
    </div>
  )
}
