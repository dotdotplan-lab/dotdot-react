import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Editor} from "@tinymce/tinymce-react";
import {useMutation} from "@tanstack/react-query";
import {createBoard, updateBoard} from "../../../board/api/boardApi.js";

const CommonEditor = forwardRef(function CommonEditor(props, ref) {
    // ref : 부모에서 넘겨준 ref
    const editorRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContent: () => editorRef.current?.getContent() ?? "", // TinyMCE 인스턴스의 getContent가 실행됨.
        setContent: (html) => editorRef.current?.setContent(html ?? ""),
    }));

    // isEditing 상태에 따른 tinyMCE Editor 옵션 변경.
    useEffect(() => {
        if (!editorRef.current) return;
        if (props.isEditing) {
            editorRef.current.mode.set('design'); // 편집모드
            editorRef.current.ui.show(); // 툴바/메뉴 표시
        } else {
            editorRef.current.mode.set('readonly'); // 읽기 모드
            editorRef.current.ui.hide(); // 툴바/메뉴 숨김
        }
    }, [props.isEditing]);

    return (
        <Editor
            apiKey="no-api-key"
            onInit={(evt, editor) => {
                editorRef.current = editor;
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
                readonly: false,
                images_upload_handler: (blobInfo) => {
                    return new Promise((resolve, reject) => {
                        const file = blobInfo.blob();
                        const maxSize = 10 * 1024 * 1024;

                        if (file.size > maxSize) {
                            reject('이미지 용량은 10MB를 초과할 수 없습니다.');
                            return;
                        }

                        const formData = new FormData();
                        formData.append('file', file, blobInfo.filename());

                        board.post('/upload', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
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
                },
            }}
        />
    );
});

export default CommonEditor;