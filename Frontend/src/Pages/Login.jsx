import logo from '../assets/logo.png'
import googleLogo from '../assets/googleLogo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [alert, setAlert] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const userData = {
        username: username,
        password: password
    }

    const handleLogin = async (e) => {
        if (username !== '' && password !== '') {
            try {
                const response = await axios.post('http://localhost:3000/login', userData);
                console.log(response.data);
            } catch (err) {
                setError(err);
            }
        }
    }

    const usernameHandler = (e) => {
        console.log(e.target.value)
        setUsername(e.target.value);
    }

    const passwordHandler = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value);
    }

    return (
        <div className="overflow-hidden bg-pink-300 w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="form-container bg-white w-[90vw] md:w-[45vw] lg:w-[30vw] rounded-xl shadow-xl flex flex-col gap-5 p-8 ">
                <div className="logo flex w-full justify-center ">
                    <img className='h-16' src={logo} alt="" />
                </div>
                <input onChange={usernameHandler} value={username} className='p-3 font-medium w-[95%] mx-auto ring-2 ring-pink-300 rounded-lg' type="text" placeholder='Username' />
                <input onChange={passwordHandler} value={password} className='p-3 font-medium w-[95%] mx-auto ring-2 ring-pink-300 rounded-lg' type="password" placeholder='Password' />
                <input onClick={handleLogin} className='p-2 font-medium w-[35%] bg-pink-300 hover:bg-pink-400 duration-150 text-lg text-white cursor-pointer mx-auto ring-2 ring-pink-300 rounded-lg' type="button" value='Login' />

                <div className="text-slate-500 flex justify-center"><h3 className="">or</h3></div>
                <div className="p-3 flex gap-3 justify-center font-medium w-[95%] mx-auto bg-black hover:bg-slate-950 cursor-pointer duration-0 rounded-lg text-white">
                    <h3 className="">Login with Google</h3>
                    <img className='w-6 h-6' src={googleLogo} alt="" />
                </div>
                <div className="flex justify-center text-sm">
                    don't have an account? <Link className='text-blue-700 ml-2' to={'/signup'}>SignUp</Link>
                </div>
            </div>
        </div>
    )
}

export default Login