'use client'

import { useRouter } from 'next/navigation'

import { MouseEvent, useState } from 'react'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

import axios from 'axios'

export default () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  const login = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault()

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
        user,
        password,
      })

      router.push('/admin')
    } catch (error) {
      setError(true)

      console.error(error)
    }
  }

  return (
    <>
      <h1>Login</h1>
      {error && <p className="text-danger">Login fehlgeschlagen</p>}
      <Form className="mt-4">
        <FormGroup className="mb-3" controlId="user">
          <FormControl type="text" placeholder="User" onChange={(event) => setUser(event.target.value)} />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <FormControl type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </FormGroup>
        <Button type="submit" variant="primary" onClick={(event) => login(event)}>
          Login
        </Button>
      </Form>
    </>
  )
}
