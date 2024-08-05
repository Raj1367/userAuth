import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import SummaryApi from '../Common/backendApi';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    email: "",
    profileImage: "",
  })

  const handleUserProfile = async () => {
    const response = await fetch(SummaryApi.userProfile.url, {
      method: SummaryApi.userProfile.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    setData(responseData.data)

    if (responseData.success) {
      navigate("/userprofile")
    }

    if (responseData.error) {
      alert(responseData.message)
      navigate("/login")
    }
  }


  const handleLogout = async () => {
    const response = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: 'include'
    })

    const responseData = await response.json()

    if (responseData.success) {
      alert(responseData.message)
      navigate("/login")
    }

    if (responseData.error) {
      alert(responseData.message)
    }

  }

  useEffect(() => {
    handleUserProfile()
  }, [])

  return (
    <div>

      {
        data ? (
          <div className='flex items-center justify-center h-[90vh]'>

            <div className="w-[250px] container border rounded shadow-md">

              <div className="my-5">
                <div className="flex justify-center items-center m-2">
                  <div className="border-2 p-3 rounded-full"> <FaUser fontSize={26} /></div>
                </div>

                <div className="mt-4 mb-5 flex justify-center items-center flex-col gap-3">
                  <div className="flex justify-start items-center gap-1">
                    <label className="font-semibold">Name:</label>
                    <p>{data.name}</p>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <label className="font-semibold">Email:</label>
                    <p>{data.email}</p>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <button onClick={handleLogout} className="bg-red-500 w-20 h-7 rounded-full text-sm text-white">Logout</button>
                </div>

              </div>

            </div>
          </div>
        ) : (

          <div>
            <p>please login...</p>
          </div>
        )
      }

    </div>
  )
}

export default UserProfile