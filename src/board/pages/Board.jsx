import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import Button from "../../shared/layouts/Button.jsx";
import { formatDate } from '../../shared/utils/formatDate.js';
import { getBoardList } from '../../shared/apis/boardApi.js';

const Board = () => {
    const navigate = useNavigate();

    const { data: lists = [], isLoading, isError } = useQuery({
        queryKey: ['boardList'],
        queryFn: getBoardList,
    });

    if (isLoading) return <div className="p-8 text-center text-gray-400">불러오는 중...</div>;
    if (isError) return <div className="p-8 text-center text-red-400">목록을 불러오지 못했습니다.</div>;

    return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">게시판</h1>
          <Button  color="blue" onClick={() => navigate('/save-form')}>
              등록
          </Button>
      </div>
        <hr className="border-gray-300 mb-6" />

        {/* 게시글 리스트 */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                    <th className="px-4 py-3 w-16">번호</th>
                    <th className="px-4 py-3">제목</th>
                    <th className="px-4 py-3 w-32">작성자</th>
                    <th className="px-4 py-3 w-75">작성일</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {lists.length > 0 ? (lists.map((list) => (
                    <tr
                        key={list.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/board/${list.id}`)}
                    >
                        <td className="px-4 py-3 text-gray-500">{list.id}</td>
                        <td className="px-4 py-3 text-gray-800">{list.title}</td>
                        <td className="px-4 py-3 text-gray-500">{list.createdBy}</td>
                        <td className="px-4 py-3 text-gray-500">{formatDate(list.createdAt)}</td>
                    </tr>
                )) )
                    : (
                    <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                            등록된 게시글이 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Board;