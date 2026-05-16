import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

function Search() {

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchUsers = async (
    url = '/users/search/',
    searchValue = ''
  ) => {

    try {

      setLoading(true)

      const response = await axiosInstance.get(
        url,
        {
          params: {
            search: searchValue
          }
        }
      )

      if (url === '/users/search/') {
        setUsers(response.data.results)
      }

      else {
        setUsers(prev => [
          ...prev,
          ...response.data.results
        ])
      }

      setNextPage(response.data.next)

    }

    catch (error) {
      console.log(error)
    }

    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = () => {
    fetchUsers('/users/search/', search)
  }

  const handleSendRequest = async (userId) => {

    try {

      await axiosInstance.post(
        '/friend/request/',
        {
          receiver: userId
        }
      )

      setUsers(prev =>
        prev.map(user =>
          user.id === userId
            ? {
                ...user,
                friendship_status: 'pending'
              }
            : user
        )
      )

    }

    catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <h2>Search Users</h2>

      <input
        type='text'
        placeholder='Search users...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <br />
      <br />

      {loading ? (
        <p>Loading...</p>
      ) : (

        users.map(user => (

          <div key={user.id}>

            <img
              src={user.profile_pic}
              alt=''
              width='50'
            />

            <p>{user.username}</p>

            {user.friendship_status === 'pending' ? (

              <button disabled>
                Request Sent
              </button>

            ) : user.friendship_status === 'accepted' ? (

              <button disabled>
                Friends
              </button>

            ) : (

              <button
                onClick={() =>
                  handleSendRequest(user.id)
                }
              >
                Add Friend
              </button>

            )}

            <hr />

          </div>
        ))
      )}

      {nextPage && (

        <button
          onClick={() =>
            fetchUsers(nextPage, search)
          }
        >
          Load More
        </button>

      )}

    </div>
  )
}

export default Search