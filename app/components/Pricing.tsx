export default function Pricing() {
  const plans = [
    {
      id: 'strong',
      title: 'Strong Hosting',
      price: '$50',
      period: '/mo',
      features: [
        'Speed & performance optimization',
        'Secure premium servers optimized for WordPress',
        'Daily backups & 24/7 uptime monitoring',
        'Advanced malware protection',
        '1 website per plan',
      ],
    },
    {
      id: 'extreme',
      title: 'Extreme Hosting',
      price: '$100',
      period: '/mo',
      featured: true,
      features: [
        'Everything in Strong Hosting',
        'Premium Global CDN with 330+ edge locations',
        'Argo Smart Routing for traffic optimization',
        'Web Application Firewall security',
        '1 website per plan',
      ],
    },
    {
      id: 'vip',
      title: 'VIP Hosting',
      price: 'Text Us',
      period: '',
      vip: true,
      features: [
        'Enterprise-level Global CDN',
        'AI-driven uptime & performance monitoring',
        'Dedicated account manager',
        'Priority support channel',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-4">Choose Your Hosting Plan</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          Power your AI-crafted website with our premium hosting solutions. Switch to annual billing and save up to 60%.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className={`p-6 glass border ${p.featured ? 'border-yellow-400/20 scale-100': 'border-white/6'} rounded-2xl shadow-lg`}>
              {p.featured && <div className="inline-block mb-3 px-3 py-1 rounded-full bg-[#FFD700] text-black text-xs font-semibold">Most Popular</div>}
              <h3 className={`text-xl font-semibold mb-2 ${p.vip ? 'text-purple-300' : ''}`}>{p.title}</h3>
              <div className="text-4xl font-space font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">{p.price}</span>
              </div>
              <ul className="text-sm text-white/70 space-y-2 mb-6">
                {p.features.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>

              <a
                href={p.id === 'vip' ? "https://wa.me/19546360200" : "/login"}
                className={`w-full inline-block text-center py-3 rounded-lg ${p.featured ? 'bg-[#FFD700] text-black' : 'bg-white/6 text-white'}`}
              >
                {p.featured ? 'Choose Extreme' : p.vip ? 'Text Us' : 'Choose Strong'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
