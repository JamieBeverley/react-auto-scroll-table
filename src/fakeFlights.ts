// Define the Flight type
export type Flight = {
  flightNumber: string;
  airline: string;
  departureAirport: string;
  destinationAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
};

// Sample list of real airport codes
const airports: string[] = [
  "JFK", "LAX", "ORD", "DFW", "ATL", "SFO", "DEN", "SEA", "MIA", "LAS", "PHX", "BOS", "MCO", "IAH", "EWR",
];

// Generate fake flight data with real airports
export const fakeFlights: Flight[] = [];

for (let i = 1; i <= 15; i++) {
  const departureIndex = Math.floor(Math.random() * airports.length);
  let destinationIndex = Math.floor(Math.random() * airports.length);
  
  // Ensure the destination is different from the departure
  while (destinationIndex === departureIndex) {
    destinationIndex = Math.floor(Math.random() * airports.length);
  }

  const flight: Flight = {
    flightNumber: `FL${i}`,
    airline: `Airline ${i}`,
    departureAirport: airports[departureIndex],
    destinationAirport: airports[destinationIndex],
    departureTime: `2023-12-27T0${i}:00:00`,
    arrivalTime: `2023-12-27T0${i + 2}:00:00`,
    duration: i * 60,
    price: Math.floor(Math.random() * 500) + 100,
  };

  fakeFlights.push(flight);
}
