import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './CommentForm.css'

function CommentForm() {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ subject, content })
    setSubject('')
    setContent('')
  }

  return (
    <div className="commentContainer">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="subject">Subject:</Label>
          <Input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content:</Label>
          <Input
            type="textarea"
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </FormGroup>
        <Button type="submit">Post Comment</Button>
      </Form>
    </div>
  )
}

export default CommentForm
