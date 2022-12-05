import { NavLink } from 'react-router-dom';

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
    return (
        <nav>
            {navLinks.map(({ href, name }) => (
                <NavLink key={name} className='underline' to={href}>
                    {name}
                </NavLink>
            ))}
        </nav>
    );
}
export default Navbar;
