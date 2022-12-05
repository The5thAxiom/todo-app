import useNotifications from '../hooks/useNotifications';

function Notifications() {
    const { notifications } = useNotifications();
    return (
        <div>
            {notifications.map(({ title, contents, type }) => (
                <div>
                    {title}({type}): {contents}
                </div>
            ))}
        </div>
    );
}

export default Notifications;
