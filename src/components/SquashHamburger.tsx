import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const spring = { stiffness: 300, damping: 20 };

export default function SquashHamburger({ isOpen, onClick }: SquashHamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-full h-full focus:outline-none"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Desktop (18x12, 1.5px bars) */}
      <div className="hidden sm:flex flex-col items-center justify-center w-[18px] h-[12px] relative">
        <motion.span
          className="absolute block w-full h-[1.5px] bg-white rounded-full"
          animate={isOpen ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
          transition={spring}
          style={{ top: 0, left: 0 }}
        />
        <motion.span
          className="absolute block w-full h-[1.5px] bg-white rounded-full"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={spring}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <motion.span
          className="absolute block w-full h-[1.5px] bg-white rounded-full"
          animate={isOpen ? { rotate: -45, y: -5.25 } : { rotate: 0, y: 0 }}
          transition={spring}
          style={{ bottom: 0, left: 0 }}
        />
      </div>

      {/* Mobile (15x10, 1.2px bars) */}
      <div className="flex sm:hidden flex-col items-center justify-center w-[15px] h-[10px] relative">
        <motion.span
          className="absolute block w-full h-[1.2px] bg-white rounded-full"
          animate={isOpen ? { rotate: 45, y: 4.4 } : { rotate: 0, y: 0 }}
          transition={spring}
          style={{ top: 0, left: 0 }}
        />
        <motion.span
          className="absolute block w-full h-[1.2px] bg-white rounded-full"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={spring}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <motion.span
          className="absolute block w-full h-[1.2px] bg-white rounded-full"
          animate={isOpen ? { rotate: -45, y: -4.4 } : { rotate: 0, y: 0 }}
          transition={spring}
          style={{ bottom: 0, left: 0 }}
        />
      </div>
    </button>
  );
}
