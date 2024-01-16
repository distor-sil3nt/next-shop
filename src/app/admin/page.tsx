import Link from 'next/link'

import { CloseButton, Table } from 'react-bootstrap'

import { Order } from '@/types'

import { DeleteButton, StatusButton } from '@/components'

import axios from 'axios'

const getOrders = async () => {
  const { data: orders } = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders`)

  return orders
}

export default async () => {
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
