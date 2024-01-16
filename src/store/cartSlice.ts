import { createSlice } from '@reduxjs/toolkit';

import { CartProduct, ProductExtra } from '@/types';

const initialState = {
  count: 0,
  products: [] as CartProduct[],
  total: 0,
}

const addToCart = (product: CartProduct, cartProducts: CartProduct[]) => {
  const extras = product.extras
  const isEqual = (extra1: ProductExtra, extra2: ProductExtra) =>
    extra1.text === extra2.text && extra1.price === extra2.price

  const index = cartProducts.findIndex((cartProduct) => {
    const { name, extras: cartExtras } = cartProduct

    if (name === product.name) {
      if (!cartExtras?.length && !extras?.length) {
        return true
      } else if (cartExtras?.length === extras?.length) {
        return cartExtras?.every((cartExtra) => extras?.some((extra) => isEqual(cartExtra, extra)))
      }
    }
    return false
  })

  if (index > -1) cartProducts[index].amount += product.amount
  else cartProducts.push(product)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts: (state, { payload: { product } } /* action */) => {
      addToCart(product, state.products)

      state.count += product.amount
      state.total += product.price * product.amount
    },
    removeProduct: (state, { payload } /* action */) => {
      const products = state.products.filter((product) => product.id !== payload.id)

      state.products = products
      state.count -= payload.amount
      state.total -= payload.price * payload.amount
    },
    resetCart: () => initialState,
  },
})

export const { addProducts, removeProduct, resetCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
