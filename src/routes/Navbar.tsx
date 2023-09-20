import { FiSearch } from 'react-icons/fi'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setWord } from '../slices/words';
import { selectUser } from '../selectors/user.selector';
import { logout } from '../slices/login';


export default function Navbar() {
    const [ search, setSearch ] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const navigate = useNavigate();

    const fetchWord = async () => {
        const response = await fetch(`http://localhost:8000/word/${search}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        dispatch(setWord(data))
        navigate(`/search/${search.toLowerCase()}`)
    }

    const logOut = async() => {
        await fetch('http://localhost:8000/logout/')
        dispatch(logout())
        alert("You've been logged out successfully")
        navigate('/')
    }

    console.log(user)

    return (
    <>
        <div className='container-fluid position-relative py-3 px-0 d-flex justify-content-between align-items-center bg-light'>
            <div className='container-fluid position-absolute z-0 py-3 top-0 bottom-0 start-0 end-0' style={{paddingLeft: '220px', paddingRight: '220px'}}>
                <form className="form-inline mx-auto" style={{maxWidth: '500px', width: '100%'}}>
                    <input onChange={(e) => setSearch(e.target.value)} className="form-control mr-sm-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button onClick={(e) => {fetchWord(); e.preventDefault()}} className="btn btn-outline-primary my-2 my-sm-0 d-flex align-items-center" style={{height: '38px'}}><FiSearch /></button>
                </form>
            </div>
            <Link to='/' style={{textDecoration: 'none'}}><p className='pl-3 h2 text-dark mb-0 position-relative z-1'>Word<span className='text-primary'>Haven</span></p></Link>
            <div className='d-flex position-relative z-1 pr-3'>
                {user ? (
                    <button onClick={(e) => {e.preventDefault(); logOut()}} style={{background: 'none', border: 'none'}}><p className='mb-0 h6 text-dark mr-2'>Logout</p></button>
                ) : (
                    <>
                        <Link to='/register' style={{textDecoration: 'none'}}><p className='mb-0 h6 text-dark mr-4'>Register</p></Link>
                        <Link to='/login' style={{textDecoration: 'none'}}><p className='mb-0 h6 text-dark mr-2'>Login</p></Link>
                    </>
                )}
                
            </div>
        </div>
        <Outlet />
    </>
    )
}