export default function AISection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">🚀 Stop losing clients when you can have an AI that answers every call.</h3>
            <p className="text-white/70 mb-4">Whether you run a spa, clinic, or service business — our Voice Agent books appointments, answers questions, and follows up automatically. No missed calls. No lost sales. Just more clients, 24/7.</p>
            <a href="https://calendly.com/bylumora-info/30min" target="_blank" rel="noreferrer" className="btn-primary inline-block">Book a call</a>
          </div>

          <div className="w-full md:w-1/2">
            <img src="https://bylumora.com/wp-content/uploads/2025/05/abstract-meeting-widescreen.webp" alt="dashboard" className="rounded-xl border border-white/6 shadow-lg w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
