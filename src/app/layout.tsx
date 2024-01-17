import type { Metadata } from 'next'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

import { Footer, Navigation, Provider } from '@/components'

import '@/styles/styles.sass'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  title: 'Liefermax - Your Delivery Service',
  description: 'Enjoy delicious pizza delivered blazingly fast',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <body>
        <Provider>
          <header>
            <Navigation />
          </header>

          <main className="container pb-5 mb-5">{children}</main>

          <Footer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}

Layout.displayName = 'Layout'

export default Layout
