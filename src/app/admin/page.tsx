import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CloseButton, Table } from 'react-bootstrap'

import { Order } from '@/types'

import { DeleteButton, StatusButton } from '@/components'

import axios from 'axios'

const getOrders = async () => {
  const cookie = cookies()
  const token = cookie.get('token')

  if (token?.value !== process.env.TOKEN) {
    return redirect('/admin/login')
  }

  const { data: orders } = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders`)

  return orders
}

const Admin = async () => {
  const orders: Order[] = await getOrders()

  return (
    <>
      <h1>Admin Backend</h1>
      <section className="row mt-4">
        <div className="col-12">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ _id, customer, address, status }) => (
                <tr key={_id}>
                  <td>
                    <Link href={`/orders/${_id}`} className="text-danger">
                      {_id}
                    </Link>
                  </td>
                  <td>{customer}</td>
                  <td>{address}</td>
                  <td>
                    <StatusButton id={_id} status={status} />
                  </td>
                  <td>
                    <DeleteButton id={_id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  )
}

Admin.displayName = 'Admin'

export default Admin
