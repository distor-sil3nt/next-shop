import { ProductList, Slider, Transition } from '@/components'

export default () => {
  return (
    <Transition>
      <Slider />
      <ProductList />
    </Transition>
  )
}
