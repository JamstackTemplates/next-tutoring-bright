// CentreMap: a stylised street sketch of Swanston Street showing the State Library dome, Melbourne
// Central and the centre's door marked with a bulb pin. Decorative; directions are given in text.
import { BulbShape } from './lightbulb';
import { Inked, Line } from './ink';

export function CentreMap({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 480 380" className={className} role="img" aria-labelledby="centre-map-title" focusable="false">
    <title id="centre-map-title">Sketch map: Lightbulb Tutoring on Swanston Street, across from the State Library and near Melbourne Central station</title>
    {/* Streets */}
    <path d="M206 0h68v380h-68Z" className="fill-line" />
    <path d="M0 246h480v54H0Z" className="fill-line" />
    <Line d="M206 0v246M274 0v246M206 300v80M274 300v80M0 246h206M274 246h206M0 300h206M274 300h206" />
    <path d="M240 8v228M240 310v64M10 273h186M284 273h186" className="ln-thin" style={{ strokeDasharray: '10 10', stroke: 'var(--bulb)' }} />
    <text x="248" y="118" className="art-text" fontSize="20" transform="rotate(90 248 118)">Swanston St</text>
    <text x="330" y="280" className="art-text" fontSize="19">La Trobe St</text>
    {/* Tram */}
    <g transform="translate(219 24)">
      <Inked d="M0 0h42v70H0Z" fill="fill-pencil-green" thin />
      <Line d="M6 10h30v18H6ZM6 40h30v18H6Z" thin />
    </g>
    {/* State Library dome and portico */}
    <g transform="translate(300 60)">
      <Inked d="M0 150V80h160v70Z" fill="fill-sheet" />
      <Inked d="M30 80c0-46 100-46 100 0Z" fill="fill-pencil-green/50" />
      <Line d="M80 34v-12M20 150V96M48 150V96M76 150V96M104 150V96M132 150V96M0 92h160" thin />
      <text x="80" y="176" textAnchor="middle" className="art-text" fontSize="17">State Library</text>
    </g>
    {/* Melbourne Central */}
    <g transform="translate(14 44)">
      <text x="62" y="-12" textAnchor="middle" className="art-text" fontSize="17">Melbourne Central</text>
      <Inked d="M0 0h114v104H0Z" fill="fill-pencil-blue/25" />
      <Line d="M14 18h24v28H14ZM46 18h24v28H46ZM78 18h24v28H78ZM14 60h24v28H14ZM78 60h24v28H78Z" thin />
    </g>
    {/* Centre door and bulb pin */}
    <g transform="translate(148 190)">
      <Inked d="M0 0h54v54H0Z" fill="fill-paper-2" />
      <Line d="M18 54V24h18v30" thin />
    </g>
    <g transform="translate(149 120) scale(1.05)"><BulbShape lit /></g>
    <text x="14" y="214" className="art-text" fontSize="20" style={{ fill: 'var(--margin)' }}>We’re up here!</text>
    <path d="M128 222c8 2 14 0 18-4" className="ln-thin" style={{ stroke: 'var(--margin)' }} />
    {/* Compass */}
    <g transform="translate(436 340)">
      <Line d="M0-22v44M-10-12 0-22l10 10" thin />
      <text x="0" y="-28" textAnchor="middle" className="art-text" fontSize="16">N</text>
    </g>
  </svg>;
}
