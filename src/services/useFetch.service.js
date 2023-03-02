import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UseFetch = (url) => {
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const handleGoogle = async (response) => {
        setLoad(true);
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                setLoad(false);
                console.log(res)
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data?.user));
                    navigate('/dashboard')
                    window.location.reload();
                }
                console.log(data)
                /*throw new Error(data?.message || data);*/
            })
            .catch((error) => {
                setErr(error?.message);
            });
    };

    return { handleGoogle, err, load }
}

export default UseFetch