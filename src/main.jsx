import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import Calendar from './canvas/pages/Calendar.jsx';
import Contact from './shared/pages/Contact.jsx';
import App from './App.jsx';
import Home from './Home.jsx';
import ErrorPage from './shared/pages/ErrorPage.jsx';
import CanvasDetail from "./canvas/pages/CanvasDetail.jsx";
import Board from "./board/pages/Board.jsx";
import About from "./shared/pages/About.jsx";
import SaveForm from "./board/pages/SaveForm.jsx";
import Shop from "./shop/pages/Shop.jsx";
import Blog from "./blog/pages/Blog.jsx";
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
            // { path: "calendar", element: <Calendar /> },
            // { path: "contact", element: <Contact /> },
            { path: "canvases/:id", element: <CanvasDetail /> },
            { path: "board", element: <Board /> },
            { path: "save-form", element: <SaveForm /> },
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
