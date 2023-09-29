import { FiVolume2 } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setWord } from '../slices/words';

export default function Home(){
    const [ email, setEmail ] = useState('');
    const [ wordOfTheDay, setWordOfTheDay ] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const subscribeUser = async () => {
        const response = await fetch('http://localhost:8000/subscribe/', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            alert("You've successfully subscribed to emails from WordHaven!")
        }
        setEmail('')
    }

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch('http://localhost:8000/word-of-the-day/');
            const data = await response.json()
            setWordOfTheDay(data.word)
        }
        fetchWord()
    }, [])

    const fetchDetails = async () => {
        const response = await fetch(`http://localhost:8000/word/${wordOfTheDay}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        dispatch(setWord(data))
        navigate(`/search/${wordOfTheDay.toLowerCase()}`)
    }

    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <div className='container border border-primary rounded p-0' style={{maxWidth: '900px', width: '100%'}}>
                <div className='container-fluid p-2 bg-primary'>
                    <h4 className='m-0 text-white'>Word of the Day</h4>
                </div>
                <div className='container-fluid p-4'>
                    <div className='d-flex align-items-center mb-3'>
                        <h2 className='m-0 fw-bold' style={{fontWeight: '600'}}>{wordOfTheDay}</h2>
                        <p className='h5 m-0 pl-2'>[ he-loh ]</p>
                        <FiVolume2 className='ml-3' style={{height: '24px', width: '24px'}}/>
                        <AiOutlineStar className='ml-2 mr-3' style={{height: '24px', width: '24px'}}/>
                        <button onClick={(e) => {fetchDetails(); e.preventDefault()}} className='text-primary' style={{background: 'none', border: 'none'}}>[ View Definition & Etymology ]</button>
                    </div>
                    <p className='mt-3'>Start each day with the Word of the Day in your inbox!</p>
                    <form className="form-inline" style={{width: '100%'}}>
                        <input value={email} onChange={handleInput} className="form-control mr-sm-2 flex-grow-1" type="search" placeholder="Email address" aria-label="Search"/>
                        <button onClick={(e) => {e.preventDefault(); subscribeUser()}} className="btn btn-outline-primary my-2 my-sm-0 d-flex align-items-center" style={{height: '38px'}} type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

