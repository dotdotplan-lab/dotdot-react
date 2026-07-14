import { board } from '../../shared/api/http.js';

export const getBoardList = () => board.get('/list').then((res) => res.data.data);
export const getBoardDetail = (id) => board.get(`/${id}`).then((res) => res.data.data);
export const createBoard = (payload) => board.post('/create', payload).then((res) => res.data.data);
export const updateBoard = ({ id, payload }) => board.put(`/${id}`, payload).then((res) => res.data.data);
export const deleteBoard = (id) => board.delete(`/${id}`).then((res) => res.data.data);