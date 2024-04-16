import { Link } from 'react-router-dom';
import defaultImg from '../assets/defaultImg.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext';


const Pdf = ({ post }) => {
    const { setLoadProfile } = useUser();
    const [pdfDetails, setPdfDetails] = useState(null);
    const [userID, setUserId] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // console.log(post)
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserId(userData._id)
        }
        fetchPdfDetails();
    }, [count]);

    const fetchPdfDetails = async () => {
        try {
            // Fetch PDF details using the post ID or any other identifier
            if (post) {
                const response = await axios.get(`http://localhost:3000/pdfDetails/${post}`);
                setPdfDetails(response.data);
                // console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching PDF details:', error);
        }
    };

    const handleSeeDetails = () => {
        if (pdfDetails) {
            localStorage.setItem('pdfInfo', JSON.stringify(pdfDetails));
        }
    };

    const handleLike = async () => {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            try {
                const res = await axios.post('http://localhost:3000/likePdf', {
                    userId: userData._id,
                    postId: post
                });
                // Update the count in the state
                setCount(prevcount => prevcount + 1);

            } catch (error) {
                console.error('Error updating like status:', error);
            }
        }
    };

    const handleDelete = async () => {
        // Prompt the user for confirmation
        const confirmed = window.confirm('Are you sure you want to delete this PDF?');
        
        if (!confirmed) {
            return; // Exit function if user cancels
        }
    
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            try {
                const res = await axios.post('http://localhost:3000/deletePdf', {
                    userId: userData._id,
                    postId: post
                });
                if (res.data.user)
                    localStorage.setItem('userData', JSON.stringify(res.data.user))
                setLoadProfile(true)
            } catch (error) {
                console.error('Error updating delete status:', error);
            }
        }
    }
    


    return (
        <>
            <div className="pdf rounded-lg w-[80vw] lg:w-[25vw] md:w-[40vw] mt-10 cursor-pointer shadow-xl">
                <div className="preview overflow-hidden h-[65%] w-full bg-white">
                    {/* Render PDF image */}
                    <img src={defaultImg} className='h-[100%] w-[100%]' alt="" />
                </div>
                <div className="h-[35%] bg-black xl:px-4 lg:px-4 sm:px-3 px-2 py-3 text-md text-white">
                    {/* Render PDF title */}
                    <p className="h-[60%] truncate overflow-hidden">{pdfDetails?.chapter || post?.chapter || 'Loading...'}</p>
                    <div className="pdf-likes flex items-center justify-between">
                        <div className="">
                            {/* Render likes count */}
                            <i onClick={handleLike} className="hover:scale-[1.02] fa-solid fa-heart fa-xl text-pink-500"></i>
                            <span className='ml-2 '>{pdfDetails?.likes?.length || post?.likes?.length || 0}</span>
                        </div>
                        {/* Render bin */}
                        {
                            userID == (pdfDetails?.authorId || post?.authorId) ?
                                <div className="">
                                    <i onClick={handleDelete} className="hover:scale-[1.02] fa-regular fa-trash-can fa-lg ml-5"></i>
                                </div>
                                :
                                null
                        }

                        <button onClick={handleSeeDetails} className="py-1 px-3 rounded bg-pink-500 duration-150 hover:bg-pink-600">
                            {/* Link to PDF details page */}
                            <Link to={`/pdfInfo`}>See Details</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pdf;
