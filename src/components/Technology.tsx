import { motion } from 'framer-motion';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const CORE_BUSINESSES = [
  {
    title: 'Music Production',
    desc: 'Full-chain capability from composition and arrangement to audio post-production. Original works pushing creative boundaries across genres.',
  },
  {
    title: 'Game Development',
    desc: 'Full-stack development powered by Unreal Engine. From ReverseRealm (UE4) to immersive VR concert experiences (UE5).',
  },
  {
    title: 'Film Production',
    desc: 'Animation, web films, and short-form drama production with a full professional pipeline. Represented by our 12-episode original series.',
  },
  {
    title: 'Virtual IP',
    desc: 'Original virtual characters with registered copyrights. AI Agent-driven organizational structure powering next-generation content creation.',
  },
];

export default function Technology() {
  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden">
      {/* Background video */}
      <video
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-12 md:px-16 py-12 sm:py-16">
        {/* Top area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left heading */}
          <motion.h2
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Core
            <br />
            Verticals
          </motion.h2>

          {/* Right paragraph */}
          <motion.p
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Three interconnected creative divisions — music, games, and film — united by a
            unique 'IP bi-directional empowerment' model that maximizes the value of every story.
          </motion.p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {CORE_BUSINESSES.map((biz, i) => (
            <motion.div
              key={biz.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {biz.title}
              </h3>
              <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {biz.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
