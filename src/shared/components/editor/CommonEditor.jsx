import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Editor} from "@tinymce/tinymce-react";

const CommonEditor = forwardRef(function CommonEditor(
    { isEditing, initialContent, uploadApi }, ref
) {
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useImperativeHandle(ref, () => ({
        // TinyMCE 인스턴스의 getContent가 실행됨.
        getContent: () => editorRef.current?.getContent() ?? "",
        setContent: (html) => editorRef.current?.setContent(html ?? ""),
    }));

    // isEditing 상태에 따른 tinyMCE Editor 옵션 변경.
    useEffect(() => {
        if (!editorRef.current) return;
        if (isEditing) {
            editorRef.current.mode.set('design'); // 편집모드
            editorRef.current.ui.show(); // 툴바/메뉴 표시
        } else {
            editorRef.current.mode.set('readonly'); // 읽기 모드
            editorRef.current.ui.hide(); // 툴바/메뉴 숨김
        }
    }, [isEditing]);

    useEffect(() => {
        if (!isReady) return;
        if (!editorRef.current) return;
        if (initialContent) {
            editorRef.current.setContent(initialContent);
        }
    }, [isReady, initialContent]);

    const handleImageUpload = (blobInfo) => {
        return new Promise((resolve, reject) => {
            const file = blobInfo.blob();
            const maxSize = 10 * 1024 * 1024;

            if (file.size > maxSize) {
                reject('이미지 용량은 10MB를 초과할 수 없습니다.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file, blobInfo.filename());

            uploadApi.post('/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
                .then((res) => {
                    const url = res.data?.data?.url;
                    if (!url) {
                        reject('업로드 응답에 URL이 없습니다.');
                        return;
                    }
                    resolve(url);
                })
                .catch((err) => {
                    console.error('업로드 실패:', err);
                    reject('이미지 업로드 실패: ' + (err.response?.data?.message ?? err.message));
                });
        });
    };

    return (
        <Editor
            apiKey="no-api-key"
            onInit={(evt, editor) => {
                editorRef.current = editor;
                setIsReady(true);
            }}
            init={{
                license_key: "gpl",
                height: 500,
                menubar: true,
                table_resize_bars: false,
                table_default_styles: {},
                table_col_resizing: false,
                content_style: `
                    table { border-collapse: collapse; table-layout: auto; }
                    td, th { border: 1px solid #d1d5db; padding: 8px 12px; }
                `,
                plugins: ["advlist", "autolink", "lists", "link", "image", "table", "code", "fullscreen", "wordcount"],
                toolbar: [
                    "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | code fullscreen",
                ],
                readonly: !isEditing,
                images_upload_handler: handleImageUpload,
            }}
        />
    );
});

export default CommonEditor;