'use client';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import FlightModel, { Flight, FlightSchedule } from '@/models/flight';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await FlightModel.get();
    setFlights(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header buttonLink='/flight/orders' buttonTitle='VIEW ORDERS SCHEDULE' />
      {loading && (
        <div className='p-6'>
          <Spinner />
        </div>
      )}
      {flights?.length === 0 ? (
        <div className='p-6'>No Flights Today</div>
      ) : (
        flights?.map((flight: Flight, index: number) => (
          <div key={index} className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>
              Scheduled flights for day {flight.day}
            </h2>
            <table className='w-full text-left table-auto border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-2 border-b'>Flight</th>
                  <th className='px-4 py-2 border-b'>Departure</th>
                  <th className='px-4 py-2 border-b'>Arrival</th>
                  <th className='px-4 py-2 border-b'>View Flight</th>
                </tr>
              </thead>
              <tbody>
                {flight.schedule.map(
                  (detail: FlightSchedule, index: number) => (
                    <tr key={index}>
                      <td className='px-4 py-2 border-b'>
                        {detail.flight_number}
                      </td>
                      <td className='px-4 py-2 border-b'>
                        {detail.departure_city}
                      </td>
                      <td className='px-4 py-2 border-b'>
                        {detail.arrival_city}
                      </td>
                      <td className='px-4 py-2 border-b'>
                        <Link href={`/flight/orders/${detail.flight_number}`}>
                          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'>
                            VIEW FLIGHT
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </>
  );
};

export default Home;
