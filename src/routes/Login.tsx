import { Link } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../slices/login"

export default function Login() {
    const dispatch = useDispatch();
    const [ credentials, setCredentials ] = useState({
        'username': '',
        'password:': '',
        'remember_me': false,
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            remember_me: e.target.checked,
        })
    }

    const fetchUser = async () => {
        const response = await fetch('http://localhost:8000/login/', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            dispatch(login(data))

        }
    }

    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <h2 className='text-center'>Welcome Back</h2>
            <p className='text-center mx-auto' style={{maxWidth: '600px'}}>Sign in to access your word lists and manage your subscription.</p>
            <form className='mx-auto' style={{maxWidth: '600px', marginTop: '40px'}}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input onChange={handleInput} name='username' type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={handleInput} name='password' type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className="form-check">
                        <input onChange={handleCheck} type="checkbox" checked={credentials.remember_me ? true : false} className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label">Remember me</label>
                    </div>
                    <a href='#'>Forgot password?</a>
                </div>
                <button type="button" onClick={(e) => {fetchUser(); e.preventDefault()}} className="btn btn-primary" style={{width: '100%'}}>Log in</button>
                <div className='position-relative my-4'>
                    <hr />
                    <div className='position-absolute start-0 end-0' style={{width: '100%', bottom: '0px', top: '-13px'}}>
                        <p className='mx-auto bg-white text-center' style={{width: '40px'}}>or</p>
                    </div>
                </div>
                <Link to='/register' style={{textDecoration: 'none'}}><button type="button" className="btn btn-outline-primary" style={{width: '100%'}}>Register</button></Link>
                </form>
        </div>
    )
}