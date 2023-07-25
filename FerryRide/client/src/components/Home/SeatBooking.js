import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, CardText, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, } from 'reactstrap'
import { addSeatReservation } from '../../modules/seatManager'
import { addTicketPurchase } from '../../modules/ticketManager'
import './SeatBooking.css'

const SeatBooking = ({ goToHome, trip, departureDate, arrivalDate, origin, destination, ticketPurchase, }) => {
  const rows = Array.from({ length: 12 }, (_, i) => i + 1)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [seatReservations, setSeatReservations] = useState([])

  const [modal, setModal] = useState(false)

 useEffect(() => {
   setOccupiedSeats(['1-1', '2-2', '3-3', '4-4', '5-5'])
 }, [])

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


const handlePurchaseClick = () => {
  // Post the ticketPurchase data to the server
  addTicketPurchase(ticketPurchase)
    .then((response) => response.json())
    .then((data) => {
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
}


  const handleConfirmPurchaseClick = () => {

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

    // Closes the modal after making addSeatReservation requests
    setModal(false)
  }


  return (
    <div className="plane">
      <div className="seat-booking-container">
        <Card className="seat-booking-card">
          <CardBody>
            <CardTitle tag="h5">Trip Information</CardTitle>
            <CardText>Trip: {trip.toString()}</CardText>
            <CardText>
              Departure Date: {departureDate.toLocaleDateString()}{' '}
              {departureDate.toLocaleTimeString()}
            </CardText>
            {arrivalDate ? (
              <CardText>
                Arrival Date: {arrivalDate.toLocaleDateString()}{' '}
                {arrivalDate.toLocaleTimeString()}
              </CardText>
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

      <Row>
        <Col md={2}></Col>
        <Col md={4}>
          <Button color="primary" onClick={goToHome}>
            Go Back
          </Button>
        </Col>
        <Col md={3}></Col>
        <Col md={3}>
          <Button
            className="arrow-button"
            color="primary"
            onClick={handlePurchaseClick}
          >
            Reserve
          </Button>
        </Col>
        <Col md={2}></Col>
      </Row>

      <div className="cabin">
        <div className="plane-top"></div>
        <div className="plane-tail"></div>
        {rows.map((row) => (
          <div
            className={`seat-row ${
              row <= 3
                ? 'first-class'
                : row <= 6
                ? 'business-class'
                : 'economy-class'
            }`}
            key={row}
          >
            {['one', 'two', 'three'].map((seat, index) => (
              <div className={`seat ${seat}`} key={seat}>
                <button
                  id={`seat-${row}-${index + 1}`}
                  className={`seat-button ${
                    selectedSeats.includes(`${row}-${index + 1}`)
                      ? 'selected'
                      : occupiedSeats.includes(`${row}-${index + 1}`)
                      ? 'occupied'
                      : 'empty'
                  }`}
                  data-seat={`${row}-${index + 1}`}
                  onClick={handleSeatClick}
                />
              </div>
            ))}
            <div className="aisle">
              <span className="aisle-number">{row}</span>
            </div>
            {['four', 'five', 'six'].map((seat, index) => (
              <div className={`seat ${seat}`} key={seat}>
                <button
                  id={`seat-${row}-${index + 4}`}
                  className={`seat-button ${
                    selectedSeats.includes(`${row}-${index + 4}`)
                      ? 'selected'
                      : occupiedSeats.includes(`${row}-${index + 4}`)
                      ? 'occupied'
                      : 'empty'
                  }`}
                  data-seat={`${row}-${index + 4}`}
                  onClick={handleSeatClick}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="seat-booking-container">
        <Modal isOpen={modal} toggle={handlePurchaseClick}>
          <ModalHeader toggle={handlePurchaseClick}>
            Trip Information
          </ModalHeader>
          <ModalBody>
            <p>Trip: {trip.toString()}</p>
            <p>
              Departure Date: {departureDate.toLocaleDateString()}{' '}
              {departureDate.toLocaleTimeString()}
            </p>
            {arrivalDate && (
              <p>
                Arrival Date: {arrivalDate.toLocaleDateString()}{' '}
                {arrivalDate.toLocaleTimeString()}{' '}
              </p>
            )}
            <p>Origin: {origin.toString()}</p>
            <p>Destination: {destination.toString()}</p>
            {seatReservations.map((seat, index) => (
              <p key={index}>
                Seat: Row {seat.SeatRow}, Number {seat.SeatNumber}
              </p>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleConfirmPurchaseClick}>
              Confirm Purchase
            </Button>{' '}
            <Button color="secondary" onClick={handlePurchaseClick}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default SeatBooking
