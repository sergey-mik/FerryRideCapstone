import React, { useState, useEffect } from 'react'
import { Label, Input, Button, Col, Row } from 'reactstrap'
import { getAllSchedules } from '../../modules/scheduleManager'
import { getUserProfileId } from '../../modules/userProfileManager'
import SaveTripButton from './SaveTripButton'
import DateTimePicker from './DateTimePicker'
import SeatBooking from './SeatBooking'
import firebase from 'firebase/app'
import 'firebase/auth'
import './Home.css'

const toUTC = (date) => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date
}

const Home = () => {
  const [trip, setTrip] = useState('Round Trip')
  const [tripId, setTripId] = useState(null)
  const [departureDate, setDepartureDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date())
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

    const PortImage = ({ portName }) => {
      let imageSrc = '/images/port1.jpg' // default image
      if (portName === 'Port Angeles') {
        imageSrc = '/images/port1.jpg'
      } else if (portName === 'Victoria') {
        imageSrc = '/images/port2.jpg'
      }
      return (
        <img src={imageSrc} className="port" alt="port" draggable="false" />
      )
    }

  useEffect(() => {
    if (origin && destination) {
      const selectedSchedule = schedules.find(
        (schedule) =>
          schedule.origin === origin && schedule.destination === destination
      )
      setTripId(selectedSchedule ? selectedSchedule.id : null)
    }
  }, [origin, destination, schedules])

  const handleNextButtonClick = async () => {
    const firebaseUserId = firebase.auth().currentUser.uid
    const userProfileId = await getUserProfileId(firebaseUserId)
    const selectedSchedule = schedules.find(
      (schedule) =>
        schedule.origin === origin && schedule.destination === destination
    )

    // Get the FerryScheduleId from the selected schedule object
    const ferryScheduleId = selectedSchedule ? selectedSchedule.id : null

    // Collect the ticket purchase data from component state or form fields
    const ticketPurchase = {
      UserProfileId: userProfileId,
      FerryScheduleId: ferryScheduleId,
      DepartureDateTime: toUTC(departureDate).toISOString(),
    }

    // Conditionally add the ReturnDateTime property to the ticketPurchase object if trip is 'Round Trip'
    if (trip === 'Round Trip') {
      ticketPurchase.ReturnDateTime = toUTC(returnDate).toISOString()
    }

    // Update the state with the Ticket Purchase data
    setTicketPurchase(ticketPurchase)
  }

const hasNonRoundSeconds = (date) => {
  return date.getSeconds() % 10 !== 0
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
              <DateTimePicker date={returnDate} setDate={setReturnDate} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={{ size: 6 }}>
              <DateTimePicker date={departureDate} setDate={setDepartureDate} />
            </Col>
          </Row>
        )}

        <Row>
          <Col md={6}>
            <div id="port">
              <PortImage portName={origin} />
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
              <PortImage portName={destination} />
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
            <SaveTripButton tripId={tripId} />
          </Col>
          <Col md={6}></Col>
          <Col md={1} className="text-right">
            <Button
              color="primary"
              onClick={() => {
                if (hasNonRoundSeconds(departureDate)) {
                  alert('Please select a departure date before proceeding')
                } else if (trip === 'Round Trip' && !returnDate) {
                  alert('Please select an return date before proceeding')
                } else if (
                  trip === 'Round Trip' &&
                  hasNonRoundSeconds(returnDate)
                ) {
                  alert('Please select an return date before proceeding')
                } else if ((origin, destination === '')) {
                  alert('Please select a port before proceeding')
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
    return (
      <SeatBooking
        goToHome={goToHome}
        trip={trip}
        tripId={tripId}
        setTripId={setTripId}
        departureDate={departureDate}
        returnDate={trip === 'Round Trip' ? returnDate : null}
        origin={origin}
        destination={destination}
        ticketPurchase={ticketPurchase}
      />
    )
  }
}

export default Home
