import Profile from './Profile';
import Home from './Home';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';

export type Page = {
    href: string;
    element: JSX.Element;
    name: string;
};
const pages: Page[] = [
    { name: 'Home', href: '/', element: <Home /> },
    { name: 'Profile', href: '/profile', element: <Profile /> },
    { name: 'Dashboard', href: '/dashboard', element: <Dashboard /> },
    { name: 'Signup', href: '/signup', element: <Signup /> },
    { name: 'Login', href: '/login', element: <Login /> }
];

export default pages;
