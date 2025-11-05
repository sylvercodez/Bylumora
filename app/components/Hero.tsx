"use client";
export default function Hero() {
  return (
    <section className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
          {/* Left content */}
          <div className="space-y-6">
            <span className="inline-block text-xs uppercase px-4 py-2 rounded-full text-white/80 bg-white/6 glass">
              AI-Powered Website Creation
            </span>

            <h1 className="text-5xl md:text-6xl leading-tight font-space font-extrabold tracking-tight">
              Professional Websites. <br /> Zero Complexity.
            </h1>

            <p className="text-lg text-white/70 max-w-xl">
              Transform your business with AI-generated websites hosted on enterprise-grade Google Cloud infrastructure. Professional results in minutes, not months.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#pricing" className="btn-primary">Start Your Project</a>
              <a href="https://calendly.com/bylumora-info/30min" target="_blank" rel="noreferrer" className="btn-secondary">Schedule Consultation</a>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex items-center justify-center">
            <div className="w-[420px] h-[420px] relative">
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/6 to-transparent opacity-20 blur-[40px]"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-[#FFD700]/30 to-[#FFA500]/20 flex items-center justify-center shadow-gold-lg">
                <div className="w-16 h-16 rounded-lg bg-white/6 flex items-center justify-center">
                  <img src="https://bylumora.com/wp-content/uploads/2025/08/google-cloud-image.jpg" alt="google" className="w-10 h-10 object-contain" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center animate-rotate-slow">
                <div className="w-[240px] h-[240px] rounded-full border border-white/6"></div>
              </div>

              <div className="absolute -right-6 top-1/3 w-28 h-28 rounded-xl glass flex items-center justify-center border border-white/6 shadow-lg">
                <img src="https://bylumora.com/wp-content/uploads/2025/08/Wordpress-Logo.png" alt="wp" className="w-12 h-12 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
