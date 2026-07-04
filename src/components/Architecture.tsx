import { motion } from 'framer-motion';

const PILLARS = [
  { number: '1', name: 'Content First' },
  { number: '2', name: 'Innovation Driven' },
  { number: '3', name: 'Synergy Powered' },
];

export default function Architecture() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-black">
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        {/* Heading block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Philosophy
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three pillars.
            <br />
            One vision.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Content is king, innovation is the soul, collaboration is the strength. Manxing
            Gravity operates at the convergence of creativity and technology — crafting excellence
            into every creation, illuminating the future through imagination.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                Pillar {pillar.number}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {pillar.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
