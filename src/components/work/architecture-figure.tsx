import type { Architecture, DiagramNode, NodeTone } from '@/content/types';

/**
 * Renders an architecture diagram from grid data.
 *
 * Every visual decision — box size, stroke weight, arrowheads, orthogonal
 * routing, the dashed service boundary — lives here once, so any project that
 * gains a diagram inherits the same language instead of drifting.
 *
 * The SVG is a single `role="img"` with a prose description. Individual <text>
 * elements inside it are ignored by assistive tech, which is the point: one
 * coherent summary beats forty orphaned labels.
 */

const NODE_W = 204;
const NODE_H = 64;
const GAP_X = 88;
const GAP_Y = 40;
const PAD = 24;
const BOUNDARY_PAD = 16;
const BOUNDARY_LABEL = 30;

const tones: Record<
  NodeTone,
  { fill: string; stroke: string; title: string; sub: string; dash?: string }
> = {
  paper: { fill: 'fill-ground', stroke: 'stroke-fg', title: 'fill-fg', sub: 'fill-muted' },
  bone: { fill: 'fill-raised', stroke: 'stroke-fg', title: 'fill-fg', sub: 'fill-muted' },
  navy: {
    fill: 'fill-accent',
    stroke: 'stroke-accent',
    title: 'fill-ground',
    sub: 'fill-ground/75',
  },
  ghost: {
    fill: 'fill-none',
    stroke: 'stroke-muted',
    title: 'fill-fg/80',
    sub: 'fill-muted',
    dash: '6 5',
  },
};

const x = (col: number) => PAD + col * (NODE_W + GAP_X);
const y = (row: number) => PAD + BOUNDARY_LABEL + row * (NODE_H + GAP_Y);

export function ArchitectureFigure({ architecture }: { architecture: Architecture }) {
  const { cols, rows, nodes, edges, boundaries = [] } = architecture;
  const byId = new Map(nodes.map((n) => [n.id, n] as const));

  const width = PAD * 2 + cols * NODE_W + (cols - 1) * GAP_X;
  const height = PAD * 2 + BOUNDARY_LABEL + rows * NODE_H + (rows - 1) * GAP_Y;

  return (
    <figure>
      <figcaption className="flex flex-col gap-2 border-b-2 border-fg pb-3.5 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="label">{architecture.caption}</span>
        <span className="label text-muted">{architecture.note}</span>
      </figcaption>

      {/* Scrolls sideways on narrow screens rather than shrinking the labels to nothing. */}
      {/* Focusable so keyboard users can scroll it; `role="region"` because an
          aria-label on a plain div is prohibited and gets ignored. */}
      <div
        className="mt-7 overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Architecture diagram, scrollable"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={architecture.description}
          className="block h-auto w-full min-w-[56rem]"
        >
          <defs>
            <marker
              id="arch-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3.2"
              orient="auto"
            >
              <path d="M0,0 L9,3.2 L0,6.4 z" className="fill-fg" />
            </marker>
          </defs>

          {boundaries.map((boundary) => {
            const members = boundary.nodes
              .map((id) => byId.get(id))
              .filter((n): n is DiagramNode => Boolean(n));
            if (members.length === 0) return null;
            const left = Math.min(...members.map((n) => x(n.col))) - BOUNDARY_PAD;
            const right = Math.max(...members.map((n) => x(n.col) + NODE_W)) + BOUNDARY_PAD;
            const top =
              Math.min(...members.map((n) => y(n.row))) - BOUNDARY_PAD - BOUNDARY_LABEL;
            const bottom = Math.max(...members.map((n) => y(n.row) + NODE_H)) + BOUNDARY_PAD;
            return (
              <g key={boundary.label}>
                <rect
                  x={left}
                  y={top}
                  width={right - left}
                  height={bottom - top}
                  className="fill-none stroke-accent/45"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                />
                <text
                  x={left + 12}
                  y={top + 20}
                  className="fill-accent font-sans text-[9px] font-semibold tracking-[0.14em] uppercase"
                >
                  {boundary.label}
                </text>
              </g>
            );
          })}

          {edges.map((edge) => {
            const from = byId.get(edge.from);
            const to = byId.get(edge.to);
            if (!from || !to) return null;
            const stroke = edge.dashed ? 'stroke-muted' : 'stroke-fg';
            const dash = edge.dashed ? '6 5' : undefined;
            const marker = edge.dashed ? undefined : 'url(#arch-arrow)';

            // Same column: straight down from bottom edge to top edge.
            if (from.col === to.col) {
              const cx = x(from.col) + NODE_W / 2;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={cx}
                  y1={y(from.row) + NODE_H}
                  x2={cx}
                  y2={y(to.row) - 4}
                  className={stroke}
                  strokeWidth="1.6"
                  strokeDasharray={dash}
                  markerEnd={marker}
                />
              );
            }

            const sx = x(from.col) + NODE_W;
            const sy = y(from.row) + NODE_H / 2;
            const tx = x(to.col) - 4;
            const ty = y(to.row) + NODE_H / 2;

            // Same row: straight across, with the label centred above the line.
            if (from.row === to.row || !edge.elbow) {
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={sx}
                    y1={sy}
                    x2={tx}
                    y2={ty}
                    className={stroke}
                    strokeWidth="1.6"
                    strokeDasharray={dash}
                    markerEnd={marker}
                  />
                  {edge.label ? (
                    <text
                      x={(sx + tx) / 2}
                      y={sy - 9}
                      textAnchor="middle"
                      className="fill-muted font-sans text-[11px] font-medium"
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              );
            }

            // Elbow: across to the middle of the gutter, along, then in.
            const mid = sx + (x(to.col) - sx) / 2;
            const points =
              edge.elbow === 'hv'
                ? `${sx},${sy} ${mid},${sy} ${mid},${ty} ${tx},${ty}`
                : `${sx},${sy} ${sx},${ty} ${tx},${ty}`;
            return (
              <polyline
                key={`${edge.from}-${edge.to}`}
                points={points}
                className={`fill-none ${stroke}`}
                strokeWidth="1.6"
                strokeDasharray={dash}
                markerEnd={marker}
              />
            );
          })}

          {nodes.map((node) => {
            const t = tones[node.tone ?? 'paper'];
            const nx = x(node.col);
            const ny = y(node.row);
            return (
              <g key={node.id}>
                <rect
                  x={nx}
                  y={ny}
                  width={NODE_W}
                  height={NODE_H}
                  className={`${t.fill} ${t.stroke}`}
                  strokeWidth="1.6"
                  strokeDasharray={t.dash}
                />
                <text
                  x={nx + 18}
                  y={ny + 28}
                  className={`${t.title} font-display text-[16px] font-bold`}
                >
                  {node.label}
                </text>
                {node.sub ? (
                  <text x={nx + 18} y={ny + 47} className={`${t.sub} font-sans text-[12px]`}>
                    {node.sub}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
