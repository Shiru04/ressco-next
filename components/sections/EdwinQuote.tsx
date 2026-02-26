export function EdwinQuote() {
  return (
    <section
      aria-label="Founder quote"
      className="bg-black py-12 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="text-brand-red text-4xl leading-none mb-6 select-none" aria-hidden>
          "
        </div>
        <blockquote className="text-white text-xl sm:text-2xl font-semibold leading-relaxed tracking-tight">
          Build as if your name will be on it forever.
          <br className="hidden sm:block" />
          Work as if today is the only chance you'll get.
        </blockquote>
        <div className="mt-6 text-white/50 text-sm font-semibold tracking-wide uppercase">
          — Edwin Tobar, Founder &amp; President · RESSCO Metals
        </div>
      </div>
    </section>
  );
}
