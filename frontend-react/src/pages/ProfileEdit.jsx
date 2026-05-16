import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

function ProfileEdit() {
  const [profilePicPreview, setProfilePicPreview] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  //Existing Data Fetching
  useEffect(()=> {
    const fetchUserData = async ()=> {
      try {
        const response = await axiosInstance.get('/profile/me/')

        setProfilePicPreview(response.data.profile_pic || '')
        setUsername(response.data.username || '')
        setFirstName(response.data.first_name || '')
        setLastName(response.data.last_name || '')
        setEmail(response.data.email || '')
        setMobileNumber(response.data.mobile_number || '')
        setDateOfBirth(response.data.date_of_birth || '')
      }
      catch (error) {
        setError("Failed to load Profile")
        setTimeout(()=> {setError('')}, 3000)
      }
    }
    fetchUserData()
  }, [])

  //Updating Profile Data
  const UpdateData = async (e)=> {
    e.preventDefault()

    setLoading(true)

    try {
      const formData = new FormData()

      if (profilePic) {
        formData.append('profile_pic', profilePic)
      }
      formData.append('username', username)
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
      formData.append('mobile_number', mobileNumber)
      
      if (dateOfBirth) {
        formData.append('date_of_birth', dateOfBirth)
      }

      await axiosInstance.patch('/profile/me/edit/', formData, 
        {headers: {'Content-Type': 'multipart/form-data'}}
      )

      setSuccess('Profile Updated Successfully')
      setTimeout(()=> {setSuccess('')}, 3000)
      setError('')
      navigate('/profile')
      
    }
    catch (error) {
      setError('Failed to Update Profile')
      setTimeout(()=> {setError('')}, 3000)
      setSuccess('')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}

      <div>
        <form onSubmit={UpdateData}>
          {profilePicPreview && (<img src={profilePicPreview} width='120' />)}
          <input type='file' accept='image/*' 
          onChange={(e)=> {
            setProfilePic(e.target.files[0])
            setProfilePicPreview(URL.createObjectURL(e.target.files[0]))
          }}
          />
          <br />
          <input type='text' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='username' />
          <br />
          <input type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder='first name' />
          <br />
          <input type='text' value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder='last name' />
          <br />
          <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='email' />
          <br />
          <input type='text' value={mobileNumber} onChange={(e)=> setMobileNumber(e.target.value)} placeholder='mobile number' />
          <br />
          <input type='date' value={dateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)} />
          <br />
          {loading ? (
            <button type='submit' disabled className='btn btn-outline-light'>Updating...</button>
          ) : (
            <button type='submit' className='btn btn-outline-light'>Update Profile</button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
