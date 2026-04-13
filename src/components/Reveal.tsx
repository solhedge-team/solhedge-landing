import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

const variants: Variants = {
  hidden: (y: number) => ({ opacity: 0, y, filter: 'blur(8px)' }),
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <motion.div
      custom={y}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
