import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function UserDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch(`http://localhost:4000/users/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.id) setUser(data)
        else setUser(null)
      })
      .catch(err => {
        console.error("Error fetching user:", err)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  )
}
