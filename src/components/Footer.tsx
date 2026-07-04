import ManxingLogo from './ManxingLogo';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

export default function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left: Video */}
        <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden">
          <video
            src={VIDEO_URL}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-6">
              <ManxingLogo className="w-[18px] h-[18px] text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                Manxing Gravity
              </span>
            </div>

            {/* Description */}
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-4">
              A comprehensive cultural enterprise driven by music creation, game development, and
              film production. We build worlds across every medium.
            </p>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-sm">
              Music · Film · Game — Three creative verticals, one unified vision. Crafting
              excellence, illuminating the future.
            </p>
          </div>

          {/* Contact & Copyright */}
          <div className="mt-12">
            <div className="flex flex-col gap-1 mb-4">
              <a
                href="http://www.manxinggravity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 text-[12px] hover:text-white/60 transition-colors"
              >
                www.manxinggravity.com
              </a>
              <a
                href="mailto:lixiaofang@manxinggravity.cn"
                className="text-white/30 text-[12px] hover:text-white/60 transition-colors"
              >
                lixiaofang@manxinggravity.cn
              </a>
            </div>
            <p className="text-white/25 text-[12px]">
              &copy; 2026 Manxing Gravity Cultural Co., Ltd. All rights reserved.
            </p>
            <p className="text-white/20 text-[11px] mt-1">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                鄂ICP备2026020245号
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
