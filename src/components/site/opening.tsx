import { site } from '@/content/site';

/**
 * The opening screen: the wordmark settles in, a counter runs to 100 while
 * an accent line fills, then the whole sheet wipes up off the page and the
 * hero headline rises behind it.
 *
 * - Pure CSS (styles/opening.css), rendered on the server so it covers the
 *   very first paint. The exit is on a timer and ends in `visibility: hidden`,
 *   so a failed script can never leave anyone stuck behind it.
 * - Once per visit: the inline script below runs before the sheet is parsed
 *   and, if this tab has already seen it, marks <html> so the sheet is never
 *   drawn and the hero animates immediately.
 * - Skipped entirely for visitors who prefer reduced motion.
 * - `aria-hidden`: it repeats the name and says nothing a screen reader needs;
 *   the real page is already in the DOM underneath.
 */
export function Opening() {
  return (
    <>
      <script
        // Static, author-controlled code; nothing user-supplied reaches it.
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('opening-seen')){document.documentElement.dataset.opening='seen'}else{sessionStorage.setItem('opening-seen','1')}}catch(e){}`,
        }}
      />
      <div aria-hidden="true" className="opening">
        <div className="opening-inner mx-auto w-full max-w-editorial px-5 md:px-10">
          <p className="opening-mark font-display font-extrabold">
            ozed<span className="text-accent">/</span>
          </p>
          <p className="opening-role mt-4 label text-muted">
            {site.name} — {site.role.toLowerCase()}
          </p>
        </div>

        <div className="opening-foot mx-auto w-full max-w-editorial px-5 pb-8 md:px-10 md:pb-10">
          <div className="flex items-baseline justify-between label text-muted">
            <span>Building the page</span>
            <span className="opening-count text-fg" />
          </div>
          <span className="opening-bar mt-3 block h-px bg-line">
            <span className="block h-full bg-accent" />
          </span>
        </div>
      </div>
    </>
  );
}
