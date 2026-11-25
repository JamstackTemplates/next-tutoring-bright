import type { SVGProps } from 'react';

/**
 * Shared drawing style: a flat colour fill offset a few pixels from a pencil outline, like
 * colouring-in that slipped. `fill` is a Tailwind fill utility such as "fill-bulb".
 */
export function Inked({ d, fill, offset = 2.5, thin = false, className = '', ...rest }: {
  d: string; fill?: string; offset?: number; thin?: boolean; className?: string;
} & Omit<SVGProps<SVGPathElement>, 'd' | 'fill'>) {
  return <g className={className}>
    {fill ? <path d={d} className={fill} transform={`translate(${offset} ${offset})`} {...rest} /> : null}
    <path d={d} className={thin ? 'ln-thin' : 'ln'} {...rest} />
  </g>;
}

/** A pencil stroke with no fill. */
export function Line({ d, thin = false, className = '' }: { d: string; thin?: boolean; className?: string }) {
  return <path d={d} className={`${thin ? 'ln-thin' : 'ln'} ${className}`} />;
}
