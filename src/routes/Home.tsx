import { FiVolume2 } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function Home(){
    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <div className='container border border-primary rounded p-0' style={{maxWidth: '900px', width: '100%'}}>
                <div className='container-fluid p-2 bg-primary'>
                    <h4 className='m-0 text-white'>Word of the Day</h4>
                </div>
                <div className='container-fluid p-4'>
                    <div className='d-flex align-items-center mb-3'>
                        <h2 className='m-0 fw-bold' style={{fontWeight: '600'}}>hello</h2>
                        <p className='h5 m-0 pl-2'>[ he-loh ]</p>
                        <FiVolume2 className='ml-3' style={{height: '24px', width: '24px'}}/>
                        <AiOutlineStar className='ml-2 mr-3' style={{height: '24px', width: '24px'}}/>
                        <a href='#'>[ View Definition & Etymology ]</a>
                    </div>
                    <p className='mt-3'>Start each day with the Word of the Day in your inbox!</p>
                    <form className="form-inline" style={{width: '100%'}}>
                        <input className="form-control mr-sm-2 flex-grow-1" type="search" placeholder="Email address" aria-label="Search"/>
                        <button className="btn btn-outline-primary my-2 my-sm-0 d-flex align-items-center" style={{height: '38px'}} type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
