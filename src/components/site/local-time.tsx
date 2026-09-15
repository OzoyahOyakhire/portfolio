'use client';

import { useEffect, useState } from 'react';

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Lagos',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Lagos time in the footer. Renders nothing on the server and fills in after
 * mount, so the prerendered HTML never carries a stale time and there is no
 * hydration mismatch. Refreshes once a minute.
 */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span>
      Lagos time
      {now ? (
        <>
          {' '}
          — <time>{now}</time>
        </>
      ) : null}
    </span>
  );
}
