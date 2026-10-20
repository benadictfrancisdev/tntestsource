import React from 'react';

interface IllustrativeDiagramProps {
  type: 'textiles' | 'engineering' | 'home-linen' | 'leather' | 'packaging' | 'auto-components' | 'workflow';
  className?: string;
}

export const IllustrativeDiagram: React.FC<IllustrativeDiagramProps> = ({ type, className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-slate-50 border border-slate-200 rounded-[8px] p-5 ${className}`}>
      {/* Illustrative label - strictly mandated */}
      <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-200/80 text-[11px] font-mono uppercase tracking-wider text-slate-600 rounded">
        Illustrative
      </div>

      {type === 'textiles' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spool to Fabric Loom Process */}
          <rect x="20" y="30" width="60" height="90" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="30" y1="45" x2="70" y2="45" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="30" y1="65" x2="70" y2="65" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="30" y1="85" x2="70" y2="85" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="3 3" />
          <text x="50" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Yarn Feed</text>

          {/* Flow arrow 1 */}
          <path d="M95 75 H135" stroke="#0E9F9A" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Knitting / Circular cylinder */}
          <rect x="150" y="25" width="80" height="100" rx="6" fill="#0E9F9A" fillOpacity="0.1" stroke="#0E9F9A" strokeWidth="1.5" />
          <circle cx="190" cy="75" r="28" stroke="#0B2545" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="190" cy="75" r="14" fill="#0B2545" fillOpacity="0.15" />
          <text x="190" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Knitting & Dyeing</text>

          {/* Flow arrow 2 */}
          <path d="M245 75 H285" stroke="#0E9F9A" strokeWidth="2" />

          {/* Garment Cut & Pack */}
          <rect x="300" y="30" width="75" height="90" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <path d="M315 50 L337 42 L360 50 L355 70 L345 68 L345 105 L330 105 L330 68 L320 70 Z" fill="#0B2545" fillOpacity="0.2" stroke="#0B2545" strokeWidth="1.2" />
          <text x="337" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Cut, Sew & Pack</text>
        </svg>
      )}

      {type === 'engineering' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Casting Crucible */}
          <path d="M30 45 L40 110 C42 120 78 120 80 110 L90 45 Z" fill="#D98E04" fillOpacity="0.1" stroke="#D98E04" strokeWidth="1.5" />
          <ellipse cx="60" cy="45" rx="30" ry="10" stroke="#D98E04" strokeWidth="1.5" fill="#D98E04" fillOpacity="0.2" />
          <text x="60" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Foundry & Cast</text>

          {/* Flow arrow 1 */}
          <path d="M105 75 H145" stroke="#0E9F9A" strokeWidth="2" />

          {/* CNC Machining Chamber */}
          <rect x="160" y="25" width="80" height="95" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <path d="M185 35 V65 L195 75 L205 65 V35" stroke="#0E9F9A" strokeWidth="2" />
          <rect x="180" y="80" width="40" height="25" fill="#0B2545" fillOpacity="0.2" stroke="#0B2545" strokeWidth="1.2" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">CNC 5-Axis Milling</text>

          {/* Flow arrow 2 */}
          <path d="M255 75 H295" stroke="#0E9F9A" strokeWidth="2" />

          {/* Quality Inspection / CMM probe */}
          <rect x="310" y="25" width="70" height="95" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <line x1="345" y1="35" x2="345" y2="80" stroke="#0B2545" strokeWidth="2" />
          <circle cx="345" cy="85" r="4" fill="#D98E04" />
          <rect x="325" y="90" width="40" height="20" stroke="#0B2545" strokeWidth="1.2" fill="#0B2545" fillOpacity="0.1" />
          <text x="345" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">CMM Verification</text>
        </svg>
      )}

      {type === 'home-linen' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Yarn Dyeing */}
          <rect x="25" y="30" width="70" height="90" rx="4" fill="#0E9F9A" fillOpacity="0.1" stroke="#0E9F9A" strokeWidth="1.5" />
          <path d="M40 50 Q60 40 80 50 T80 90" stroke="#0E9F9A" strokeWidth="1.5" fill="none" />
          <circle cx="60" cy="75" r="15" stroke="#0B2545" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="60" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Yarn Dyeing</text>

          {/* Flow arrow 1 */}
          <path d="M110 75 H145" stroke="#0E9F9A" strokeWidth="2" />

          {/* Dobby / Rapier Loom Weave */}
          <rect x="160" y="25" width="80" height="95" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="175" y1="45" x2="225" y2="45" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="175" y1="60" x2="225" y2="60" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="175" y1="75" x2="225" y2="75" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="175" y1="90" x2="225" y2="90" stroke="#0B2545" strokeWidth="1.5" />
          <line x1="185" y1="35" x2="185" y2="105" stroke="#0E9F9A" strokeWidth="1.5" />
          <line x1="200" y1="35" x2="200" y2="105" stroke="#0E9F9A" strokeWidth="1.5" />
          <line x1="215" y1="35" x2="215" y2="105" stroke="#0E9F9A" strokeWidth="1.5" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Dobby / Weaving</text>

          {/* Flow arrow 2 */}
          <path d="M255 75 H290" stroke="#0E9F9A" strokeWidth="2" />

          {/* Made-up tailored goods */}
          <rect x="305" y="30" width="75" height="90" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <rect x="320" y="45" width="45" height="55" rx="2" stroke="#0B2545" strokeWidth="1.5" strokeDasharray="3 3" fill="#ffffff" />
          <text x="342" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Hemming & Finish</text>
        </svg>
      )}

      {type === 'leather' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hide Grading */}
          <rect x="25" y="30" width="70" height="90" rx="4" fill="#D98E04" fillOpacity="0.08" stroke="#D98E04" strokeWidth="1.5" />
          <path d="M40 50 C45 42 75 42 80 50 C75 75 82 85 80 100 C65 105 55 105 40 100 C38 85 45 75 40 50 Z" fill="#D98E04" fillOpacity="0.2" stroke="#D98E04" strokeWidth="1.2" />
          <text x="60" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Hide Selection</text>

          <path d="M110 75 H145" stroke="#0E9F9A" strokeWidth="2" />

          {/* Pattern Skiving & Stitching */}
          <rect x="160" y="25" width="80" height="95" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <path d="M175 90 C180 60 215 60 225 80 L230 95 Z" stroke="#0B2545" strokeWidth="1.5" fill="#0B2545" fillOpacity="0.15" />
          <line x1="175" y1="95" x2="230" y2="95" stroke="#0E9F9A" strokeWidth="2" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Pattern & Stitching</text>

          <path d="M255 75 H290" stroke="#0E9F9A" strokeWidth="2" />

          {/* Lasting & Boxing */}
          <rect x="305" y="30" width="75" height="90" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <path d="M320 85 L350 85 C360 85 365 75 360 65 L345 65 L335 75 L320 75 Z" fill="#0B2545" fillOpacity="0.25" stroke="#0B2545" strokeWidth="1.2" />
          <text x="342" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Lasting & QC</text>
        </svg>
      )}

      {type === 'auto-components' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Precision Lathe Turned Stock */}
          <rect x="25" y="30" width="70" height="90" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <rect x="40" y="55" width="40" height="38" rx="2" stroke="#0B2545" strokeWidth="1.5" fill="#0B2545" fillOpacity="0.2" />
          <circle cx="60" cy="74" r="8" stroke="#0E9F9A" strokeWidth="1.5" fill="#ffffff" />
          <text x="60" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Bar Stock Machining</text>

          <path d="M110 75 H145" stroke="#0E9F9A" strokeWidth="2" />

          {/* Stamping & Press */}
          <rect x="160" y="25" width="80" height="95" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <path d="M180 40 H220 V65 L200 80 L180 65 Z" fill="#0E9F9A" fillOpacity="0.15" stroke="#0E9F9A" strokeWidth="1.5" />
          <line x1="175" y1="90" x2="225" y2="90" stroke="#0B2545" strokeWidth="2" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Progressive Press</text>

          <path d="M255 75 H290" stroke="#0E9F9A" strokeWidth="2" />

          {/* Surface Coating */}
          <rect x="305" y="30" width="75" height="90" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <rect x="325" y="50" width="35" height="48" rx="4" fill="#D98E04" fillOpacity="0.15" stroke="#D98E04" strokeWidth="1.5" />
          <text x="342" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Surface Plating</text>
        </svg>
      )}

      {type === 'packaging' && (
        <svg viewBox="0 0 400 180" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Offset Printing Cylinders */}
          <rect x="25" y="30" width="70" height="90" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <circle cx="50" cy="65" r="16" stroke="#0B2545" strokeWidth="1.5" />
          <circle cx="70" cy="85" r="16" stroke="#0E9F9A" strokeWidth="1.5" />
          <text x="60" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Multi-Color Offset</text>

          <path d="M110 75 H145" stroke="#0E9F9A" strokeWidth="2" />

          {/* Die-cutting / Creasing */}
          <rect x="160" y="25" width="80" height="95" rx="4" fill="#0B2545" fillOpacity="0.08" stroke="#0B2545" strokeWidth="1.5" />
          <rect x="175" y="45" width="50" height="50" stroke="#0B2545" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="175" y1="45" x2="225" y2="95" stroke="#D98E04" strokeWidth="1.5" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Die-Cutting Crease</text>

          <path d="M255 75 H290" stroke="#0E9F9A" strokeWidth="2" />

          {/* Rigid Box Gluing & Assembly */}
          <rect x="305" y="30" width="75" height="90" rx="4" fill="#0E9F9A" fillOpacity="0.08" stroke="#0E9F9A" strokeWidth="1.5" />
          <path d="M320 60 L345 45 L365 60 L365 85 L345 100 L320 85 Z" fill="#0B2545" fillOpacity="0.15" stroke="#0B2545" strokeWidth="1.5" />
          <text x="342" y="145" textAnchor="middle" fontSize="11" fill="#1F2937" fontWeight="500">Rigid Box Assembly</text>
        </svg>
      )}

      {type === 'workflow' && (
        <svg viewBox="0 0 600 160" className="w-full h-auto text-slate-700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Step 1 */}
          <circle cx="50" cy="50" r="28" fill="#0B2545" fillOpacity="0.1" stroke="#0B2545" strokeWidth="1.5" />
          <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#0B2545" fontWeight="700">01</text>
          <text x="50" y="105" textAnchor="middle" fontSize="12" fill="#1F2937" fontWeight="600">RFQ Intake</text>
          <text x="50" y="125" textAnchor="middle" fontSize="10" fill="#6B7280">Technical Review</text>

          <line x1="85" y1="50" x2="155" y2="50" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="4 2" />

          {/* Step 2 */}
          <circle cx="190" cy="50" r="28" fill="#0E9F9A" fillOpacity="0.12" stroke="#0E9F9A" strokeWidth="1.5" />
          <text x="190" y="55" textAnchor="middle" fontSize="14" fill="#0E9F9A" fontWeight="700">02</text>
          <text x="190" y="105" textAnchor="middle" fontSize="12" fill="#1F2937" fontWeight="600">Supplier Matching</text>
          <text x="190" y="125" textAnchor="middle" fontSize="10" fill="#6B7280">Regional Clusters</text>

          <line x1="225" y1="50" x2="295" y2="50" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="4 2" />

          {/* Step 3 */}
          <circle cx="330" cy="50" r="28" fill="#0B2545" fillOpacity="0.1" stroke="#0B2545" strokeWidth="1.5" />
          <text x="330" y="55" textAnchor="middle" fontSize="14" fill="#0B2545" fontWeight="700">03</text>
          <text x="330" y="105" textAnchor="middle" fontSize="12" fill="#1F2937" fontWeight="600">Sample & Quotes</text>
          <text x="330" y="125" textAnchor="middle" fontSize="10" fill="#6B7280">FOB Comparison</text>

          <line x1="365" y1="50" x2="435" y2="50" stroke="#0E9F9A" strokeWidth="2" strokeDasharray="4 2" />

          {/* Step 4 */}
          <circle cx="470" cy="50" r="28" fill="#D98E04" fillOpacity="0.1" stroke="#D98E04" strokeWidth="1.5" />
          <text x="470" y="55" textAnchor="middle" fontSize="14" fill="#D98E04" fontWeight="700">04</text>
          <text x="470" y="105" textAnchor="middle" fontSize="12" fill="#1F2937" fontWeight="600">Coordination</text>
          <text x="470" y="125" textAnchor="middle" fontSize="10" fill="#6B7280">Port Logistics</text>
        </svg>
      )}
    </div>
  );
};
