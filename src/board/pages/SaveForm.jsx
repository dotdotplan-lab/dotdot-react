import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../shared/layouts/Button.jsx";
import {useNavigate} from "react-router";

export default function SaveForm() {
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const logContent = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            alert(editorRef.current.getContent());
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <div className="container mx-auto px-4 py-8">
                {/* 제목 + 버튼 영역 */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">게시판 등록</h1>
                        <div className="flex gap-2">
                        <Button color="bule" onClick={() => navigate('/save-form')}>
                            저장
                        </Button>
                        <Button color="red" onClick={() => navigate('/delete-form')}>
                            삭제
                        </Button>
                    </div>
                </div>
                {/* 에디터 영역 */}
                <Editor
                    apiKey="no-api-key" // 테스트용 (운영 시 Tiny Cloud API key 사용 권장)
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>여기에 글을 입력하세요...</p>"
                    init={{
                        license_key: 'gpl',
                        height: 400,
                        menubar: true,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "table",
                            "code",
                            "fullscreen",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | bold italic underline | " +
                            "alignleft aligncenter alignright | " +
                            "bullist numlist | link image table | code fullscreen",
                    }}
                />

                <div style={{ marginTop: 10 }}>
                    <button onClick={logContent}>내용 출력</button>
                </div>
            </div>
        </div>
    );
}