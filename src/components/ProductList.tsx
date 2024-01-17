import Link from 'next/link'

import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'

import { Products } from '@/schema'
import { Product } from '@/types'

import { mongodb } from '@/utils'

import style from './ProductList.module.sass'

const getProducts = async () => {
  await mongodb.connect()

  return (await Products.find({}).lean()) as Product[]
}

export default async () => {
  const products = await getProducts()

  return (
    <section className="products">
      <ul className={`row ${style.products}`}>
        {products?.map(({ name, description, price, slug, image }) => (
          <li key={name} className="mt-3 col">
            <Card as="article">
              <figure>
                <Link href={`/products/${slug}`}>
                  <CardImg variant="top" src={image} />
                </Link>
              </figure>
              <CardBody as="footer">
                <CardTitle as="h3">
                  {name} {price.toFixed(2)}€
                </CardTitle>
                <CardText>{description}</CardText>
                <Link href={`/products/${slug}`} className="btn btn-danger">
                  Order
                </Link>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
