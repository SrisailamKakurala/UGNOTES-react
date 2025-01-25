import { useEffect, useState } from "react"
import Pdf from "../Components/Pdf"
import axios from "axios";

const Pdfinfo = () => {

    const [pdfInfo, setPdfInfo] = useState(null);
    useEffect(() => {
        // Retrieve post data from local storage
        const postDataString = localStorage.getItem('pdfInfo');
        if (postDataString) {
            const postData = JSON.parse(postDataString);
            postData.postedDate = postData?.postedDate.split('T')[0]
            setPdfInfo(postData);
            // console.log(postData)
        }
    }, []);

    const handleDownload = async () => {
        try {
            // Step 1: Create Razorpay order
            const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-order`);
            const { order } = orderResponse.data;

            console.log(order)
            const pdfInfo = JSON.parse(localStorage.getItem('pdfInfo'));
            console.log(pdfInfo)
            console.log(pdfInfo._id)
            console.log(window.Razorpay); // Should log the Razorpay function
    
            // Step 2: Open Razorpay payment modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID
                amount: order.amount, // Amount in paise (₹2 = 200 paise)
                currency: order.currency,
                order_id: order.id,
                name: 'Notes4You',
                description: 'PDF Download Payment',
                handler: async (response) => {
                    try {
                        // Step 3: Verify payment and download PDF
                        const verifyResponse = await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/downloadPdf?id=${pdfInfo._id}`,
                            response, // Send payment details to backend for verification
                            { responseType: 'blob' } // Specify responseType as blob for downloading binary data
                        );
    
                        // Step 4: Download the PDF
                        const blob = new Blob([verifyResponse.data], { type: 'application/pdf' });
                        const url = window.URL.createObjectURL(blob);
    
                        // Create a temporary anchor element to trigger the download
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', pdfInfo.chapter); // Use the extracted filename
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link); // Clean up after download
    
                        alert('Payment successful! Downloading PDF...');
                    } catch (err) {
                        console.error('Payment verification or download failed:', err);
                        alert('Payment verification or download failed');
                    }
                },
                prefill: {
                    name: 'User Name', // Prefill user details (optional)
                    email: 'user@example.com',
                    contact: '+919876543210',
                },
                theme: {
                    color: '#F37254', // Customize the modal theme (optional)
                },
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Error creating Razorpay order:', err);
            alert('Payment initialization failed');
        }
    };
    
    

    return (
        <div className="px-5 md:px-12 lg:px-20 h-[87.5vh] w-[100%] shadow-inner-2xl py-10 lg:flex gap-20">
            <div className="left flex flex-col items-center justify-center p-8 shadow-2xl">
                <Pdf post={pdfInfo} />
                <button onClick={handleDownload} className="w-[80vw] lg:w-[25vw] md:w-[40vw] mt-10 cursor-pointer shadow-xl bg-black hover:bg-slate-900 duration-150 text-white py-3 rounded-lg">Download Now</button>
            </div>
            <div className="right p-8 flex flex-col gap-8 text-xl md:text-lg sm:text-md">
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Title: </label>
                    <h1>{pdfInfo?.subject}</h1>
                </div>
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Subject: </label>
                    <h1>{pdfInfo?.chapter}</h1>
                </div>
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Topics: </label>
                    <h1>{pdfInfo?.topics}</h1>
                </div>
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Qualification Level: </label>
                    <h1>{pdfInfo?.qualification}</h1>
                </div>
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Author: </label>
                    <h1>{pdfInfo?.author}</h1>
                </div>
                <div className="flex gap-5 md:gap-8 sm:gap-5 lg:gap-10">
                    <label className="font-bold text-slate-800" htmlFor="">Posted on: </label>
                    <h1>{pdfInfo?.postedDate}</h1>
                </div>
            </div>
        </div>
    )
}

export default Pdfinfo