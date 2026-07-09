import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../shared/layouts/Button.jsx";
import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createBoard, deleteBoard, getBoardDetail, updateBoard} from "../../shared/apis/boardApi.js";
import { board } from "../../shared/apis/http.js";

function SaveForm() {
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [isEditorReady, setIsEditorReady] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValue: { title: "", createdBy: "" },
    });

    // 수정 모드: 기존 데이터 조회
    const { data: detail } = useQuery({
        queryKey: ["boardDetail", id],
        queryFn: () => getBoardDetail(id),
        enabled: isEditMode, // 등록 모드에서는 실행 안 함.
    });

    useEffect(() => {
        if (!detail) return;
        setValue("title", detail.title);
        setValue("createdBy", detail.createdBy);
        setValue("createdAt", detail.createdAt);
        if (editorRef.current) {
            editorRef.current.setContent(detail.content ?? "");
        }
    }, [detail, isEditorReady, setValue]);

    // 등록/수정 mutation
    const saveMutation = useMutation({
        mutationFn: (payload) => isEditMode ? updateBoard({ id, payload }) : createBoard(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boardList"] });
            alert(isEditMode ? "수정되었습니다." : "등록되었습니다.");
            navigate("/board");
        },
        onError: (err) => {
            const message = err.response?.data?.message ?? "저장 중 오류가 발생했습니다.";
            console.error("저장 실패:", err);
            alert(message);
        },
    });

    // 삭제 mutation
    const deleteMutation = useMutation({
        mutationFn: () => deleteBoard(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boardList"] });
            alert("삭제되었습니다.");
            navigate("/board");
        },
        onError: (err) => {
            console.log("삭제 실패:", err);
            alert("삭제 중 오류가 발생했습니다.");
        },
    });

    const onSubmit = (formData) => {
      const content = editorRef.current ? editorRef.current.getContent() : "";
      saveMutation.mutate({
         title: formData.title,
         createdBy: formData.createdBy,
         content: content,
      });
    };

    const handleDelete = () => {
        if (!isEditMode) return;
        if (!confirm("정말 삭제하시겠습니까?")) return;
        deleteMutation.mutate();
    };

    return (
        <div style={{ padding: 20 }}>
            <div className="container mx-auto px-4 py-8">
                {/* 제목 + 버튼 영역 */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        게시판 {isEditMode ? "수정" : "등록"}
                    </h1>
                        <div className="flex gap-2">
                        <Button onClick={() => navigate('/board')}>
                            목록
                        </Button>
                        <Button color="bule" onClick={handleSubmit(onSubmit)} disabled={isSubmitting || saveMutation.isPaused}>
                            {isEditMode ? "수정" : "저장"}
                        </Button>
                            {isEditMode && (
                                <Button color="red" onClick={handleDelete} disabled={deleteMutation.isPending}>
                                    삭제
                                </Button>
                            )}
                    </div>
                </div>

                {/* 제목 / 작성자 입력 */}
                <div className="mb-4 space-y-3">
                    <div>
                        <input
                            type="text"
                            placeholder="제목"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            {...register("title", { required: "제목을 입력해주세요." })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="작성자"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            {...register("createdBy", { required: "작성자를 입력해주세요." })}
                        />
                        {errors.createdBy && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.createdBy.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 에디터 영역 */}
                <Editor
                    apiKey="no-api-key" // 테스트용 (운영 시 Tiny Cloud API key 사용 권장)
                    onInit={(evt, editor) => {
                        editorRef.current = editor;
                        setIsEditorReady(true);
                    }}
                    // initialValue="<p>여기에 글을 입력하세요...</p>"
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
                        images_upload_handler: (blobInfo) => {
                            return new Promise((resolve, reject) => {
                                const file = blobInfo.blob();
                                const maxSize = 10 * 1024 * 1024; // 10MB

                                if (file.size > maxSize) {
                                    reject('이미지 용량은 10MB를 초과할 수 없습니다.');
                                    return;
                                }

                                const formData = new FormData();
                                formData.append('file', blobInfo.blob(), blobInfo.filename());

                                board.post('/upload', formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' },
                                })
                                    .then((res) => {
                                        const url = res.data?.data?.url;
                                        if (!url) {
                                            reject('업로드 응답에 URL이 없습니다.');
                                            return;
                                        }
                                        resolve(url); // 백엔드가 반환하는 이미지 URL
                                    })
                                    .catch((err) => {
                                        console.error('업로드 실패:', err);
                                        reject('이미지 업로드 실패: ' + (err.response?.data?.message ?? err.message));
                                    });
                            });
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default SaveForm;