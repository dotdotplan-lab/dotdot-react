import { canvases } from '../../shared/api/http.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export async function getCanvases(params) {
  // Object.assign :
  // 하나 이상의 소스 객체의 속성을 타겟 객체에 복사하고, 타겟 객체를 반환하는 메서드
  // params에 같은 키가 있으면 덮어씌워지고, 없으면 기본값이 유지.
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const {data} = await canvases.get('/', { params: payload });
  return data;
}

export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0,4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}

export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post - 새로운 자원 생성
   * put - 기존 자원 전체 업데이트 또는 새로운 자원 생성
   * patch - 기존 자원 일부 수정
   */
  canvases.patch(`/${id}`, { title });
}

export async function updateCanvas(id, canvas) {
  canvases.put(`/${id}`, canvas);
}