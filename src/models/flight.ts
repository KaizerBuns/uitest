import http from '@/service/api';

export interface FlightSchedule {
  flight_number: number;
  departure_city: string;
  arrival_city: string;
  day: number;
}

export interface Flight {
  day: number;
  schedule: FlightSchedule[];
}

class FlightModel {
  async get() {
    const response = await http.get(`/flights`);
    if (response.data) {
      return response.data as Flight[];
    }
    return [];
  }
}

export default new FlightModel();
