import { Link } from "react-router-dom"

export default function RegistrationSuccessful() {
    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <h2 className='text-center'>You've successfully created an account!</h2>
            <p className='text-center mx-auto'>Congratulations! You are one step closer to becoming a WordHaven Wizard. <Link to='/login'>Login Here</Link>
            </p>
        </div>
    )
}