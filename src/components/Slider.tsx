import Image from 'next/image'

import { Carousel, CarouselItem } from 'react-bootstrap'

const Slider = () => {
  const items = ['burger', 'pizza', 'burrito']

  const attributes = {
    className: 'd-block rounded-3 w-100',
    width: 3000,
    height: 1000,
    style: {
      height: '60vh',
      objectFit: 'cover' as 'cover',
    },
  }

  return (
    <Carousel controls={false} fade={true} as="section">
      {items.map((item) => {
        return (
          <CarouselItem key={item}>
            <Image src={`/images/slider/${item}.jpg`} alt={item} {...attributes} />
          </CarouselItem>
        )
      })}
    </Carousel>
  )
}

export default Slider
