import { Link, useNavigate} from "react-router-dom"
import { ChangeEvent, useState } from "react"

export default function Register() {
    const navigate = useNavigate();
    const [ registerDetails, setRegisterDetails ] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterDetails({
            ...registerDetails,
            [e.target.name]: e.target.value,
        })
    }

    const registerUser = async () => {
        const response = await fetch('http://localhost:8000/register/', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(registerDetails)
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            return navigate('/registration-successful')
        }
    }

    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <h2 className='text-center'>Register for Free</h2>
            <p className='text-center mx-auto' style={{maxWidth: '600px'}}>Sign up to save your favorite definitions.</p>
            <form className='mx-auto' style={{maxWidth: '600px', marginTop: '40px'}}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input onChange={handleInput} name='username' type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={handleInput} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={handleInput} name='password' type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label">Yes, I want to receive fun emails from WordHaven.</label>
                </div>
                <button onClick={(e) => {e.preventDefault(); registerUser()}} type="button" className="btn btn-primary" style={{width: '100%'}}>Sign Up</button>
                <div className='position-relative my-4'>
                    <hr />
                    <div className='position-absolute start-0 end-0' style={{width: '100%', bottom: '0px', top: '-13px'}}>
                        <p className='mx-auto bg-white text-center' style={{width: '40px'}}>or</p>
                    </div>
                </div>
                <Link to='/login' style={{textDecoration: 'none'}}><button type="button" className="btn btn-outline-primary" style={{width: '100%'}}>Log In</button></Link>
                </form>
        </div>
    )
}