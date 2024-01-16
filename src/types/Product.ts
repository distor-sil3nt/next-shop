export interface ProductBase {
  name: string
  price: number
  slug: string
  image: string
  extras?: ProductExtra[]
}

export interface Product extends ProductBase {
  _id: number
  description: string
  category: string
}

export type ProductExtra = {
  _id: number
  text: string
  price: number
}
