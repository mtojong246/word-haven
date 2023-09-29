import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../selectors/user.selector"
import { useState, useEffect } from "react"
import { FiVolume2 } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
import { setWord } from "../slices/words"
import Empty from '../assets/empty.png';

export default function Dashboard() {
    const user = useSelector(selectUser);
    const [ favorites, setFavorites ] = useState([]);
    const [ word, setSelectedWord ] = useState('');
    const [ isSubscribed, setIsSubscribed ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getWords = async () => {
            const response = await fetch(`http://localhost:8000/favorites/${user?.username}/`);
            const data = await response.json();
            setFavorites(data.map((d:any) => ({
                ...d,
                meanings: JSON.parse(d.meanings),
                origin: JSON.parse(d.origin)
            })))
        }
        getWords()
    }, [user?.username])

    useEffect(() => {
        const getEmails = async () => {
            const response = await fetch('http://localhost:8000/emails/');
            const data = await response.json();
            if (data.includes(user?.email)) {
                setIsSubscribed(true)
            } else {
                setIsSubscribed(false)
            }
            
        }
        getEmails()
    }, [user?.email])

    const deleteFromFavorites = async (e:any) => {
        e.preventDefault()
            try {
                const response = await fetch(`http://localhost:8000/favorites/${user?.username}/`, {
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        word: word,
                    })
                })
                setFavorites(favorites.filter((fav:any) => fav.word !== word))
                await response.json();
            } catch (error:any) {
                alert('Sorry, there was an error deleting word from favorites')
            }
    }

    const fetchDetails = async (word:string) => {
        const response = await fetch(`http://localhost:8000/word/${word}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        dispatch(setWord(data))
        navigate(`/search/${word}`)
    }

    const unsubscribe = async () => {
        await fetch(`http://localhost:8000/unsubscribe/${user?.email}/`);
        setIsSubscribed(false)
    }

    const subscribeUser = async () => {
        const response = await fetch('http://localhost:8000/subscribe/', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email: user?.email})
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            alert("You've successfully subscribed to emails from WordHaven!");
            setIsSubscribed(true)
        }
    }

    return (
        <>
        <div className='container-fluid' style={{padding: '40px'}}>
            <div className='container-fluid mx-auto d-flex' style={{maxWidth: '900px', gap: '40px'}}>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-favorites-tab" data-toggle="pill" href="#v-pills-favorites" role="tab" aria-controls="v-pills-favorites" aria-selected="false">Favorites</a>
                    <a className="nav-link" id="v-pills-subscriptions-tab" data-toggle="pill" href="#v-pills-subscriptions" role="tab" aria-controls="v-pills-subscriptions" aria-selected="false">Subscriptions</a>
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                </div>
                <div className="tab-content flex-grow-1" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h3>Welcome to your dashboard!</h3>
                        <p>Here you can view your saved words, manage your subscriptions, and make changes to your profile.</p>
                    </div>
                    <div className="tab-pane fade" id="v-pills-favorites" role="tabpanel" aria-labelledby="v-pills-favorites-tab">
                    {favorites.length ? (
                        <div className='d-flex flex-column' style={{gap: '40px'}}>
                        {favorites.map((favorite: {
                            word: string,
                            meanings: {
                                partOfSpeech: string,
                                definitions: []
                            }[],
                            origin: [],
                        }) => (
                            <>
                            <div className='container border border-primary rounded p-0' style={{width: '100%'}}>
                                <div className='container-fluid p-4'>
                                    <div className='d-flex align-items-center mb-3 border-bottom pb-4'>
                                        <h2 className='m-0 fw-bold' style={{fontWeight: '600'}}>{favorite.word}</h2>
                                        <p className='h5 m-0 pl-2'>[ he-loh ]</p>   
                                        <FiVolume2 className='ml-3' style={{height: '24px', width: '24px'}}/>   
                                        <AiFillStar onClick={() => setSelectedWord(favorite.word)} data-toggle="modal" data-target="#exampleModal" className='ml-2 mr-3' style={{height: '24px', width: '24px', cursor: 'pointer', color: '#007BFF'}}/>  
                                        <button onClick={(e) => {fetchDetails(favorite.word); e.preventDefault()}} className='text-primary' style={{background: 'none', border: 'none', cursor: 'pointer'}}>[ View More Definitions & Etymology ]</button>                                
                                    </div>
                                    <div className='pt-2'>
                                        <em style={{fontWeight: '500'}}>{favorite.meanings[0].partOfSpeech}</em>
                                        <ol className='mt-2' style={{paddingLeft: '40px'}}>
                                        {favorite.meanings[0].definitions.map((def:any, i:number) => (
                                            <li className={`${i === favorite.meanings[0].definitions.length-1 ? 'mb-0' : 'mb-2'}`}>{def.definition}</li>
                                        ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            </>
                        ))}
                        </div>
                    ) : (
                        <div className='container-fluid text-center'>
                            <h3 className='mb-4'>Your favorites list is empty.</h3>
                            <img src={Empty} alt='empty-icon'/>
                        </div>
                    )}

                    </div>
                    <div className="tab-pane fade" id="v-pills-subscriptions" role="tabpanel" aria-labelledby="v-pills-subscriptions-tab">
                    {isSubscribed ? (
                        <>
                            <h4>You're subscribed to WordHaven's email alerts!</h4>
                            <button data-toggle="modal" data-target="#exampleModal2" type="button" className="btn btn-outline-danger mt-2">Unsubscribe me</button>
                        </>
                    ) : (
                        <>
                            <h4>It looks like you're not subscribed to our daily "Word of the Day" emails. Would you like to?</h4>
                            <button onClick={subscribeUser} type="button" className="btn btn-outline-primary mt-2">Subscribe me!</button>
                        </>
                    )}
                    </div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete "{word}"</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure you want to delete this word from your favorites list? It cannot be undone.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button onClick={deleteFromFavorites} type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                </div>
                </div>
            </div>
        </div>     

        <div className="modal fade" id="exampleModal2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Unsubscribe</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure you want to unsubscribe from WordHaven's email alerts? You can always resubscribe.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button onClick={unsubscribe} type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                </div>
                </div>
            </div>
        </div>            


        </>
    )
}