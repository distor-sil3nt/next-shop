'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import './Navigation.sass'

export default () => {
  const count = useSelector((state: RootState) => state.cart.count)

  return (
    <nav className="bg-danger mb-2 p-2 shadow sticky-top">
      <ul className="d-flex justify-content-between align-items-center">
        <li>
          <Link href="/" aria-label="Back home">
            <Image src="/images/logo.png" alt="Liefermax Shop Logo" width={180} height={75} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link href="/cart" aria-label="Go to shopping cart">
            <Image src="/images/cart.png" alt="Shopping Cart Icon" width={30} height={30} aria-hidden="true" />
            {count > 0 && (
              <Badge pill bg="success">
                {count}
              </Badge>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
