import { useEffect, useRef, useState } from "react"
import axios from 'axios';
import { useUser } from "../Context/UserContext";

const Addnotes = () => {
  const { loadHome, setLoadHome } = useUser()
  const [trigger, setTrigger] = useState()
  const [fileSelected, setFileSelected] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const [selectDisabled, setSelectDisabled] = useState(false)
  const [showUploadAlert, setShowUploadAlert] = useState(false);

  const [title, setTitle] = useState()
  const [option, setOption] = useState()
  const [subject, setSubject] = useState()
  const [topics, setTopics] = useState()
  const [qualification, setQualification] = useState()
  const [filename, setFilename] = useState()
  const [allSubjects, setAllSubjects] = useState([]);

  const fileRef = useRef(null)
  const formRef = useRef(null);

  const postData = {
    title: title,
    subject: subject || option,
    topics: topics,
    qualification: qualification,
    pdf: filename,
  }


  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/getSubjects')
        setAllSubjects(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    loadSubjects()
    async function getUserData() {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const res = await axios.get(`http://localhost:3000/getuser/${userData._id}`)
      localStorage.setItem('userData', JSON.stringify(res.data));
    }
    getUserData()
  }, [trigger])


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

  const OpenFiles = (e) => {
    fileRef.current.click();
  }


  const uploadPdf = async (e) => {
    e.preventDefault();
    try {
      if (title || (option || subject) || topics || qualification || filename) {
        const formData = new FormData();
        formData.append('pdf-file', fileRef.current.files[0]);
        formData.append('title', title);
        formData.append('subject', subject || option);
        formData.append('topics', topics);
        formData.append('qualification', qualification);
        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        formData.append('userId', userData._id);

        const response = await axios.post('http://localhost:3000/uploadPdf', formData);
        if (response.data === 'uploaded') {
          setTrigger('load')

          // Show upload alert
          setShowUploadAlert(true);

          // Hide upload alert after 3 seconds
          setTimeout(() => {
            setShowUploadAlert(false);
          }, 3000);

          // Scroll to the top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        setFileSelected(true);
        // Clear form fields upon successful upload
        formRef.current.reset();
        setFileSelected(false);
        setLoadHome(prev => !prev)
      } else {
        console.log('Please fill out all fields');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <form action="" ref={formRef}>


      {showUploadAlert && ( // Conditional rendering of upload alert
        <div name='upload-alert' className="mt-5 absolute w-full">
          <div className="mx-auto w-72 rounded-md shadow-2xl p-3 bg-green-300 flex justify-center items-center ">
            <strong>✅Uploaded Successfully !  </strong>
          </div>
        </div>
      )}


      <div className="flex xs:justify-center min-h-[88.5vh]">
        <div className="px-5 md:px-12 lg:px-20 w-[100%] py-10 bg-pink-300 shadow-inner-2xl xl:flex lg:flex xs:flex xs:flex-col xl:justify-center lg:justify-center sm:justify-center  xl:items-start lg:items-start sm:items-center">
          <div className="left lg:w-[50%] w-[100%] flex flex-col gap-5 items-center">
            <input onKeyUp={handleTitleChange} required className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the title or chapter name" type="text" name="" id="" />
            <select disabled={selectDisabled} className="lg:w-[90%] w-[90%] p-3 rounded-md" onChange={handleOptionChange} name="subjects" id="">
              <option className="" value=" ">Select the subject</option>
              {allSubjects?.map((subject) => (
                <option key={subject._id} value={subject.title}>
                  {subject.title}
                </option>
              ))}
            </select>
            <p className="text-slate-500">or</p>
            <input disabled={inputDisabled} onKeyUp={handleSubjectChange} className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the Subject name" type="text" name="" id="" />
            <textarea required onKeyUp={handleTopicsChange} className="lg:w-[90%] w-[90%] p-3 rounded-md resize-none" placeholder="Topics involved in your notes" name="topics" id="" cols="30" rows="10"></textarea>
          </div>

          <div className="right lg:w-[50%] w-[100%] flex flex-col gap-5 xl:mt-0 lg:mt-0 mt-5 items-center">
            <input onKeyUp={handleQualificationChange} required className="lg:w-[90%] w-[90%] p-3 rounded-md" placeholder="Enter the Qualification level, Ex: b-tech 2nd year" type="text" name="" id="" />
            {/* hidden file input */}
            <input required onChange={() => setFileSelected(true)} ref={fileRef} type="file" name="pdf-file" id="" accept=".pdf" className="w-[.01px] h-[.01px]" />
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