import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://todo-list-api-a1aw.onrender.com',
})