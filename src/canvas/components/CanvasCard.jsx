import { FaPlus } from 'react-icons/fa';
import Note from './Note.jsx';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCanvasNote, deleteCanvasNote, updateCanvasNote} from "../api/canvasApi.js";

function CanvasCard({ canvasId, sectionType, title, isSubTitle = false, notes = [] }) {
  const queryClient = useQueryClient();
  const invalidateDetail = () => queryClient.invalidateQueries({
    queryKey: ['canvasDetail', canvasId]
  })

  const { mutate: addNote } = useMutation({
    mutationFn: createCanvasNote,
    onSuccess: invalidateDetail,
    onError: (err) => alert(err.message),
  });

  const { mutate: modifyNote } = useMutation({
    mutationFn: updateCanvasNote,
    onSuccess: invalidateDetail,
    onError: (err) => alert(err.message),
  });

  const { mutate: removeNote } = useMutation({
    mutationFn: deleteCanvasNote,
    onSuccess: invalidateDetail,
    onError: (err) => alert(err.message),
  });

  const handleAddNote = () => {
    addNote({ canvasId, sectionType, content: '', color: '' });
  };
  const handleRemoveNote = (id) => {
    removeNote(id);
  };
  const handleUpdateNote = (id, content, color) => {
    modifyNote({ id, payload: { content, color }});
  };

  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubTitle == false && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubTitle == false && 'font-bold'} `}>{title}</h3>
        <button
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
          onClick={handleAddNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes.map(note => (
          <Note
            key={note.id}
            content={note.content}
            color={note.color}
            id={note.id}
            onRemoveNote={handleRemoveNote}
            onUpdatedNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;