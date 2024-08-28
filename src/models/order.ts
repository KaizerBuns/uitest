import http from '@/service/api';

export interface Order {
  flight_number: number;
  departure_city: string;
  arrival_city: string;
  day: number;
  order_id: string;
}

class OrderModel {
  async get() {
    const response = await http.get(`/orders`);
    if (response.data) {
      return response.data as Order[];
    }
    return [];
  }

  async getByFlightId(id: number) {
    const response = await http.get(`/orders/flight/${id}/get`);
    if (response.data) {
      return response.data as Order[];
    }
    return [];
  }
}

export default new OrderModel();
