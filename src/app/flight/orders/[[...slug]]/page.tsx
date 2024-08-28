'use client';
import OrderModel, { Order } from '@/models/order';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';

const Orders = ({ params }: { params: any }) => {
  const { slug } = params;
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    if (slug) {
      setOrders(await OrderModel.getByFlightId(parseInt(slug[0])));
    } else {
      setOrders(await OrderModel.get());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header buttonLink='/' buttonTitle='VIEW FLIGHT SCHEDULES' />
      {loading && (
        <div className='p-6'>
          <Spinner />
        </div>
      )}
      {orders?.length === 0 ? (
        <div className='p-6'>No orders for this flight</div>
      ) : (
        orders &&
        orders?.length > 0 && (
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Orders</h2>
            <table className='w-full text-left table-auto border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-2 border-b'>Order</th>
                  <th className='px-4 py-2 border-b'>Flight</th>
                  <th className='px-4 py-2 border-b'>Departure</th>
                  <th className='px-4 py-2 border-b'>Arrival</th>
                  <th className='px-4 py-2 border-b'>Day</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((detail: Order, index: number) => (
                  <tr key={index}>
                    <td className='px-4 py-2 border-b'>{detail.order_id}</td>
                    <td className='px-4 py-2 border-b'>
                      {detail.flight_number}
                    </td>
                    <td className='px-4 py-2 border-b'>
                      {detail.departure_city}
                    </td>
                    <td className='px-4 py-2 border-b'>
                      {detail.arrival_city}
                    </td>
                    <td className='px-4 py-2 border-b'>{detail.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </>
  );
};

export default Orders;
