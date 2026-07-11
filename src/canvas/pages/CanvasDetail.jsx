import CanvasTitle from '../components/CanvasTitle.jsx';
import LeanCanvas from '../components/LeanCanvas.jsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCanvasById, updateCanvas, updateTitle } from '../api/canvasApi.js';

function CanvasDetail() {
  const { id } = useParams(); // URL에서 param을 가져옴.
  const [ canvas, setCanvas ] = useState(null);

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas(); // useEffect 함수에서는 바로 비동기 함수 호출을 호출 할 수 없으므로, 이와 같이 함수를 만들어서 호출함.
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCanvasChange =  async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      {/*{JSON.stringify(canvas)}*/}
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange}/> }
    </div>
  );
}

export default CanvasDetail;