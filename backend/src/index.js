import jsonServer from 'json-server';
import db from './db.js';
import { getOrders, groupFlightsByDay, getOrderFlights } from './utils.js';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db);

server.use(middlewares);
server.use(jsonServer.bodyParser);

/*
const rewriter = jsonServer.rewriter({
  '/api/flight/:flightId/get': '/api/flight?flight_number=:flightId',
});

server.use(rewriter);
*/

server.get('/api/flights', (req, res) => {
  const data = db.flight;
  res.json(groupFlightsByDay(data));
});

server.get('/api/orders', (req, res) => {
  const orders = getOrderFlights();
  res.json(orders);
});

server.get('/api/orders/flight/:flightNumber/get', (req, res) => {
  const orders = getOrderFlights();
  const flightNumber = parseInt(req.params.flightNumber);
  res.json(orders.filter((order) => order.flight_number === flightNumber));
});

// Use default router
server.use('/api', router);
server.listen(process.env.PORT || 5500, () => {
  console.log(`JSON Server is running on ${process.env.PORT || 5500}`);
});

export default server;
