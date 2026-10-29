import { GlyphField } from '@/components/home/glyph-field';
import { home } from '@/content/home';
import { site } from '@/content/site';

/**
 * Contact and footer in one, on every page. The glyph field returns above the
 * call to action, so the page opens and closes on the same texture.
 */
export function SiteFooter() {
  const { eyebrow, headline } = home.contact;
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-editorial px-5 pt-24 pb-10 md:px-10 md:pt-32"
    >
      <GlyphField variant="strip" className="mb-14" />

      <div className="reveal border-b border-line pb-16 md:pb-20">
        <p className="label text-muted">{eyebrow}</p>
        <h2
          id="contact-title"
          className="mt-6 font-display text-[clamp(2.2rem,1.2rem+4.8vw,4.5rem)] leading-none font-extrabold tracking-[-0.035em]"
        >
          {headline[0]}
          <br />
          {headline[1]}
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-fg-soft">
          {site.cta.body}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="btn btn-hot" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a
            className="btn btn-line"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6 label text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name} · 
        </p>
        <ul className="flex gap-6">
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
