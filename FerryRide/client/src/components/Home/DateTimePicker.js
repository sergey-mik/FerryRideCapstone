import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DateTimePicker.css'

const DateTimePicker = ({ date, setDate }) => {
  const [startDate, setStartDate] = useState(null)

  const handleDateChange = (date) => {
    if (date.getHours() === 0 && date.getMinutes() === 0) {
      date.setHours(minTime.getHours())
      date.setMinutes(minTime.getMinutes())
    }
    setStartDate(date)
    setDate(date)
  }

  const minTime = new Date()
  minTime.setHours(6)
  minTime.setMinutes(0)

  const maxTime = new Date()
  maxTime.setHours(20)
  maxTime.setMinutes(0)

  const currentDate = new Date()

  return (
    <div className="dateTimePicker">
      <DatePicker
        onChange={handleDateChange}
        selected={startDate}
        showTimeSelect
        dateFormat="Pp"
        minDate={currentDate}
        minTime={minTime}
        maxTime={maxTime}
        timeIntervals={120}
      />
    </div>
  )
}

export default DateTimePicker
