import './App.css';
import ScrollTable from 'react-auto-scroll-table'
import {Component, ReactNode, useEffect, useState} from 'react';
import {fakeFlights} from './fakeFlights';

const BUILD_HASH = '12345'


const useNewDeploymentAvailable = (intervalSeconds: number): boolean => {
  const [newAvailable, setNewAvailable] = useState(false)
  useEffect(() => {
    const abortController = new AbortController();

    const interval = setInterval(async () => {
      const meta = await fetch(
        "/meta.json",
        {
          headers: {"cache-control": "no-cache"},
          signal: abortController.signal
        }
      )
      const json = await meta.json()
      setNewAvailable(json.build !== BUILD_HASH)
    }, intervalSeconds * 1000)
    return () => {
      clearInterval(interval)
      abortController.abort()
    }
  }, [intervalSeconds])
  return newAvailable
}

const useRefreshOnNewDeployment = () => {
  const newDeployment = useNewDeploymentAvailable(60);
  useEffect(() => {
    if (newDeployment) {
      window.location.reload()
    }
  }, [newDeployment])
}


type Props = {
  // Callback for reporting an error should it occur. We assume we're
  // reporting errors via some HTTP call (returning an aysnc Response)
  reportError: (error: Error) => Promise<Response>;
  children?: React.ReactNode;
}

type State = {
  // Have we caught an error?
  hasError: boolean;
  // Has the error been successfully reported?
  errorReported: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  // Internal reference to a timeout. We'll use this delay some number of
  // seconds before trying to refresh in the case of an error
  private refreshTimeout: null | ReturnType<typeof setTimeout> = null;
  // The name of the URL parameter we'll use to determine how long to wait
  // before refreshing the page when an error occurs.
  private readonly urlParameter = 'refreshDurationSeconds'
  // Timeout for reseting the URL parameter
  private clearRefreshTimeout: null | ReturnType<typeof setTimeout> = null;

  state = {hasError: false, errorReported: false}


  private getRefreshDurationSeconds(): number {
    // Parse the URL parameter containing how long to wait before refreshing
    // after an error - default to some number of seconds.
    const urlParameters = new URLSearchParams(window.location.search);
    const refreshDuration = urlParameters.get(this.urlParameter)
    if (refreshDuration) return parseInt(refreshDuration)
    return 5
  }

  private reload(duration: number) {
    // Reload the page, setting the URL parameter to the new duration we'll wait
    // next time, if an error occurs.
    const urlParameters = new URLSearchParams(window.location.search);
    urlParameters.set('refreshDurationSeconds', duration.toString())
    window.location.href = `${window.location.pathname}?${urlParameters}`
  }

  public static getDerivedStateFromError(): State {
    return {hasError: true, errorReported: false}
  }

  async componentDidCatch(error: Error) {
    // If we catch an error, report it and set the state so the render method
    // can inform the user that it has been reported
    const response = await this.props.reportError(error);
    this.setState({errorReported: response.ok})
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {

    // If a new error occurred, wait the specified duration, and then refresh.
    if (this.state.hasError && !prevState.hasError) {
      const waitDuration = this.getRefreshDurationSeconds()
      this.refreshTimeout = setTimeout(() => {
        // We reload, setting the next reload duration to be 1.5x the current.
        // So we'll iteratively increase the wait time. We can clip this at some
        // max value (eg. 60s here)
        this.reload(Math.min(60, Math.round(waitDuration * 1.5)));
      }, waitDuration * 1000)
    }
  }

  componentWillUnmount(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
    if (this.clearRefreshTimeout) {
      clearTimeout(this.clearRefreshTimeout)
    }
  }

  componentDidMount(): void {
    // When this component mounts, check if the URL parameter for the error
    // refresh was set. If it is, we'll clear it after 2x the refresh duration.
    // That way, if we had an error on our last render and refreshing solved it,
    // then we reset the refresh duration back down to the default if an error
    // occurs later.
    const waitDuration = this.getRefreshDurationSeconds()
    this.clearRefreshTimeout = setTimeout(() => {
      const urlParameters = new URLSearchParams(window.location.search);
      if (urlParameters.has(this.urlParameter)) {
        urlParameters.delete(this.urlParameter)
        const newUrl = `${window.location.pathname}${urlParameters.size ? `?${urlParameters}` : ''}`
        window.history.replaceState(null, '', newUrl)
      }
    }, waitDuration * 2 * 1000)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      let message = "An unexpected error occurred."
      if (this.state.errorReported) {
        message = `${message} We have been notified and are working on it.`
      }
      return <div>{message}</div>
    }
    return this.props.children
  }

}

const ErrorComponent = () => {
  throw "error"
  return null;
}

function App() {
  const [height, setHeight] = useState(700)
  return (
    <div className="App">
      <div>
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={e => setHeight(parseInt(e.target.value))}
          step={10}
        />
      </div>
      <div
        style={{
          height: `${height}px`,
          width: '100%',
          overflow: 'hidden',
          border: '1px solid black'
        }}
      >
        <ScrollTable
          speed={1}
          thead={
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Airline</th>
                <th>Departure Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>
          }
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
    </div>
  );
}

export default App;
