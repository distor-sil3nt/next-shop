'use client'

import { PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

export default ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      {children}
    </motion.div>
  )
}
