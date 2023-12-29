import './App.css';
import ScrollTable from 'react-auto-scroll-table'
import {useState} from 'react';
import {fakeFlights} from './fakeFlights';

function Example() {
  const [height, setHeight] = useState(300)
  const [speed, setSpeed] = useState(1)

  return (
    <section>
      <h2>Example</h2>
      <p>
        The table will start scrolling when the height is less than the
        required client height to render the inner tbody.
        Try adjusting the height of the container and scroll speed.
      </p>
      <div>
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={e => setHeight(parseInt(e.target.value))}
          step={10}
          min={0}
        />
        <br/>
        <label htmlFor="speed">speed:</label>
        <input
          id="speed"
          type="number"
          value={speed}
          onChange={e => setSpeed(parseFloat(e.target.value))}
          step={0.5}
          min={0}
        />
      </div>
      <div
        className='example-container'
        style={{height}}>
        <ScrollTable
          containerClassName='auto-scroll-table-container'
          tableClassName='auto-scroll-table'
          speed={speed}
          thead={
            <thead>
              <tr>
                <th>Flight No.</th>
                <th>Airline</th>
                <th>Departing</th>
                <th>Destination</th>
              </tr>
            </thead>
          }
          spacer={<tr><td style={{backgroundColor: '#eeee00'}} colSpan={4} /></tr>}
          tbodyRows={
            fakeFlights.map((flight) =>
              <tr key={flight.flightNumber}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.departureAirport}</td>
                <td>{flight.destinationAirport}</td>
              </tr>
            )
          }
        />
      </div>
    </section>
  )
}


export default Example
