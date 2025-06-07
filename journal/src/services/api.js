import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const getNotes = () => axios.get(`${API_BASE_URL}entries/`);

export const addNote = (noteData) => axios.post(`${API_BASE_URL}entries/`, noteData);

export const deleteNote = (id) => axios.delete(`${API_BASE_URL}entries/${id}/`);