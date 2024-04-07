import { useRef, useState } from "react"

const Addnotes = () => {
  const [option, setOption] = useState('')
  const [fileSelected, setFileSelected] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const [selectDisabled, setSelectDisabled] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [topics, setTopics] = useState('')
  const [qualification, setQualification] = useState('')
  const fileRef = useRef(null)


  const handleOptionChange = (e) => {
    if (e.target.value === " ") {
      setInputDisabled(false)
    } else {
      setInputDisabled(true)
      setOption(e.target.value)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubjectChange = (e) => {
    if (e.target.value == "") {
      setSelectDisabled(false)
    } else {
      setSelectDisabled(true)
      setSubject(e.target.value)
    }
  }

  const handleTopicsChange = (e) => {
    setTopics(e.target.value)
  }

  const handleQualificationChange = (e) => {
    setQualification(e.target.value)
  }

  const OpenFiles = () => {
    fileRef.current.click()
  }

  const uploadPdf = (e) => {
    e.preventDefault()
    alert('file uploaded')
  }

  return (
    <form action="">
      <div className="flex xs:justify-center ">
        <div className="px-5 md:px-12 lg:px-20 w-[100%] py-10 bg-pink-300 shadow-inner-2xl xl:flex lg:flex xs:flex xs:flex-col xl:justify-center lg:justify-center sm:justify-center  xl:items-start lg:items-start sm:items-center">
          <div className="left lg:w-[50%] w-[100%] flex flex-col gap-5 items-center">
            <input onChange={handleTitleChange} required className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the title or chapter name" type="text" name="" id="" />
            <select disabled={selectDisabled} className="lg:w-[90%] w-[90%] p-3 rounded-md" onChange={handleOptionChange} name="subjects" id="">
              <option className="" value=" ">Select the subject</option>
              <option value="Design of analysis and algorithm">Design of analysis and algorithm</option>
            </select>
            <p className="text-slate-500">or</p>
            <input disabled={inputDisabled} onChange={handleSubjectChange} className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the Subject name" type="text" name="" id="" />
            <textarea required onChange={handleTopicsChange} className="lg:w-[90%] w-[90%] p-3 rounded-md resize-none" placeholder="Topics involved in your notes" name="topics" id="" cols="30" rows="10"></textarea>
          </div>

          <div className="right lg:w-[50%] w-[100%] flex flex-col gap-5 xl:mt-0 lg:mt-0 mt-5 items-center">
            <input onChange={handleQualificationChange} required className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the Qualification level, Ex: b-tech 2nd year" type="text" name="" id="" />
            <input required onChange={() => setFileSelected(true)} ref={fileRef} type="file" name="pdf-file" id="" accept=".pdf" className="hidden" />
            <button onClick={OpenFiles} className="lg:w-[90%] w-[90%] p-3 rounded-md bg-[#dadada] shadow-xl text-lg font-bold">Upload pdf <i className="fa-solid fa-cloud-arrow-up"></i> </button>
            <p className="">{fileSelected ? "File Uploaded" : ""}</p>

            {/* submit */}
            <button type="submit" onClick={uploadPdf} className="lg:w-[90%] w-[90%] p-3 rounded-md bg-green-500 hover:bg-green-600 duration-150 shadow-xl text-lg font-bold">Submit </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Addnotes