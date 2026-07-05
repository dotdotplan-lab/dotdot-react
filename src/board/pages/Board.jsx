import TinyMCEExample from "../../sample/TinyMCEExample.jsx";
// import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import Button from "../../shared/layouts/Button.jsx";

// 임시 더미 데이터 (실제 데이터 연동 전까지)
const dummyPosts = [
    { id: 3, title: "게시판 오픈했습니다", author: "관리자", date: "2026-07-05" },
    { id: 2, title: "공지사항 확인해주세요", author: "관리자", date: "2026-07-03" },
    { id: 1, title: "첫 번째 글입니다", author: "홍길동", date: "2026-07-01" },
];

export default function Board() {
    const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">게시판</h1>
          <Button onClick={() => navigate('/save-form')}>
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
                    <th className="px-4 py-3 w-32">작성일</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {dummyPosts.length > 0 ? (
                    dummyPosts.map((post) => (
                        <tr
                            key={post.id}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => navigate(`/board/${post.id}`)}
                        >
                            <td className="px-4 py-3 text-gray-500">{post.id}</td>
                            <td className="px-4 py-3 text-gray-800">{post.title}</td>
                            <td className="px-4 py-3 text-gray-500">{post.author}</td>
                            <td className="px-4 py-3 text-gray-500">{post.date}</td>
                        </tr>
                    ))
                ) : (
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
}