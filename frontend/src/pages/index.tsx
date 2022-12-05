import Profile from './Profile';
import Home from './Home';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';

export type Page = {
    href: string;
    element: JSX.Element;
    name: string;
    secure: boolean;
};
const pages: Page[] = [
    { name: 'Home', href: '/', element: <Home />, secure: false },
    {
        name: 'Profile',
        href: '/profile',
        element: <Profile />,
        secure: true
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        element: <Dashboard />,
        secure: true
    },
    { name: 'Signup', href: '/signup', element: <Signup />, secure: false },
    { name: 'Login', href: '/login', element: <Login />, secure: false }
];

export default pages;
