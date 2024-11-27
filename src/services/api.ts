import axios from 'axios';
import { Car, Client, Agency, location } from '@/lib/types';

// Base API URL
const API_URL = 'http://127.0.0.1:8082/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
   // 'Access-Control-Allow-Credentials' : true ,
  
  },
  //withCredentials : true
 
});

/** ====================== VOITURES API ====================== **/

export const getCars = () => api.get('Voiture/data').then(res => res.data); // List cars


export const createCar = async (car: Car) => {
  try {
    const response = await api.post('Voiture/submit', car);
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error; 
  }
};


export const updateCar = (id: number, car: Car) => api.put(`Voiture/update/${id}`, car).then(res => res.data);

export const deleteCar = (id: number) => api.delete(`Voiture/delete/${id}`).then(res => res.data);

/** ====================== Other APIs (as is) ====================== **/
export const getClients = () => api.get('Client/data').then(res => res.data);
export const createClient = (client: Client) => api.post('Client/submit', client).then(res => res.data);
export const updateClient = (id: number, client: Client) => api.put(`Client/update/${id}`, client).then(res => res.data);
export const deleteClient = (id: number) => api.delete(`Client/delete/${id}`).then(res => res.data);
export const getAgencies = () => api.get('Agence/data').then(res => res.data);
export const createAgency = (agency: Agency) => api.post('Agence/submit', agency).then(res => res.data);
export const updateAgency = (id: number, agency: Agency) => api.put(`Agence/update/${id}`, agency).then(res => res.data);
export const deleteAgency = (id: number) => api.delete(`Agence/delete/${id}`).then(res => res.data);
export const getRentals = () => api.get('Location/data').then(res => res.data);
export const createRental = (rental: location) => api.post('Location/submit', rental).then(res => res.data);
export const updateRental = (id: number, rental: location) => api.put(`Location/update/${id}`, rental).then(res => res.data);
export const deleteRental = (id: number) => api.delete(`Location/delete/${id}`).then(res => res.data);
