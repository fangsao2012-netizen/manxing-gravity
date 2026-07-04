import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ManxingLogo from './ManxingLogo';
import ScrambleText from './ScrambleText';
import SquashHamburger from './SquashHamburger';

interface NavbarProps {
  entranceComplete: boolean;
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredContact, setHoveredContact] = useState(false);

  const scrollTo = (y: number) => {
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center sm:justify-between px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0 }}
      animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop nav */}
      <div className={`hidden sm:flex items-center gap-2 ${menuOpen ? 'hidden' : ''}`}>
        {/* Logo pill */}
        <motion.a
          href="#"
          className="h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
        >
          <ManxingLogo className="w-[18px] h-[18px] text-white" />
          <span className="text-[16px] font-medium tracking-tight text-white">
            Manxing Gravity
          </span>
        </motion.a>
      </div>

      {/* Expanding menu pill - desktop */}
      <div className="hidden sm:flex items-center">
        <motion.div
          className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          animate={{ width: menuOpen ? 360 : 48 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {/* Hamburger button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex-shrink-0 flex items-center justify-center focus:outline-none"
            animate={{
              width: menuOpen ? 36 : 48,
              height: menuOpen ? 36 : 48,
              borderRadius: menuOpen ? 11 : 14,
            }}
            whileHover={menuOpen ? { backgroundColor: 'rgba(255,255,255,0.2)' } : {}}
            style={menuOpen ? { backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '6px' } : {}}
          >
            <SquashHamburger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </motion.button>

          {/* Nav links */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex items-center gap-1 ml-3 mr-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => scrollTo(window.innerHeight)}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="px-3 py-1.5 text-[16px] font-normal text-white/85 hover:text-white transition-colors"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  onClick={() => scrollTo(window.innerHeight * 2)}
                  onMouseEnter={() => setHoveredLink('studio')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="px-3 py-1.5 text-[16px] font-normal text-white/85 hover:text-white transition-colors"
                >
                  <ScrambleText text="Studio" isHovered={hoveredLink === 'studio'} />
                </button>
                <button
                  onClick={() => scrollTo(window.innerHeight * 3)}
                  onMouseEnter={() => setHoveredLink('philosophy')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="px-3 py-1.5 text-[16px] font-normal text-white/85 hover:text-white transition-colors"
                >
                  <ScrambleText text="Philosophy" isHovered={hoveredLink === 'philosophy'} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Contact button - desktop */}
      <div className="hidden sm:block">
        <motion.button
          onClick={scrollToBottom}
          className="h-12 px-6 bg-white rounded-full flex items-center gap-2 text-black text-[14px] font-medium cursor-pointer"
          onMouseEnter={() => setHoveredContact(true)}
          onMouseLeave={() => setHoveredContact(false)}
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-envelope-fill text-[14px]" />
          <ScrambleText text="Contact" isHovered={hoveredContact} />
        </motion.button>
      </div>

      {/* Mobile nav */}
      <div className="flex sm:hidden items-center gap-2 w-full justify-center">
        {/* Logo pill */}
        <motion.div
          className="h-9 px-3 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 overflow-hidden"
          animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <ManxingLogo className="w-[14px] h-[14px] text-white flex-shrink-0" />
          <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
            Manxing Gravity
          </span>
        </motion.div>

        {/* Menu capsule */}
        <motion.div
          className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center"
          animate={{ width: menuOpen ? '100%' : 36 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex-shrink-0 flex items-center justify-center focus:outline-none"
            animate={{
              width: menuOpen ? 28 : 36,
              height: menuOpen ? 28 : 36,
              borderRadius: menuOpen ? 8 : 10,
            }}
            style={menuOpen ? { backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '4px' } : {}}
          >
            <SquashHamburger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </motion.button>

          {/* Nav links - mobile */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex items-center gap-1 ml-2 mr-2 flex-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => scrollTo(window.innerHeight)}
                  className="px-2 py-1 text-[13px] text-white/85"
                >
                  About
                </button>
                <button
                  onClick={() => scrollTo(window.innerHeight * 2)}
                  className="px-2 py-1 text-[13px] text-white/85"
                >
                  Studio
                </button>
                <button
                  onClick={scrollToBottom}
                  className="px-2 py-1 text-[13px] text-white/85"
                >
                  Contact
                </button>
                <div className="flex-1" />
                <motion.button
                  onClick={scrollToBottom}
                  className="h-9 px-3.5 bg-white rounded-full flex items-center gap-1.5 text-black text-[13px] font-medium flex-shrink-0 cursor-pointer"
                  whileTap={{ scale: 0.97 }}
                >
                  <i className="bi bi-envelope-fill text-[13px]" />
                  <span>Contact</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
}
