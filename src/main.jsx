import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import CanvasDetail from "./contents/canvas/pages/CanvasDetail.jsx";
import Board from "./contents/board/pages/Board.jsx";
import About from "./contents/about/About.jsx";
import SaveForm from "./contents/board/pages/SaveForm.jsx";
import Shop from "./contents/shop/Shop.jsx";
import Blog from "./contents/blog/Blog.jsx";
import Canvas from "./contents/canvas/Canvas.jsx";

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
            { path: "board/:id", element: <SaveForm /> },      // 상세보기
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
