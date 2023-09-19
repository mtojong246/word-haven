import { FiSearch } from 'react-icons/fi'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setWord } from '../slices/words';

export default function Navbar() {
    const [ search, setSearch ] = useState('');
    const dispatch = useDispatch();
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

    return (
    <>
        <div className='container-fluid position-relative py-3 px-4 d-flex justify-content-between align-items-center bg-light'>
            <div className='container-fluid position-absolute p-3' style={{maxWidth: '500px', width: '100%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <form className="form-inline">
                    <input onChange={(e) => setSearch(e.target.value)} className="form-control mr-sm-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button onClick={(e) => {fetchWord(); e.preventDefault()}} className="btn btn-outline-primary my-2 my-sm-0 d-flex align-items-center" style={{height: '38px'}}><FiSearch /></button>
                </form>
            </div>
            <Link to='/' style={{textDecoration: 'none'}}><p className='h2 text-dark mb-0'>Word<span className='text-primary'>Haven</span></p></Link>
            <div className='d-flex'>
                <p className='mb-0 h6 text-dark mr-4'>Register</p>
                <p className='mb-0 h6 text-dark'>Login</p>
            </div>
        </div>
        <Outlet />
    </>
    )
}