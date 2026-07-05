import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import Calendar from './shared/pages/Calendar.jsx';
import Contact from './shared/pages/Contact.jsx';
import App from './App.jsx';
import Home from './shared/pages/Home.jsx';
import ErrorPage from './shared/pages/ErrorPage.jsx';
import CanvasDetail from "./shared/pages/CanvasDetail.jsx";
import Board from "./board/pages/Board.jsx";
import About from "./shared/pages/About.jsx";
import SaveForm from "./board/pages/SaveForm.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "calendar", element: <Calendar /> },
            { path: "contact", element: <Contact /> },
            { path: "canvases/:id", element: <CanvasDetail /> },
            { path: "board", element: <Board /> },
            { path: "save-form", element: <SaveForm /> },
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
