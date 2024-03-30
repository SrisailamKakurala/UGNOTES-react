import { Link } from 'react-router-dom'
import defaultImg from '../assets/defaultImg.jpg'

const Pdf = () => {
    return (
        <>
            <div className="pdf rounded-lg w-[80vw] lg:w-[25vw] md:w-[40vw] mt-10 cursor-pointer shadow-xl">
                <div className="preview overflow-hidden h-[65%] w-full bg-white">
                    <img src={defaultImg} className='h-[100%] w-[100%]' alt="" />
                </div>
                <div className="h-[35%] bg-black px-4 py-3 text-md text-white">
                    <p className="h-[60%] truncate overflow-hidden">Design of analysis and algorithm Design of analysis and algorithm Design of analysis and algorithm Design of analysis and algorithm Design of analysis and algorithm Design of analysis and algorithm</p>
                    <div className="pdf-likes flex items-center justify-between">
                        <div className="">
                            <i className="fa-solid fa-heart fa-xl text-pink-500"></i>
                            <span className='ml-2 '>12</span>
                        </div>
                        <button className="py-1 px-3 rounded bg-pink-500 duration-150 hover:bg-pink-600"><Link to={'/pdfInfo'}>See Details</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pdf