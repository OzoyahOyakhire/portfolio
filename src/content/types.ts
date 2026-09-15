import type { StaticImageData } from 'next/image';

/* --------------------------------------------------------------------------
   Shared
   -------------------------------------------------------------------------- */

export interface Labelled {
  readonly label: string;
  readonly value: string;
}

export interface NumberedItem {
  readonly title: string;
  readonly body: string;
  readonly tags?: readonly string[];
}

/* --------------------------------------------------------------------------
   Architecture diagrams

   Modelled as data on a coarse grid rather than hand-authored SVG per project,
   so the visual language — stroke weight, label type, arrowheads, the dashed
   service boundary — is defined once in <ArchitectureFigure> and any future
   diagram inherits it instead of drifting.
   -------------------------------------------------------------------------- */

export type NodeTone = 'paper' | 'bone' | 'navy' | 'ghost';

export interface DiagramNode {
  readonly id: string;
  readonly label: string;
  readonly sub?: string;
  readonly col: number;
  readonly row: number;
  readonly tone?: NodeTone;
}

export interface DiagramEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly dashed?: boolean;
  /** Orthogonal routing: horizontal-then-vertical, or the reverse. */
  readonly elbow?: 'hv' | 'vh';
}

export interface DiagramBoundary {
  readonly label: string;
  /** Bounding box is computed from these members. */
  readonly nodes: readonly string[];
}

export interface Architecture {
  readonly caption: string;
  readonly note: string;
  /** Prose summary for assistive tech — the SVG is one `role="img"`. */
  readonly description: string;
  readonly cols: number;
  readonly rows: number;
  readonly nodes: readonly DiagramNode[];
  readonly edges: readonly DiagramEdge[];
  readonly boundaries?: readonly DiagramBoundary[];
}

/* --------------------------------------------------------------------------
   Projects
   -------------------------------------------------------------------------- */

export interface Decision {
  readonly title: string;
  readonly turnedDown: string;
}

/**
 * `meta` and `glance` are tuples, not arrays, because the design specifies a
 * four-cell meta row and a three-up glance band. A missing cell is then a
 * compile error rather than a grid that quietly collapses to two columns.
 *
 * Only `architecture` and `decisions` are optional. Four of the five case
 * studies render as title → meta → glance → prev/next, which reads as a
 * deliberate short form; making `meta`/`glance` optional instead would mean
 * every page needed a fallback layout for no editorial reason.
 */
export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly category: string;
  readonly year: string;
  readonly summary: string;
  readonly hardPart: string;
  readonly whatHappened: string;
  readonly tags: readonly string[];

  readonly featured?: boolean;
  readonly href?: string;

  readonly lede: string;
  readonly meta: readonly [Labelled, Labelled, Labelled, Labelled];
  readonly glance: readonly [Labelled, Labelled, Labelled];

  readonly architecture?: Architecture;
  readonly decisions?: readonly Decision[];

  readonly shot?: { readonly src: StaticImageData; readonly alt: string };
}
