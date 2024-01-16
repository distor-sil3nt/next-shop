'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ChangeEvent, useState } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { Product, ProductExtra } from '@/types'

import { addProducts } from '@/store/cartSlice'
import { v4 as uuidv4 } from 'uuid'

export default ({ product }: { product: Product }) => {
  const { name, description, price, image, extras, slug } = product
  const [addedExtras, setAddedExtras] = useState([] as ProductExtra[])
  const [amount, setAmount] = useState(1)
  const [total, setTotal] = useState(price)

  const dispatch = useDispatch()
  const router = useRouter()

  const addAmount = (event: ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = event.target

    value = '' + Math.max(Number(min), Math.min(Number(max), Number(value)))

    setAmount(+value)
  }

  const addExtra = (event: ChangeEvent<HTMLInputElement>, extra: ProductExtra) => {
    const isChecked = event.target.checked

    setTotal(total + (isChecked ? 1 : -1) * extra.price)
    setAddedExtras(
      isChecked ? [...addedExtras, extra] : addedExtras.filter((addedExtra) => addedExtra._id !== extra._id),
    )
  }

  const addToCart = () => {
    const id = uuidv4()
    const product = {
      id,
      name,
      amount,
      extras: addedExtras,
      image,
      price: total,
      slug,
    }

    dispatch(addProducts({ product }))

    router.push('/cart')
  }

  return (
    <article className="row row-cols-2 mt-2">
      <figure>
        <Image
          className="rounded-3"
          src={image}
          alt={name}
          priority={true}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={600}
          height={600}
        />
      </figure>
      <footer>
        <h1>{name}</h1>
        <ListGroup variant="flush">
          <ListGroupItem>
            <h2 className="text-danger">{total.toFixed(2)} €</h2>
          </ListGroupItem>
          <ListGroupItem>{description}</ListGroupItem>
          {!extras?.length ? (
            ''
          ) : (
            <ListGroupItem>
              <span>Extras: </span>
              {extras.map(({ _id, text }, index) => (
                <span key={_id}>
                  <input
                    className="form-check-input me-2 ms-2"
                    id={text}
                    type="checkbox"
                    onChange={(event) => addExtra(event, extras[index])}
                  />
                  <label htmlFor={text}>{text}</label>
                </span>
              ))}
            </ListGroupItem>
          )}
          <ListGroupItem>
            <input
              className="form-control w-50"
              type="number"
              placeholder="1"
              value={amount}
              min="1"
              max="100"
              onChange={(event) => addAmount(event)}
            />
          </ListGroupItem>
          <ListGroupItem>
            <div className="row shadow">
              <Button variant="danger" onClick={addToCart}>
                Add to Cart
              </Button>
            </div>
          </ListGroupItem>
        </ListGroup>
      </footer>
    </article>
  )
}
