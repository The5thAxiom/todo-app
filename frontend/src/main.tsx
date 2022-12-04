import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import './index.css';

import App from './App';
import pages from './pages';
import Task from './pages/Task';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<App />}>
                    {pages.map(({ href, element }) => (
                        <Route key={href} path={href} element={element} />
                    ))}
                    <Route path='/task' element={<Outlet />}>
                        <Route path='/task/:id' element={<Task />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

