export default function CloudSection() {
  return (
    <section id="cloud" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#a8d1ff] border border-white/6">Powered by Google Cloud</span>
          <h2 className="text-3xl md:text-4xl mt-6 font-space font-bold">Enterprise-Grade Infrastructure</h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4">Your websites are built on Google's global network, ensuring lightning-fast performance, unbreakable security, and 99.9% uptime guarantee.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6">
            <div className="w-14 h-14 rounded-lg bg-white/6 flex items-center justify-center mb-4">
              {/* icon */}
              <svg className="w-7 h-7 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Advanced Security</h3>
            <p className="text-white/70 text-sm">Multi-layered security, SSL certificates, and DDoS protection keep your website safe 24/7.</p>
          </div>

          <div className="glass p-6">
            <div className="w-14 h-14 rounded-lg bg-white/6 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#34A853]" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Lightning Performance</h3>
            <p className="text-white/70 text-sm">Global CDN ensures your site loads in under 2 seconds anywhere in the world.</p>
          </div>

          <div className="glass p-6">
            <div className="w-14 h-14 rounded-lg bg-white/6 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#FBBC05]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83L9.17 10.7C9.06 11.13 9 11.57 9 12c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.43 0-.87.06-1.3.17L7.17 5.64C8.51 4.62 10.18 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">99.9% Uptime</h3>
            <p className="text-white/70 text-sm">Automatic failover and redundant systems ensure your site never goes down.</p>
          </div>
        </div>

        <div className="glass mt-12 p-6 flex gap-6 justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-space font-bold text-[#9bd3ff]">99.9%</div>
            <div className="text-sm text-white/70 uppercase">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-space font-bold text-[#9bd3ff]">&lt;2s</div>
            <div className="text-sm text-white/70 uppercase">Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-space font-bold text-[#9bd3ff]">200+</div>
            <div className="text-sm text-white/70 uppercase">Global Locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-space font-bold text-[#9bd3ff]">24/7</div>
            <div className="text-sm text-white/70 uppercase">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}
