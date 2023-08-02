import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import {
  addSeatReservation,
  getAllSeatReservations,
} from '../../modules/seatManager'
import { addTicketPurchase } from '../../modules/ticketManager'
import SeatPicker from './SeatPicker'
import { useNavigate } from 'react-router-dom'
import './SeatBooking.css'

const SeatBooking = ({
  goToHome,
  trip,
  tripId,
  setTripId,
  departureDate,
  returnDate,
  origin,
  destination,
  ticketPurchase,
}) => {
  const rows = Array.from({ length: 12 }, (_, i) => i + 1)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [seatReservations, setSeatReservations] = useState([])
  const [modal, setModal] = useState(false)
  const [isOnwardTrip, setIsOnwardTrip] = useState(false)
  // State variable to track if the return trip button has been clicked
  const [returnTripClicked, setReturnTripClicked] = useState(false)
  const navigate = useNavigate()

  function formatDate(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm

    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      ', ' +
      strTime
    )
  }

  useEffect(() => {
    console.log(tripId)
    getAllSeatReservations(tripId).then((data) => {
      const occupiedSeats = data.map(
        (seatReservation) =>
          `${seatReservation.seatRow}-${seatReservation.seatNumber}`
      )
      setOccupiedSeats(occupiedSeats)
      console.log(occupiedSeats)
    })
  }, [tripId])

  const handleSeatClick = (event) => {
    const seat = event.target.dataset.seat
    if (occupiedSeats.includes(seat)) {
      return
    }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const calculateTotal = () => {
    let total = 0
    selectedSeats.forEach((seat) => {
      total += 25
    })
    return total
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select a seat before continuing')
    } else {
      if (returnDate && !returnTripClicked) {
        handleReturnTripClick()
      } else {
        handlePurchaseClick()
      }
    }
  }

  const handleReturnTripClick = () => {
    setIsOnwardTrip(true)

    // Post the departureTicketPurchase data to the server
    addTicketPurchase(ticketPurchase)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSeatReservations(
          selectedSeats.map((seat) => {
            // Split the seat identifier into SeatRow and SeatNumber
            const [SeatRow, SeatNumber] = seat.split('-').map(Number)

            return {
              // Set the properties of the seatReservation object based on data model
              TicketPurchaseId: data.id,
              SeatRow: SeatRow,
              SeatNumber: SeatNumber,
            }
          })
        )
        setModal(true)
      })
      .catch((error) => {
        // Handle error while adding ticket purchase
      })
    setReturnTripClicked(true)
  }

  const handlePurchaseClick = () => {
    // Update the DepartureDateTime property with the ReturnDateTime value
    ticketPurchase.DepartureDateTime = ticketPurchase.ReturnDateTime

      // If it is odd, increase its value by one, and if it is even, decrease its value by one.
      ticketPurchase.FerryScheduleId =
        ticketPurchase.FerryScheduleId % 2 === 0
          ? ticketPurchase.FerryScheduleId - 1
          : ticketPurchase.FerryScheduleId + 1

    // Post the ticketPurchase data to the server
    addTicketPurchase(ticketPurchase)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSeatReservations(
          selectedSeats.map((seat) => {
            // Split the seat identifier into SeatRow and SeatNumber
            const [SeatRow, SeatNumber] = seat.split('-').map(Number)

            return {
              // Set the properties of the seatReservation object based on data model
              TicketPurchaseId: data.id,
              SeatRow: SeatRow,
              SeatNumber: SeatNumber,
            }
          })
        )
        setModal(true) // This line opens the modal showing the ticket confirmation
      })
      .catch((error) => {
        // Handle error while adding ticket purchase
      })
      setIsOnwardTrip(false)
  }


  const handleConfirmPurchaseClick = () => {
    // If tripId is an odd number, increase its value by one
    if (tripId % 2 === 1) {
      setTripId(tripId + 1)
      // If tripId is an even number, decrease its value by one
    } else {
      setTripId(tripId - 1)
    }
    // Iterate through all the seatReservations
    seatReservations.forEach((seatReservation) => {
      addSeatReservation(seatReservation)
        .then((response) => response.json())
        .then((data) => {
          console.log('Seat Reservation:', data)
        })
        .catch((error) => {
          // Handle error while adding seat reservation
        })
    })
    // clear selected seats
    setSelectedSeats([])

    // If this is the onward trip, set isOnwardTrip to false
    // so that the next click will be treated as the return trip
    if (isOnwardTrip) {
      setIsOnwardTrip(false)
      setModal(false)
    }
    // If this is the return trip, close the modal and navigate to the profile page
    else {
      setModal(false)
      navigate('/profile')
    }
  }

  return (
    <div className="plane">
      <div className="seat-booking-container">
        <Card className="seat-booking-card">
          <CardBody>
            <CardTitle tag="h5">Trip Information</CardTitle> <hr></hr>
            <CardText>Trip: {trip.toString()}</CardText>
            <CardText>Departure Date: {formatDate(departureDate)}</CardText>
            {returnDate ? (
              <CardText>Return Date: {formatDate(returnDate)}</CardText>
            ) : null}
            <CardText>Origin: {origin.toString()}</CardText>
            <CardText>Destination: {destination.toString()}</CardText>
          </CardBody>
        </Card>
      </div>

      <div className="total">
        <p>Total: ${calculateTotal()}</p>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-square selected"></div>
          <p>Selected</p>
        </div>
        <div className="legend-item">
          <div className="legend-square occupied"></div>
          <p>Occupied</p>
        </div>
        <div className="legend-item">
          <div className="legend-square empty"></div>
          <p>Empty</p>
        </div>
      </div>

      <SeatPicker
        rows={rows}
        selectedSeats={selectedSeats}
        occupiedSeats={occupiedSeats}
        handleSeatClick={handleSeatClick}
      />

      <div className="seat-booking-container">
        <Modal isOpen={modal} toggle={handlePurchaseClick} backdrop="static">
          <ModalHeader toggle={handlePurchaseClick}>
            Trip Information
          </ModalHeader>
          <ModalBody>
            <p>
              Departure Date:{' '}
              {isOnwardTrip || !returnDate
                ? formatDate(departureDate)
                : formatDate(returnDate)}
            </p>

            <p>
              {' '}
              Origin:{' '}
              {isOnwardTrip ? origin.toString() : destination.toString()}{' '}
            </p>
            <p>
              {' '}
              Destination:{' '}
              {isOnwardTrip ? destination.toString() : origin.toString()}{' '}
            </p>
            {seatReservations.map((seat, index) => (
              <p key={index}>
                Seat: Row {seat.SeatRow}, Number {seat.SeatNumber}
              </p>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={handleConfirmPurchaseClick}>
              Confirm
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      <div className="btn-container">
        <Row>
          <Col md={5}>
            <Button color="primary" onClick={goToHome}>
              Go Back
            </Button>
          </Col>
          <Col md={4}></Col>
          <Col md={1}>
            {returnDate && !returnTripClicked ? (
              <Button
                className="arrow-button"
                color="primary"
                onClick={handleContinue}
              >
                ReturnTrip
              </Button>
            ) : (
              <Button
                className="arrow-button"
                color="primary"
                onClick={handleContinue}
              >
                Continue
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SeatBooking
