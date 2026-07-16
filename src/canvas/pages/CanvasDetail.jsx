import CanvasTitle from '../components/CanvasTitle.jsx';
import LeanCanvas from '../components/LeanCanvas.jsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCanvasDetail, updateCanvas } from '../api/canvasApi.js';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function CanvasDetail() {
  const { id } = useParams(); // URL에서 param을 가져옴.
  const queryClient = useQueryClient();

  const { data: canvas } = useQuery({
    queryKey: ['canvasDetail', id],
    queryFn: () => getCanvasDetail(id),
  });

  const { mutate: saveCanvasTitle } = useMutation({
    mutationFn: updateCanvas, // ({ id, payload }) 형태 그대로 넘김
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canvasDetail', id] });
      queryClient.invalidateQueries({ queryKey: ['canvasList'] });
    },
    onError: (err) => alert(err.message),
  });

  const handleTitleChange = title => {
    saveCanvas({ id, payload: { ...canvas, title } });
  };

  return (
    <div>
      {/*{JSON.stringify(canvas)}*/}
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && <LeanCanvas canvas={canvas} canvasId={id} /> }
    </div>
  );
}

export default CanvasDetail;