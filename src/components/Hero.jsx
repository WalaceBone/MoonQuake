import { motion } from 'framer-motion';

import { styles } from '../styles';
import { MoonCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <MoonCanvas />
      </div>
    </section>
  )
}

export default Hero