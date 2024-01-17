import { ProductList, Slider, Transition } from '@/components'

const App = () => {
  return (
    <Transition>
      <Slider />
      <ProductList />
    </Transition>
  )
}

App.displayName = 'App'

export default App
