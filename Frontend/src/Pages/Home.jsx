import { useState } from "react"
import Navbar from "../Components/Navbar"
import Pdf from "../Components/Pdf"

const Home = () => {
  const [option, setOption] = useState('')

  const handleOptionChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <div className="overflow-hidden">
      <div className="px-5 md:px-12 lg:px-20 h-[87.5vh] w-[100%] bg-pink-300 shadow-inner-2xl flex justify-center items-center ">
        <div className="flex flex-col gap-5 justify-center items-center">
          <select className="font-bold rounded-xl text-lg px-6 py-4 w-[90vw] md:w-[70vw] lg:w-[90vw]" onChange={handleOptionChange} name="subjects" id="">
            <option className="" value="">Select the subject</option>
            <option value="Design of analysis and algorithm">Design of analysis and algorithm</option>
          </select>
          <h1 className="text-slate-600 text-lg font-bold">or</h1>
          <input type="text" className="font-bold rounded-xl text-lg px-6 py-3 w-[90vw] md:w-[70vw] lg:w-[90vw]" placeholder="Search the chapter" />
          <button className="rounded-lg duration-150 text-lg w-40 px-6 py-3 bg-black hover:bg-slate-900 text-white">Search</button>
        </div>
      </div>
      <div name='pdf-container' className="w-[100vw] px-5 md:px-12 lg:px-20 py-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-items-center bg-white">
        <Pdf />
        <Pdf />
        <Pdf />
        <Pdf />
        <Pdf />
      </div>
    </div>
  )
}

export default Home