import type { Metadata } from 'next';

import { Footer, Navigation, Provider } from '@/components';

import '@/styles/styles.sass';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: 'Liefermax - Your Delivery Service',
  description: 'Enjoy delicious pizza delivered blazingly fast',
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <body>
        <Provider>
          <header>
            <Navigation />
          </header>

          <main className="container pb-5 mb-5">{children}</main>

          <Footer />
        </Provider>
      </body>
    </html>
  )
}
