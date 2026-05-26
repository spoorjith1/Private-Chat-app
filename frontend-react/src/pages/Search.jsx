import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import User from '../components/User'
import { IoSearchOutline } from 'react-icons/io5'

function Search() {
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [loadMore, setLoadMore] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = async (url = '/users/')=> {
    try {
      setError('')
      const response = await axiosInstance.get(url)
      setUsers((prevUsers) => {
        const newUsers = response.data.results.filter((newUser) => !prevUsers.some((prevUser) => prevUser.id === newUser.id))
        return [...prevUsers, ...newUsers]
      })
      setLoadMore(response.data.next)
    }
    catch (error) {
      setError("Failed to load users")
    }
  }

  useEffect(()=> {
    fetchUsers();
  }, [])

  const searchUser = async ()=> {
    setLoading(true)
    try {
      setUsers([])
      const response = await axiosInstance.get(`/users/?search=${search}`)
      setUsers(response.data.results)
      setLoadMore(response.data.next)
    }
    catch (error) {
      setError("Failed to search users")
    }
    finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (<div className='page-container'>Loading...</div>)
  }

  return (
    <div className='page-container'>
      <h2 className='search-title'>Find Users</h2>
      {error && (<div>{error}</div>)}

      <div className='search-container'>
        <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} className='search-input' />
        <button onClick={searchUser} className='search-btn'><IoSearchOutline /></button>
      </div>

      <div className='others-container'>
        {users.map((user)=> (
          <User key={user.id} user={user} />
        ))}
      </div>

      <div>
        {loadMore && (<button onClick={()=> fetchUsers(loadMore)}>Load More</button>)}
      </div>
    </div>
  )
}

export default Search
