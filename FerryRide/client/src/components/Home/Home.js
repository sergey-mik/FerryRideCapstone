import React, { useState, useEffect } from 'react'
import { Label, Input, Button, Col, Row } from 'reactstrap'
import { getAllSchedules } from '../../modules/scheduleManager'
import { getUserProfileId } from '../../modules/userProfileManager'
import firebase from 'firebase/app'
import 'firebase/auth'

import DateTimePicker from './DateTimePicker'
import SeatBooking from './SeatBooking'
import './Home.css'

const Home = () => {
  const [trip, setTrip] = useState('Round Trip')
  const [departureDate, setDepartureDate] = useState(new Date())
  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [schedules, setSchedules] = useState([])
  const [page, setPage] = useState('home')
  const [ticketPurchase, setTicketPurchase] = useState(null)

  const fetchSchedules = () => {
    getAllSchedules().then((fetchedSchedules) => {
      setSchedules(fetchedSchedules)
    })
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  const PortImage = () => {
    return (
      <img
        src="/images/port1.jpg"
        className="port"
        alt="port"
        draggable="false"
      />
    )
  }

  const handleNextButtonClick = async () => {
    // Get the firebaseUserId of the currently logged-in user
    const firebaseUserId = firebase.auth().currentUser.uid

    // Call the getUserProfileId function to get the UserProfileId
    const userProfileId = await getUserProfileId(firebaseUserId)

    // Find the schedule object in the schedules array that matches the selected origin and destination ports
    const selectedSchedule = schedules.find(
      (schedule) =>
        schedule.origin === origin && schedule.destination === destination
    )

    // Get the FerryScheduleId from the selected schedule object
    const ferryScheduleId = selectedSchedule ? selectedSchedule.id : null

    // Collect the ticket purchase data from your component state or form fields
    const ticketPurchase = {
      UserProfileId: userProfileId,
      FerryScheduleId: ferryScheduleId,
      DepartureDateTime: departureDate.toISOString(),
    }
    // Conditionally add the ArrivalDateTime property to the ticketPurchase object if trip is 'Round Trip'
    if (trip === 'Round Trip') {
      ticketPurchase.ArrivalDateTime = arrivalDate.toISOString()
    }

    // Update the state with the Ticket Purchase data
    setTicketPurchase(ticketPurchase)

  }

  const goToHome = () => setPage('home')

  if (page === 'home') {
    return (
      <div className="container">
        <h1>Book a Ferry</h1>

        <Row>
          <Col sm={10}>
            <Row>
              <Col>
                <Label check>
                  <Input
                    type="radio"
                    name="trip"
                    checked={trip === 'Round Trip'}
                    onChange={() => setTrip('Round Trip')}
                  />{' '}
                  Round Trip
                </Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label check>
                  <Input
                    type="radio"
                    name="trip"
                    checked={trip === 'One Way'}
                    onChange={() => setTrip('One Way')}
                  />{' '}
                  One Way
                </Label>
              </Col>
            </Row>
          </Col>
        </Row>

        {trip === 'Round Trip' ? (
          <Row>
            <Col md={6}>
              <DateTimePicker date={departureDate} setDate={setDepartureDate} />
            </Col>
            <Col md={2}></Col>
            <Col md={4}>
              <DateTimePicker date={arrivalDate} setDate={setArrivalDate} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={{ size: 6 }}>
              <DateTimePicker date={departureDate} setDate={setDepartureDate} />
            </Col>
          </Row>
        )}

        <Row form>
          <Col md={6}>
            <div id="port">
              <PortImage />
            </div>

            <Label for="originSelect">Select Origin</Label>

            <Input
              type="select"
              name="select"
              id="originSelect"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="">Select</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.origin}>
                  {schedule.origin}
                </option>
              ))}
            </Input>
          </Col>

          <Col md={2}></Col>

          <Col md={4}>
            <div id="port">
              <PortImage />
            </div>

            <Label for="destinationSelect">Select Destination</Label>
            <Input
              type="select"
              name="select"
              id="destinationSelect"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.destination}>
                  {schedule.destination}
                </option>
              ))}
            </Input>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Button color="primary">Save Trip</Button>
          </Col>
          <Col md={6}></Col>
          <Col md={1} className="text-right">
            <Button
              color="primary"
              onClick={() => {
                if ((origin, destination === '')) {
                  alert('Please select a port before proceeding')
                } else if (!departureDate) {
                  alert('Please select a departure date before proceeding')
                } else if (trip === 'Round Trip' && !arrivalDate) {
                  alert('Please select an arrival date before proceeding')
                } else {
                  handleNextButtonClick()
                  setPage('seatBooking')
                }
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    )
  } else if (page === 'seatBooking') {
    console.log('ticketPurchase:', ticketPurchase)
    return (
      <SeatBooking
        goToHome={goToHome}
        trip={trip}
        departureDate={departureDate}
        arrivalDate={trip === 'Round Trip' ? arrivalDate : null}
        origin={origin}
        destination={destination}
        ticketPurchase={ticketPurchase}
      />
    )
  }
}

export default Home
