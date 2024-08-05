import React, { useState } from 'react'
import { FaLock } from "react-icons/fa6"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ImageToBase64 from '../Helpers/ImageToBase64';
import SummaryApi from '../Common/backendApi';


const SignUp = () => {

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: ""
  })

  const [showPassword, setShowPsssword] = useState(false)
  const [showConfirmShowPassword, setConfirmShowPassword] = useState(false)

  const handleUploadProfileImg = async (e) => {
    const file = e.target.files[0]

    let image64 = ""
    if (file?.name) {
      image64 = await ImageToBase64(file)
    }

    setSignUpData((prev) => ({ ...prev, profileImage: image64 }))
    console.log("file", image64)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signUpData.password === signUpData.confirmpassword) {

      const respone = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(signUpData)
      })

      const responseData = await respone.json()

      if (responseData.success) {
        alert(responseData.message)
      }

      if (responseData.error) {
        alert(responseData.message)
      }
    }

    else{
      alert("passwords do not match")
    }
  }


  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">

        <div className="container w-[300px] border flex justify-center shadow-md p-3 rounded bg-white">

          <div className='flex flex-col justify-center items-center'>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <div className="w-14 h-14 mx-auto relative overflow-hidden rounded-full bg-white border-2 border-violet-800 shadow-md">
                  <label>
                    {
                      signUpData.profileImage ?
                        (
                          <div className="cursor-pointer text-center absolute w-full">
                            <img src={signUpData.profileImage} alt="login_icon" />
                          </div>
                        ) :
                        (
                          <div className="flex justify-center items-center py-[15px] cursor-pointer">
                            <FaCamera className="text-violet-800" fontSize={25} />
                          </div>
                        )
                    }
                    <input type='file' className='hidden' onChange={handleUploadProfileImg} />
                  </label>
                </div>
                {
                  signUpData.profileImage ? ("") : (<p className="text-xs font-semibold text-center">upload pic</p>)
                }
              </div>
              <div className="flex flex-col gap-4 w-[270px] mt-3">
                <div>
                  <label htmlFor='name' className="text-sm font-semibold">Username:</label>
                  <input className="border h-6 w-full rounded text-sm" type="text" name="name" id="name" required
                    value={signUpData.name} onChange={handleChange} />
                </div>

                <div>
                  <label htmlFor='email' className="text-sm font-semibold">Email:</label>
                  <input className="border h-6 w-full rounded text-sm" type="email" name="email" id="email" required
                    value={signUpData.email} onChange={handleChange} />
                </div>

                <div>
                  <label htmlFor='password' className="text-sm font-semibold">Password:</label>
                  <div className="relative">
                    <input className="border h-6 w-full rounded text-sm" type={showPassword ? "text" : "password"} required
                      name="password" id="password"
                      value={signUpData.password} onChange={handleChange} />
                    <span className="absolute top-1 right-0 px-2 cursor-pointer" onClick={() => setShowPsssword((prev) => !prev)} >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor='confirmpassword' className="text-sm font-semibold">Confirm Password:</label>
                  <div className="relative">
                    <input className="border h-6 w-full rounded text-sm" type={showConfirmShowPassword ? "text" : "password"} required
                      name="confirmpassword" id="confirmpassword"
                      value={signUpData.confirmpassword} onChange={handleChange} />
                    <span className="absolute top-1 right-0 px-2 cursor-pointer" onClick={() => setConfirmShowPassword((prev) => !prev)} >
                      {showConfirmShowPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="bg-violet-800 px-4 py-[5px] text-white rounded shadow-md">
                  <p className="text-sm">Signup</p>
                </button>
              </div>

            </form>

            <div className="flex justify-center mt-5 font-semibold">
              <p className="text-xs">Already have an Account ?
                <Link to="/login"><span className="px-1 text-violet-800">Login</span></Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default SignUp