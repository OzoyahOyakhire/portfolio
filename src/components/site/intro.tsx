import { site } from '@/content/site';
import { Logo } from './logo';

/** When the sheet has fully lifted: exit delay 2.6s + duration 1s. */
const INTRO_MS = 3600;

/**
 * The opening curtain: the Sub-Dot draws itself, the name rises, a counter
 * runs to 100, then the navy sheet lifts off the page.
 *
 * Pure CSS (see styles/intro.css), rendered on the server so it covers the
 * very first paint — no flash of the page before it. Because nothing depends
 * on JavaScript, a script failure can't strand anyone behind it: the exit is
 * on a timer, and `visibility: hidden` at the end takes it out of hit-testing.
 *
 * It lives in the root layout, which persists across client navigations, so
 * it plays on a full page load only — never between pages.
 *
 * `aria-hidden`: it duplicates the name and says nothing a screen reader
 * user needs; the real page is already in the DOM underneath.
 */
export function Intro() {
  return (
    <div aria-hidden="true" className="intro" data-tone="navy">
      <div className="intro-mark">
        <Logo size={92} animate className="text-ground" />
        <p className="intro-line mt-7">
          <span className="intro-name font-display">{site.name}</span>
        </p>
        <p className="intro-role mt-4 label text-ground/60">{site.role}</p>
      </div>

      <div className="intro-foot label">
        <span className="text-ground/60">Loading</span>
        <span className="intro-count" />
      </div>
      <span className="intro-bar" />

      {/* Marks the curtain as spent once it has lifted, so a hero mounted later
          by client navigation rises immediately instead of waiting for it. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){document.documentElement.dataset.intro='done'},${INTRO_MS})`,
        }}
      />
    </div>
  );
}
