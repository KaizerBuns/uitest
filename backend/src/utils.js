import _ from 'lodash';
import db from './db.js';

export function getOrders() {
  return Object.keys(db.order).map((key) => {
    return {
      order_id: key,
      destination: db.order[key].destination,
    };
  });
}

export function getOrderFlights() {
  const flights = db.flight;
  const ordersPerFlight = 20;
  let orders = _.clone(getOrders());
  let flightOrders = [];

  flights.forEach((flight) => {
    let newOrders = orders
      .filter((order) => order.destination === flight.arrival_city)
      .slice(0, ordersPerFlight);

    if (newOrders.length > 0) {
      newOrders.forEach((order) => {
        flightOrders.push({
          flight_number: flight.flight_number,
          departure_city: flight.departure_city,
          arrival_city: flight.arrival_city,
          day: flight.day,
          order_id: order.order_id,
        });
      });

      //filter out the orders that have been assigned to the flight for the next iteration
      newOrders.forEach((order) => {
        orders = orders.filter((o) => o.order_id !== order.order_id);
      });
    }
  });

  //remaining orders that have not been assigned to any flight
  orders.forEach((order) => {
    flightOrders.push({
      flight_number: null,
      departure_city: null,
      arrival_city: order.destination,
      day: null,
      order_id: order.order_id,
    });
  });

  return flightOrders;
}

export function getOrdersByOrderID(orderId) {
  const orders = getOrders();
  return orders.filter((order) => order.order_id === orderId);
}

export function getOrdersByDestination(destination) {
  const orders = getOrders();
  return orders.filter((order) => order.destination === destination);
}

export function groupFlightsByDay(data) {
  return _.chain(data)
    .groupBy('day')
    .map((value, key) => ({ day: key, schedule: value }))
    .value();
}
