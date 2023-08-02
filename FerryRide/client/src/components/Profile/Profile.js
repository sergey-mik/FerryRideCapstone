import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getAllTrips } from '../../modules/profileManager'
import { getSavedSchedules, deleteSchedule } from '../../modules/savedTripManager'

const ProfilePage = ({ userProfileId }) => {
  const [pastTrips, setPastTrips] = useState([])
  const [upcomingTrips, setUpcomingTrips] = useState([])
  const [savedSchedules, setSavedSchedules] = useState([])


  useEffect(() => {
    getAllTrips(userProfileId).then((trips) => {
      const now = new Date()
      setPastTrips(
        trips.filter((trip) => new Date(trip.departureDateTime) < now)
      )
      setUpcomingTrips(
        trips
          .filter((trip) => new Date(trip.departureDateTime) >= now)
          .sort(
            (a, b) =>
              new Date(a.departureDateTime) - new Date(b.departureDateTime)
          )
      )
    })
  }, [userProfileId])
  
  useEffect(() => {
    getAllTrips(userProfileId).then((trips) => {
    })
    getSavedSchedules().then((schedules) => {
      setSavedSchedules(schedules)
    })
  }, [userProfileId])


  return (
    <Container style={{ marginTop: '50px' }}>
      <h1>Profile Page</h1>
      <Row>
        <Col>
          <Card>
            <CardHeader>Past Trips</CardHeader>
            <CardBody>
              <ListGroup>
                {pastTrips.map((trip) => {
                  const departureDateTime = new Date(trip.departureDateTime)
                  const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }
                  const readableDateTime = departureDateTime.toLocaleDateString(
                    'en-US',
                    options
                  )
                  return (
                    <ListGroupItem key={trip.id}>
                      <Link to={`/comment/ticket/${trip.id}`}>
                        {trip.origin} - {trip.destination}: {readableDateTime}
                      </Link>
                    </ListGroupItem>
                  )
                })}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>Upcoming Trips</CardHeader>
            <CardBody>
              <ListGroup>
                {upcomingTrips.map((trip) => {
                  const departureDateTime = new Date(trip.departureDateTime)
                  const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }
                  const readableDateTime = departureDateTime.toLocaleDateString(
                    'en-US',
                    options
                  )
                  return (
                    <ListGroupItem key={trip.id}>
                      {trip.origin} - {trip.destination}: {readableDateTime}
                    </ListGroupItem>
                  )
                })}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>Saved Trips</CardHeader>
            <CardBody>
              <ListGroup>
                {savedSchedules.map((trip) => {
                  return (
                    <ListGroupItem key={trip.id}>
                      <div className="d-flex justify-content-between">
                        <div>
                          {trip.origin} - {trip.destination}
                        </div>
                        <div>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to delete this saved trip?'
                                )
                              ) {
                                deleteSchedule(trip.id).then(() => {
                                  setSavedSchedules((prevSavedSchedules) =>
                                    prevSavedSchedules.filter(
                                      (schedule) => schedule.id !== trip.id
                                    )
                                  )
                                })
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </ListGroupItem>
                  )
                })}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
