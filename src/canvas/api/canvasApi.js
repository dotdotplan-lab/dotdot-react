import { canvas } from '../../shared/api/http.js';

export const getCanvasList = (params) => canvas.get('/canvaslist', { params }).then((res) => res.data.data); // 캔버스 목록
export const getCanvasDetail = (id) => canvas.get(`/${id}`).then((res) => res.data.data); // 캔버스 상세, 노트 정보 가져옴.
export const createCanvas = (payload) => canvas.post('/createCanvas', payload).then((res) => res.data.data);
export const updateCanvas = ({ id, payload }) => canvas.put(`/${id}`, payload).then((res) => res.data.data);
export const deleteCanvas = (id) => canvas.delete(`/${id}`).then((res) => res.data.data);

export const getCanvasNoteList = (params) => canvas.get('/note/list', { params }).then((res) => res.data.data);
export const getCanvasNoteDetail = (id) => canvas.get(`/note/${id}`).then((res) => res.data.data);
export const createCanvasNote = (payload) => canvas.post('/note/createNote', payload).then((res) => res.data.data);
export const updateCanvasNote = ({ id, payload }) => canvas.put(`/note/${id}`, payload).then((res) => res.data.data);
export const deleteCanvasNote = (id) => canvas.delete(`/note/${id}`).then((res) => res.data.data);

