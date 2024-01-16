import { ProductBase } from './Product'

export interface CartProduct extends ProductBase {
  id: string
  amount: number
}
