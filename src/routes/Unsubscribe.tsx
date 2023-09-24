import { useParams } from "react-router-dom"
import { useEffect } from "react";

export default function Unsubscribe() {
    const { email } = useParams();

    useEffect(() => {
        const unsubscribe = async () => {
            fetch(`http://localhost:8000/unsubscribe/${email}/`)
        }
        unsubscribe();
    }, [email])

    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <p>You've successfully unsubscribed from WordHaven.</p>
        </div>
    )
}