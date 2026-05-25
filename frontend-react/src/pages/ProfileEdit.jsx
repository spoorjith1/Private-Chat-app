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
    <div className='page-container edit-page'>
      <h2 className='edit-title'>Edit Profile</h2>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}

      <div className='edit-form-container'>
        <form onSubmit={UpdateData}>
          {profilePicPreview && (<img src={profilePicPreview} width='120' className='edit-profile-pic' />)}
          <br />
          <label  className='edit-form-label'>Profile pic </label>
          <input type='file' accept='image/*' className='profile-input'
          onChange={(e)=> {
            setProfilePic(e.target.files[0])
            setProfilePicPreview(URL.createObjectURL(e.target.files[0]))
          }}
          />
          <hr className='edit-hr' />
          <div className='edit-main-box'>
            <div className='edit-boxes'>
              <label className='edit-form-label'>Username</label>
              <input type='text' value={username} onChange={(e)=> setUsername(e.target.value)} className='edit-inputs' />
            </div>
            <div  className='edit-boxes'>
              <label className='edit-form-label'>First Name</label>
              <input type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)} className='edit-inputs' />
            </div>
            <div  className='edit-boxes'>
              <label className='edit-form-label'>Last Name</label>
              <input type='text' value={lastName} onChange={(e)=> setLastName(e.target.value)} className='edit-inputs' />
            </div>
            <div  className='edit-boxes'>
              <label className='edit-form-label'>Email</label>
              <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='edit-inputs' />
            </div>
            <div  className='edit-boxes'>
              <label className='edit-form-label'>Mobile Number</label>
              <input type='text' value={mobileNumber} onChange={(e)=> setMobileNumber(e.target.value)} className='edit-inputs' />
            </div>
            <div  className='edit-boxes'>
              <label className='edit-form-label'>Date Of Birth</label>
              <input type='date' value={dateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)} />
            </div>
            <div>
              {loading ? (
                <button type='submit' disabled className='edit-btn'>Updating...</button>
              ) : (
                <button type='submit' className='edit-btn'>Update Profile</button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
