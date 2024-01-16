'use client'

import { useRouter } from 'next/navigation'

import { Button } from 'react-bootstrap'

import axios from 'axios'

export default ({ id }: { id: number }) => {
  const router = useRouter()

  const deleteOrder = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/orders/${id}`)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button variant="danger" onClick={() => deleteOrder()}>
      x
    </Button>
  )
}
