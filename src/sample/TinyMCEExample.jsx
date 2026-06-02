import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEExample() {
    const editorRef = useRef(null);

    const logContent = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            alert(editorRef.current.getContent());
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>React TinyMCE Editor Sample</h2>

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
    );
}