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

  const { mutate: saveCanvas } = useMutation({
    mutationFn: updateCanvas, // ({ id, payload }) 형태 그대로 넘김
    onSuccess: (_, variables) => {
      // 1. 상세 캐시를 즉시 새 값으로 갱신 (재요청 없이 화면 즉시 반영)
      queryClient.setQueryData(['canvasDetail', id], variables.payload);
      // 2. 목록 캐시도 무효화 -> 목록으로 돌아가면 최신 제목 보임
      queryClient.invalidateQueries({ queryKey: ['canvasList'] });
    },
    onError: (err) => alert(err.message),
  });

  const handleTitleChange = title => {
    saveCanvas({ id, payload: { ...canvas, title } });
  };

  const handleCanvasChange =  updatedCanvas => {
    saveCanvas({ id, payload: updatedCanvas });
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