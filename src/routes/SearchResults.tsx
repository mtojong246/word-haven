import { FiVolume2 } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { selectWord } from '../selectors/word.selector'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { selectUser } from '../selectors/user.selector'

export default function SearchResults() {
    const word = useSelector(selectWord)
    const term = useParams();
    const [ isFavorited, setIsFavorited ] = useState(false);
    const user = useSelector(selectUser)

    useEffect(() => {
        const getWord = async () => {
            const response = await fetch(`http://localhost:8000/favorites/${user?.username}/`);
            const data = await response.json();
            const word = data.find((d:any) => d.word === term.word)

            if (word) {
                setIsFavorited(true)
            } else {
                setIsFavorited(false)
            }
            
        }
        getWord()
    }, [user?.username, term])


    const addToFavorites = async (e:any) => {
        e.preventDefault();
        if (!isFavorited) {
            try {
                const response = await fetch(`http://localhost:8000/favorites/${user?.username}/`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        word: term.word,
                        meanings: JSON.stringify(word.meanings),
                        origin: JSON.stringify(word.origin),
                    })
                })
                await response.json();
                setIsFavorited(true)
            } catch (error:any) {
                alert('Sorry, there was an error adding word to favorites')
            }
            
        }
    }

    const deleteFromFavorites = async (e:any) => {
        e.preventDefault()
        if (isFavorited) {
            try {
                const response = await fetch(`http://localhost:8000/favorites/${user?.username}/`, {
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        word: term.word,
                    })
                })
                await response.json();
                setIsFavorited(false)
            } catch (error:any) {
                alert('Sorry, there was an error deleting word from favorites')
            }
        }
    }



    return (
        <>
        {word && (
            <div className='container-fluid' style={{padding: '40px'}}>
                <div className='container border border-primary rounded p-0' style={{maxWidth: '900px', width: '100%'}}>
                    <div className='container-fluid p-4'>
                        <div className='d-flex align-items-center mb-3 border-bottom pb-4'>
                            <h2 className='m-0 fw-bold' style={{fontWeight: '600'}}>{term.word}</h2>
                            <p className='h5 m-0 pl-2'>[ he-loh ]</p>
                            <FiVolume2 className='ml-3' style={{height: '24px', width: '24px'}}/>
                            {isFavorited ? <AiFillStar onClick={deleteFromFavorites} className='ml-2 mr-3' style={{height: '24px', width: '24px', cursor: 'pointer', color: '#007BFF'}}/> : <AiOutlineStar onClick={addToFavorites} className='ml-2 mr-3' style={{height: '24px', width: '24px', cursor: 'pointer', color: '#007BFF'}}/>}
                            
                        </div>
                        {word.meanings.map((meaning:any) => (
                        <div className='pt-2'>
                            <em style={{fontWeight: '500'}}>{meaning.partOfSpeech}</em>
                            <ol className='mt-2' style={{paddingLeft: '40px'}}>
                            {meaning.definitions.map((def:any, i:number) => (
                                <li className={`${i === meaning.definitions.length-1 ? 'mb-0' : 'mb-2'}`}>{def.definition}</li>
                            ))}
                            </ol>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='container border border-primary rounded p-0 mt-4' style={{maxWidth: '900px', width: '100%'}}>
                    <div className='container-fluid p-4'>
                        <h5 className='mb-4'>Origin of <span style={{fontWeight: '700'}}>{term.word}</span></h5>
                        {word.origin.map((o:any, i:number) => (
                            <p className={`${i === word.origin.length-1 ? 'mb-0' : 'mb-4'}`}>{o}</p>
                        ))}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}