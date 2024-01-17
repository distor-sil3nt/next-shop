import Link from 'next/link';

import { Button, Card, CardBody, CardHeader, CardTitle, Spinner, Table } from 'react-bootstrap';

import { Order } from '@/types';

import axios from 'axios';

const getOrder = async (id: string) => {
  const { data: order } = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders/${id}`)

  return order as Order
}

const Order = async ({ params: { id } }: { params: { id: string } }) => {
  const { _id, customer, address, payment, status, total, products } = await getOrder(id)

  const statusMessage =
    {
      0: 'received',
      1: 'in preparation',
      2: 'on the way',
      3: 'delivered',
    }[status] ?? 'received'

  if (!_id) {
    return (
      <>
        <h2>Order {id} not available</h2>
        <Link href="/" className="btn btn-primary">
          Back to menu
        </Link>
      </>
    )
  } else {
    return (
      <>
        <h1>Order Status</h1>
        <section className="row mt-4">
          <div className="col-md-8 col-lg-9">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{id}</td>
                  <td>{customer}</td>
                  <td>{address}</td>
                  <td>
                    <span className="me-2">{statusMessage}</span>
                    {status < 3 ? <Spinner animation="border" variant="success" size="sm" /> : <span>✓</span>}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Extras</th>
                </tr>
              </thead>
              <tbody>
                {products.map(({ _id, name, amount, extras }) => (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{amount}</td>
                    <td>
                      {extras.map((extra, index) => (
                        <span key={index}>{`${extra}${index !== extras.length - 1 ? ', ' : ''}`}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-4 col-lg-3 p2">
            <Card className="shadow">
              <CardHeader as="h4">Total</CardHeader>
              <CardBody className="text-center">
                <CardTitle>{total.toFixed(2)} €</CardTitle>
                {payment === 0 ? (
                  <Button variant="danger disabled">open</Button>
                ) : (
                  <Button variant="success disabled">paid</Button>
                )}
              </CardBody>
            </Card>
          </div>
        </section>
      </>
    )
  }
}

export default Order