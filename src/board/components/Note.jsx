import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';

const Note = ({
  id,
  content,
  color: initialColor,
  onUpdatedNote,
  onRemoveNote
}) => {
  const [localContent, setLocalContent] = useState(content); //  content 상태를 local에서 관리.

  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const [color, setColor] = useState(() => {
    if (initialColor) return initialColor;
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  });

  const [isEditing, setEditing] = useState(false);

  const textareaRef = useRef(null);

  const handleContentChange = () => {
    onUpdatedNote(id, localContent, color);
  }

  const handleColorChange = newColor => {
    setColor(newColor); // 현재 컬러 변경
    onUpdatedNote(id, content, newColor);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
      onClick={() => setEditing(true)} // 클릭하면 true, 수정 모드 적용.
    >
      <div className="absolute top-2 right-2">
        {isEditing ? ( // 수정 모드
          <button
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation(); // 이벤트 전달 막음. 위의 div onClick 이벤트 실행 안됨.
              setEditing(false); // 수정 모드 종료.
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          // 읽기 모드
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />
      {isEditing && ( // 수정 모드 일때 색깔 선택 UI 나옴. && : 왼쪽이 true일때 오른쪽 실행.
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              onClick={() => handleColorChange(option)}
              aria-label={`Change color to ${option}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
