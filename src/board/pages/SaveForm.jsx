import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/layouts/Button.jsx";
import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createBoard, deleteBoard, getBoardDetail, updateBoard} from "../api/boardApi.js";
import { board } from "../../shared/api/http.js";
import CommonEditor from "../../shared/components/editor/CommonEditor.jsx";

function SaveForm() {
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [isEditing, setIsEditing] = useState(!isEditMode); // 등록 모드면 처음부터 Editor 보이게.

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

    // 값 변경되면 설정, 내용 수정되면 바로 보이게
    useEffect(() => {
        if (!detail) return;
        setValue("title", detail.title);
        setValue("createdBy", detail.createdBy);
        setValue("createdAt", detail.createdAt);
        if (editorRef.current) {
            editorRef.current.setContent(detail.content ?? "");
        }
    }, [detail, setValue]);

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
      let content = editorRef.current ? editorRef.current.getContent() : "";

        // 저장시 DB에 들어가는 HTML에서 width 제거
        content = content.replace(/<colgroup>[\s\S]*?<\/colgroup>/gi, '');
        content = content.replace(/<table([^>]*?)style="([^"]*?)"([^>]*?)>/gi,
            (match, before, style, after) => {
                const newStyle = style.replace(/width:[^;]*;?/gi, '').trim();
                return newStyle
                    ? `<table${before}style="${newStyle}"${after}>`
                    : `<table${before}${after}>`;
            }
        );
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
        <div className="container mx-auto px-4 py-6">
            {/* 제목 + 버튼 영역 */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    게시판 {isEditMode ? (isEditing ? "수정" : "상세") : "등록"}
                </h1>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/board')}>목록</Button>

                    {isEditMode && !isEditing && (
                        // 상세 모드 버튼
                        <>
                            <Button color="blue" onClick={() => setIsEditing(true)}>수정</Button>
                            <Button color="red" onClick={handleDelete} disabled={deleteMutation.isPending}>삭제</Button>
                        </>
                    )}

                    {isEditing && (
                        // 편집 모드 버튼
                        <>
                            <Button
                                color="blue"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting || saveMutation.isPending}
                            >
                                저장
                            </Button>
                            {isEditMode && (
                                <Button onClick={() => setIsEditing(false)}>취소</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
            <hr className="border-gray-300 mb-6" />

            {/* 제목 / 작성자 입력 */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            className="w-full border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={!isEditing}  // 읽기 모드에서 비활성화
                            {...register("title", { required: "제목을 입력해주세요." })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">작성자(test로 고정)</label>
                        <input
                            type="text"
                            placeholder="작성자"
                            className="w-full border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled
                            value="test"
                            // disabled={!isEditing}  // 읽기 모드에서 비활성화
                            {...register("createdBy", { required: "작성자를 입력해주세요." })}
                        />
                        {errors.createdBy && (
                            <p className="text-red-500 text-sm mt-1">{errors.createdBy.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 에디터 영역 */}
            <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                {isEditing ? (
                    <CommonEditor
                        ref={editorRef}
                        isEditing={isEditing}
                        initialContent={detail?.content}
                        uploadApi={board}
                    />
                ) : (
                    // 읽기 모드 - 에디터 HTML 그대로 출력
                    <div
                        className="p-4 min-h-[500px] prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: detail?.content ?? '' }}
                    />
                )}
            </div>
        </div>
    );
}

export default SaveForm;