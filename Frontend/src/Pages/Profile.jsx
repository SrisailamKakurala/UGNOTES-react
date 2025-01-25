import axios from 'axios';
import Pdf from '../Components/Pdf';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../Context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import WithdrawalSuccess from '../Components/WithdrawalSuccess';

const Profile = () => {
    const { trigger, setTrigger, loadProfile } = useUser();
    const defaultProfile = `${import.meta.env.VITE_BACKEND_URL}/uploads/defaultProfile.png`;
    const fileRef = useRef(null);
    const [userData, setUserData] = useState(null);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        accountNumber: '',
        ifscCode: '',
    });

    useEffect(() => {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserData(userData);
        }
    }, [trigger, loadProfile]);

    const OpenFiles = () => {
        fileRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('profileImg', file);
        formData.append('userId', userData._id);

        try {
            // Send Axios request to upload the image
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profileUpdate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data) {
                // Retrieve userData from local storage
                const userDataString = localStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);

                    // Update the profile field in userData
                    userData.profile = `${response.data}`;

                    // Store the updated userData back into local storage
                    localStorage.setItem('userData', JSON.stringify(userData));

                    // Re-render this page's useEffect and navbar's useEffect which results in profile pic updation
                    setTrigger((prev) => !prev);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error, e.g., show an error message
        }
    };

    const handleWithdraw = async () => {
        try {
            // Validate bank details
            if (!bankDetails.accountNumber || !bankDetails.ifscCode) {
                alert('Please fill in all fields.');
                return;
            }

            // Ensure the user has sufficient balance
            if (userData.amount <= 0) {
                alert('Insufficient balance');
                return;
            }

            // Simulate a withdrawal (no actual API call)
            setWithdrawalSuccess(true); // Show success animation
            setTimeout(() => {
                setWithdrawalSuccess(false); // Hide success animation after 2 seconds
                setShowWithdrawForm(false); // Close the pop-up form
                userData.amount = 0; // Set balance to 0 after withdrawal
                setBankDetails({ accountNumber: '', ifscCode: '' }); // Clear the form
                setTrigger((prev) => !prev); // Re-render the component
            }, 2000); // 2-second delay
        } catch (err) {
            console.error('Withdrawal error:', err);
            alert('Withdrawal failed');
        }
    };

    return (
        <div className="px-5 md:px-12 lg:px-20 h-[87.5vh] w-[100%] py-10 shadow-inner-2xl flex flex-col">
            <div className="top lg:grid lg:grid-cols-3 lg:justify-start gap-2 w-[100%]">
                <div className="flex justify-around col-span-2 items-center w-[60] text-sm md:text-lg lg:text-xl">
                    {/* profileImg */}
                    <div className="left flex justify-start lg:justify-center xl:justify-center items-center relative">
                        <img
                            className="w-28 h-28 rounded-full lg:w-40 md:w-32 sm:w-28 lg:h-40 md:h-32 sm:h-28"
                            src={userData?.profile || defaultProfile}
                            alt=""
                        />
                        <input
                            ref={fileRef}
                            type="file"
                            hidden
                            name="profileImg"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {/* edit icon */}
                        <div
                            onClick={OpenFiles}
                            className="cursor-pointer absolute bottom-3 right-2 rounded-full w-6 h-6 flex justify-center items-center bg-slate-900"
                        >
                            <i className="fa-solid fa-pen fa-xs text-white"></i>
                        </div>
                    </div>
                    {/* userInfo */}
                    <div className="mid flex flex-col gap-5">
                        <div className="username flex gap-5">
                            <label className="text-slate-700 text-wrap" htmlFor="">
                                Username:{' '}
                            </label>
                            <h3 className="font-medium">{userData && userData.username}</h3>
                        </div>
                        <div className="postCount flex gap-5">
                            <label className="text-slate-700" htmlFor="">
                                Pdf's uploaded:{' '}
                            </label>
                            <h3 className="font-medium">
                                {userData && userData.posts && userData.posts.length > 0 ? userData.posts.length : 0}
                            </h3>
                        </div>
                        <div className="downloadCount flex gap-5">
                            <label className="text-slate-700" htmlFor="">
                                Downloads:{' '}
                            </label>
                            <h3 className="font-medium">{userData && userData.downloads}</h3>
                        </div>
                    </div>
                </div>

                <div className="right bg-white flex flex-col justify-center items-center gap-8 xl:mt-0 lg:mt-0 xs:mt-[20px] mt-10">
                    <p className="text-slate-800 font-semibold">Amount ready to withdraw</p>
                    <strong className="text-4xl font-extrabold">₹ {userData?.amount || 0}</strong>
                    <button
                        onClick={() => setShowWithdrawForm(true)}
                        className="py-3 px-12 text-lg rounded-lg font-bold bg-pink-300 hover:bg-pink-400 duration-150"
                    >
                        Withdraw Now
                    </button>
                </div>
            </div>

            {/* Withdrawal Success Animation */}
            <AnimatePresence>
                {withdrawalSuccess && <WithdrawalSuccess />}
            </AnimatePresence>

            {/* Withdrawal Pop-Up Form */}
            <AnimatePresence>
                {showWithdrawForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="bg-white p-6 rounded-lg shadow-lg w-96"
                        >
                            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
                            <input
                                type="text"
                                placeholder="Bank Account Number"
                                value={bankDetails.accountNumber}
                                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="text"
                                placeholder="IFSC Code"
                                value={bankDetails.ifscCode}
                                onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowWithdrawForm(false)}
                                    className="py-2 px-4 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 duration-150"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleWithdraw}
                                    className="py-2 px-4 text-sm rounded-lg font-bold bg-pink-300 hover:bg-pink-400 duration-150"
                                >
                                    Confirm Withdrawal
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <hr className="h-1 mt-10 shadow-lg" />

            <div className="mx-auto font-bold my-5">
                <h1>Your Uploads</h1>
                <hr className="h-1 bg-pink-300" />
            </div>

            <div
                name="pdf-container"
                className="w-[100%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-items-center bg-white pb-8"
            >
                {userData && userData.posts && userData.posts.length > 0 ? (
                    userData.posts
                        .slice()
                        .reverse()
                        .map((post, index) => <Pdf key={index} post={post} />)
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Profile;