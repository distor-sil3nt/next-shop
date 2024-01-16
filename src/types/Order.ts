export interface Order {
  _id: number
  customer: string
  address: string
  status: number
  total: number
  payment: number
  products: { _id: number; name: string; amount: number; extras: string[] }[]
}
