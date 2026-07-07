import axios from 'axios';

function create(baseURL, options) {
  // baseURL: baseUrl, key와 value 값이 동일하면 하나로 축약 가능.
  const instance = axios.create(Object.assign({ baseURL }, options));
  return instance;
}
console.log('VITE_API_BASE_URL: ', import.meta.env.VITE_API_BASE_URL);
// 배포한 API 주소
// export const canvases = create(
//   'https://json-server-vercel-rust-ten.vercel.app/canvases',
// );
export const canvases = create(`${import.meta.env.VITE_API_TEST_URL}/canvases/`,);
export const board = create(`${import.meta.env.VITE_API_BASE_URL}/api/board`);
// export const posts = create('http://localhost:8000/posts/');