import React from 'react'

const SeatPicker = ({
  rows,
  selectedSeats,
  occupiedSeats,
  handleSeatClick,
}) => {
  return (
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
  )
}

export default SeatPicker
