import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

const ProfilePage = ({ upcomingTrips, tripHistory, savedTrips }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader>Upcoming Trips</CardHeader>
            <CardBody>
              <ListGroup>
                {upcomingTrips.map((trip) => (
                  <ListGroupItem key={trip.id}>
                    {trip.destination} - {trip.date}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>Trip History</CardHeader>
            <CardBody>
              <ListGroup>
                {tripHistory.map((trip) => (
                  <ListGroupItem key={trip.id}>
                    {trip.destination} - {trip.date}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>Saved Trips</CardHeader>
            <CardBody>
              <ListGroup>
                {savedTrips.map((trip) => (
                  <ListGroupItem key={trip.id}>
                    {trip.destination} - {trip.date}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
