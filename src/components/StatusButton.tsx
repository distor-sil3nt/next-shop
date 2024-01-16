'use client'

import { useRouter } from 'next/navigation'

import { Button } from 'react-bootstrap'

import axios from 'axios'

export default ({ id, status }: { id: number; status: number }) => {
  const statusMessages = ['received', 'in preparation', 'on the way', 'delivered']
  const router = useRouter()

  const updateStatus = async (id: number, status: number) => {
    try {
      if (status <= 2) {
        await axios.put(`${process.env.NEXT_PUBLIC_API}/orders/${id}`, { status: status + 1 })
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return <Button onClick={() => updateStatus(id, status)}>{statusMessages[status]}</Button>
}
