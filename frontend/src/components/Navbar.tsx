import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import useUser from '../hooks/useUser';

const navLinks: {
    href: string;
    name: string;
}[] = [
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Signup', href: '/signup' },
    { name: 'Login', href: '/login' }
];

function Navbar() {
    const { removeToken } = useToken();
    const { unsetUser } = useUser();
    const navigate = useNavigate();

    const logout = () => {
        if (confirm('Logging you out')) {
            removeToken();
            unsetUser();
            navigate('/login');
        }
    };

    return (
        <nav>
            {navLinks.map(({ href, name }) => (
                <NavLink key={name} className='underline' to={href}>
                    {name}
                </NavLink>
            ))}
            <span onClick={logout} className='underline'>
                Logout
            </span>
        </nav>
    );
}
export default Navbar;
