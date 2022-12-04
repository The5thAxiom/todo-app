import { useEffect, useState } from 'react';

export default function App() {
    const [msg, setMsg] = useState<string>();
    useEffect(() => {
        const apiTest = async () => {
            const res = await fetch('/api/test');
            const data = await res.json();
            setMsg(data.msg);
        };
        apiTest();
    }, []);

    return (
        <>
            <div>
                hello, everyone!!!
                <br />
                this is the home page
            </div>
            <div>{msg ? <>/api/test : {msg}</> : <>loading...</>}</div>
        </>
    );
}

