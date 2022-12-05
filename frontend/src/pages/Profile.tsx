import useUser from '../hooks/useUser';

export default function Profile() {
    const { user } = useUser();
    return (
        <>
            {user.name} ({user.email})
        </>
    );
}
