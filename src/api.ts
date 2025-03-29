import axios from 'axios';
import { User, LoginResponse, UsersResponse } from './types';

const BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', { email, password });
    if (!response.data.token) {
      throw new Error('Invalid credentials');
    }
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const getUsers = async (page: number): Promise<UsersResponse> => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};