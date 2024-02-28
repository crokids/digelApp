import React from 'react'
import { auth, currentUser  } from '@clerk/nextjs'

export default async function MainContent() {

  const user = await currentUser()

  return (
    <div>{user.username}</div>
  )
}
