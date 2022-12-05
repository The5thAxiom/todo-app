import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import MainTask from './components/MainTask';

export default function App() {
    return (
        <>
            <Navbar />
            <Notifications />
            <MainTask />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

