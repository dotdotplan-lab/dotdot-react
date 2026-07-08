import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';
import ErrorPage from './shared/pages/ErrorPage.jsx';
import CanvasDetail from "./canvas/pages/CanvasDetail.jsx";
import Board from "./board/pages/Board.jsx";
import About from "./about/About.jsx";
import SaveForm from "./board/pages/SaveForm.jsx";
import Shop from "./shop/Shop.jsx";
import Blog from "./blog/Blog.jsx";
import Canvas from "./canvas/Canvas.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "canvas", element: <Canvas /> },
            { path: "canvases/:id", element: <CanvasDetail /> },
            { path: "board", element: <Board /> },
            // { path: "board/:id", element: <BoardDetail /> },      // 상세보기 (신규)
            { path: "board/save", element: <SaveForm /> },          // 등록
            { path: "board/update/:id", element: <SaveForm /> },      // 수정 (같은 컴포넌트 재사용)
            { path: "shop", element: <Shop /> },
            { path: "blog", element: <Blog /> },
        ],
        errorElement: <ErrorPage />
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </StrictMode>,
);
