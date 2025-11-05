"use client";

export default function Features() {
  const features = [
    {
      title: "AI Website Generator",
      desc: "Instantly generate custom sites from your brand name, goals, or niche — powered by Lumora AI.",
    },
    {
      title: "Google Cloud Hosting",
      desc: "Enjoy high-speed, secure, and scalable cloud infrastructure with automatic backups and monitoring.",
    },
    {
      title: "Integrated Dashboard",
      desc: "Manage your site, analytics, and SEO tools from one sleek dashboard.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-12 text-gold">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gold">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
