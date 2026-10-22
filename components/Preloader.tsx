/**
 * First-visit intro. Hidden by CSS unless the pre-paint script flagged `html.is-loading`
 * (first visit of the session, motion allowed). The motion controller animates it away;
 * a CSS failsafe removes it even if scripts never run.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true" data-preloader>
      <div className="preloader-inner">
        <img className="preloader-mark" src="/brand-mark.svg" alt="" width={72} height={72} />
        <p className="preloader-name">The Tulip Touch Café</p>
      </div>
      <div className="zigzag preloader-zigzag" data-preloader-zigzag />
    </div>
  );
}
