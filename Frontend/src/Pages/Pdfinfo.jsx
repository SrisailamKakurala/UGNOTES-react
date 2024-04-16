import { useEffect, useState } from "react"
import Pdf from "../Components/Pdf"

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

    return (
        <div className="px-5 md:px-12 lg:px-20 h-[87.5vh] w-[100%] shadow-inner-2xl py-10 lg:flex gap-20">
            <div className="left flex flex-col items-center justify-center p-8 shadow-2xl">
                <Pdf post={pdfInfo}/>
                <button className="w-[80vw] lg:w-[25vw] md:w-[40vw] mt-10 cursor-pointer shadow-xl bg-black hover:bg-slate-900 duration-150 text-white py-3 rounded-lg">Download Now</button>
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