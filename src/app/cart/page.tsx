'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, CloseButton, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { CartProduct, Order } from '@/types'

import { RootState } from '@/store'
import { removeProduct, resetCart } from '@/store/cartSlice'

import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import axios from 'axios'
import { motion } from 'framer-motion'

const Cart = () => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_ID || ''
  const options = { clientId, components: 'buttons', currency: 'EUR' }
  const cart = useSelector((state: RootState) => state.cart)

  const style = { layout: 'vertical' as 'vertical', height: 30 }
  const amount = cart.total.toFixed(2)
  const currency = 'EUR'

  const [checkout, setCheckout] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const create = async (order: Partial<Order>) => {
    try {
      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API}/orders`, order)

      if (status === 201) {
        dispatch(resetCart())
        router.push(`/orders/${data._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const remove = (product: Partial<CartProduct>) => {
    toast.error(`${product.name} was removed`, {
      position: 'top-center',
      autoClose: 3000,
    })

    dispatch(removeProduct(product))
  }

  const ButtonWrapper = ({ currency, showSpinner }: { currency: string; showSpinner: boolean }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, dispatch, options, showSpinner])

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount + '',
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order!.capture().then(function (details) {
              const customer = details.purchase_units[0].shipping

              create({
                customer: customer?.name?.full_name || '',
                address: `${customer?.address?.address_line_1}, ${customer?.address?.admin_area_2}`,
                total: cart.total,
                status: 0,
                payment: 1,
                products: cart.products.map(({ name, amount, extras }) => ({
                  name,
                  amount,
                  extras: extras?.map(({ text }) => text) || [],
                })),
              })
            })
          }}
        />
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      {cart.count === 0 ? (
        <h2>Der Warenkorb ist leer!</h2>
      ) : (
        <>
          <h1>Shopping Cart</h1>
          <section className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>
                      <CloseButton disabled />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map(({ id, name, amount, price, extras, image, slug }) => (
                    <tr key={id}>
                      <td>
                        <Image src={image} alt={name} width={50} height={50} />
                      </td>
                      <td>
                        <Link href={`/products/${slug}`} className="text-danger">
                          {name}
                        </Link>
                      </td>
                      <td>
                        {extras?.map(({ _id, text }, index) => (
                          <React.Fragment key={_id}>
                            <span key={_id}>{text}</span>
                            {extras?.length - 1 !== index ? <span className="comma">, </span> : ''}
                          </React.Fragment>
                        ))}
                      </td>
                      <td>{amount}</td>
                      <td>{(price * amount!).toFixed(2)} €</td>
                      <td>
                        <Button className="btn-sm" onClick={() => remove({ id, name, amount, price })}>
                          x
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-3 p-2">
              <Card className="shadow">
                <CardHeader as="h4">Total</CardHeader>
                <CardBody className="text-center">
                  <CardTitle>{cart.total.toFixed(2)} €</CardTitle>

                  {checkout ? (
                    <PayPalScriptProvider options={options}>
                      <ButtonWrapper currency={currency} showSpinner={false} />
                    </PayPalScriptProvider>
                  ) : (
                    <Button variant="primary" onClick={() => setCheckout(true)}>
                      Go to Checkout
                    </Button>
                  )}
                </CardBody>
              </Card>
            </div>
          </section>
        </>
      )}
    </motion.div>
  )
}

Cart.displayName = 'Cart'

export default Cart
