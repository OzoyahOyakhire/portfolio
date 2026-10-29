'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The one place GSAP plugins are registered. Every animated component imports
 * from here rather than from 'gsap' directly, so registration can never be
 * forgotten or run twice in different orders.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/** Matches the motion guard used everywhere else on the site. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
