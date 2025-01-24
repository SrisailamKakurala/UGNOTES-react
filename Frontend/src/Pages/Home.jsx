import { useEffect, useRef, useState } from "react";
import Pdf from "../Components/Pdf";
import axios from "axios";
import { useUser } from "../Context/UserContext";

const Home = () => {

  // dummy state to trigger the home page re-render
  const { loadHome } = useUser()

  const [option, setOption] = useState("");
  const [chapter, setChapter] = useState("");

  // all subjects will be displayed in select tag for the user to choose from for selecting
  const [allSubjects, setAllSubjects] = useState([]);
  // the chapters which starts with the letters user searched in input tag 
  const [searchedChapters, setSearchedChapters] = useState([]);

  // let the user to only search either through select or input
  const [inputDisabled, setInputDisabled] = useState(false);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // searching the notes through select and input tags and storing the pdf's info
  const [optionRes, setOptionRes] = useState([]);
  const [inputRes, setInputRes] = useState([]);


  useEffect(() => {

    // get all subjects in db to show in select tag
    const loadSubjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getSubjects`)
        setAllSubjects(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    loadSubjects()
  }, [loadHome])

  
  // let the user to only search either through select or input
  const handleOptionChange = (e) => {
    if (e.target.value === " ") {
      setInputDisabled(false);
    } else {
      setInputDisabled(true);
      setOption(e.target.value);
    }
  };

  const handleChapterChange = async (e) => {
    console.log(e.target.value)
    if (e.target.value === "") {
      setSelectDisabled(false);
    } else {
      setSelectDisabled(true);
    }
    setChapter(e.target.value);
    // load chapters when searched in input tag
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getChapters/${e.target.value}`)
      .then((data) => {
        setSearchedChapters(data.data)
      })
  };


  // final search on click of search button
  const handleSearch = async () => {
    if (option !== "") {
      try {
        setIsLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getSubjectPdfs?option=${option}`);
        setOptionRes(res.data)
        setIsLoading(false)
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        setIsLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getChapterPdfs?chapter=${chapter}`);
        setInputRes(res.data)
        setIsLoading(false)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="px-5 md:px-12 lg:px-20 h-[87.9vh] w-[100%] bg-pink-300 shadow-inner-2xl flex justify-center items-center ">
        <div className="flex flex-col gap-5 justify-center items-center">
          <select
            onChange={handleOptionChange}
            disabled={selectDisabled}
            className="font-bold rounded-xl text-lg px-6 py-4 w-[90vw] md:w-[70vw] lg:w-[90vw]"
            name="subjects"
          >
            <option className="" value=" ">
              Select the subject
            </option>
            {allSubjects?.map((subject) => (
              <option key={subject._id} value={subject.title}>
                {subject.title}
              </option>
            ))}
          </select>
          <h1 className="text-slate-600 text-lg font-bold">or</h1>
          <input
            disabled={inputDisabled}
            onChange={handleChapterChange}
            type="text"
            className="font-bold rounded-xl text-lg px-6 py-3 w-[90vw] md:w-[70vw] lg:w-[90vw]"
            placeholder="Search the chapter"
            value={chapter}
          />
          <div className="text-lg bg-white w-[90vw] md:w-[70vw] lg:w-[90vw] overflow-y-scroll max-h-40">
            {searchedChapters.length > 0 && searchedChapters.map((chapter) => (
              <div
                key={chapter._id}
                className="p-1 my-1 mx-5 border-b border-slate-300 text-slate-600 hover:text-black cursor-pointer"
                onClick={() => {
                  setChapter(chapter.title);
                  setSearchedChapters([])
                }}
              >
                {chapter.title}
              </div>
            ))}
          </div>
          <button
            onClick={handleSearch}
            className="rounded-lg duration-150 text-lg w-40 px-6 py-3 bg-black hover:bg-slate-900 text-white"
          >
            Search
          </button>
          <strong hidden={!isLoading} className="text-xl text-slate-800">
            Loading....
          </strong>
        </div>
      </div>
      <div name="pdf-container" className="w-[100vw] px-5 md:px-12 lg:px-20 py-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-items-center bg-white">
        {optionRes && optionRes.length > 0 ? (
          optionRes.slice().reverse().map((pdf, index) => (
            <Pdf key={index} post={pdf._id} />
          ))
        ) : (
          inputRes.slice().reverse().map((pdf, index) => (
            <Pdf key={index} post={pdf._id} />
          ))
        )}
        {optionRes.length == 0 && inputRes.length == 0 ? <h1 className="absolute mx-auto font-bold text-xl">No Results</h1> : ''}
      </div>
    </div>
  );
};

export default Home;
