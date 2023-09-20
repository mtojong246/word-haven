import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <h2 className='text-center'>Register for Free</h2>
            <p className='text-center mx-auto' style={{maxWidth: '600px'}}>Sign up to save your favorite definitions.</p>
            <form className='mx-auto' style={{maxWidth: '600px', marginTop: '40px'}}>
                <div className='mb-3 d-flex justify-content-between align-items-center' style={{gap: '20px'}}>
                    <div style={{width: '100%'}}>
                        <label className="form-label">First name</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div style={{width: '100%'}}>
                        <label className="form-label">Last name</label>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label">Yes, I want to receive fun emails from WordHaven.</label>
                </div>
                <button type="button" className="btn btn-primary" style={{width: '100%'}}>Sign Up</button>
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