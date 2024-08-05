import React, { useState } from 'react'
import { FaLock } from "react-icons/fa6"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../Common/backendApi';
const Login = () => {

  const navigate = useNavigate()

  const [loigndata, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPsssword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const respone = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(loigndata)
    })

    const responseData = await respone.json()

    if (responseData.success) {
      alert(responseData.message)
      navigate("/userprofile")
    }

    if (responseData.error) {
      alert(responseData.message)
    }
  }


  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">

        <div className="container w-[300px] border flex justify-center shadow-md p-3 rounded bg-white">

          <div className='flex flex-col justify-center items-center'>

            <div className="border-2 border-violet-800 rounded-full p-3 my-2 shadow-md">
              <FaLock className="text-violet-800" fontSize={23} />
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 w-[270px]">

                <div>
                  <label htmlFor='email' className="text-sm font-semibold">Email:</label>
                  <input className="border h-6 w-full rounded text-sm" type="text" name="email" id="email" onChange={handleChange} value={loigndata.email} />
                </div>

                <div>
                  <label htmlFor='password' className="text-sm font-semibold">Password:</label>
                  <div className="relative">
                    <input className="border h-6 w-full rounded text-sm" type={showPassword ? "text" : "password"} name="password" id="password" value={loigndata.password} onChange={handleChange} />
                    <span className="absolute top-1 right-0 px-2 cursor-pointer" onClick={() => setShowPsssword((prev) => !prev)} >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="bg-violet-800 px-4 py-[5px] text-white rounded shadow-md">
                  <p className="text-sm">Login</p>
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-5 font-semibold">
              <p className="text-xs">Don't have an Account ?
                <Link to="/signup"><span className="px-1 text-violet-800">Signup</span></Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login