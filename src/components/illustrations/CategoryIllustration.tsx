import React from 'react';
import { CategoryImage } from '../../data/categories';

interface CategoryIllustrationProps {
  slug: string;
  variant?: 'card' | 'hero';
  image?: CategoryImage;
  className?: string;
}

export const CategoryIllustration: React.FC<CategoryIllustrationProps> = ({
  slug,
  variant = 'card',
  image,
  className = ''
}) => {
  // If a real photo is supplied, render the photo with its accurate caption
  if (image && image.src) {
    return (
      <figure className={`relative overflow-hidden ${variant === 'card' ? 'aspect-4/3 rounded-xl' : 'aspect-16/9 md:aspect-21/9 rounded-xl'} bg-slate-100 ${className}`}>
        <img
          src={image.src}
          alt={image.alt || 'Category representation'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {image.caption && (
          <figcaption className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 truncate">
            {image.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Color theme per category for gradient backgrounds
  const getBackgroundTheme = (categorySlug: string) => {
    switch (categorySlug) {
      case 'textiles-garments':
      case 'engineering-components':
      case 'auto-components':
      case 'granite-stone-ceramics':
        return 'from-[#0B2545]/10 via-[#0B2545]/5 to-[#F5F7FA]';
      case 'leather-goods':
      case 'bags-packaging':
      case 'pumps-electricals':
      case 'rubber-plastics':
        return 'from-[#0E9F9A]/15 via-[#0E9F9A]/5 to-[#F5F7FA]';
      case 'handicrafts-home-decor':
      case 'agricultural-products':
      case 'food-processing':
      case 'coir-natural-fibre':
      default:
        return 'from-[#D98E04]/15 via-[#D98E04]/5 to-[#F5F7FA]';
    }
  };

  const renderSvgScene = (sceneSlug: string) => {
    switch (sceneSlug) {
      case 'textiles-garments':
        return (
          // Folded fabric stack, thread spool, hanging shirt, loom lines
          <g>
            {/* Loom background lines */}
            <g stroke="#0B2545" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="40" y1="20" x2="40" y2="280" />
              <line x1="70" y1="20" x2="70" y2="280" />
              <line x1="100" y1="20" x2="100" y2="280" />
              <line x1="300" y1="20" x2="300" y2="280" />
              <line x1="330" y1="20" x2="330" y2="280" />
              <line x1="360" y1="20" x2="360" y2="280" />
            </g>
            {/* Folded fabric stack */}
            <g className="illustrative-float-1">
              <rect x="70" y="190" width="130" height="22" rx="4" fill="#0B2545" filter="url(#drop-shadow)" />
              <rect x="65" y="165" width="140" height="22" rx="4" fill="#0E9F9A" filter="url(#drop-shadow)" />
              <rect x="75" y="140" width="120" height="22" rx="4" fill="#D98E04" filter="url(#drop-shadow)" />
            </g>
            {/* Hanging shirt silhouette */}
            <g className="illustrative-float-2">
              {/* Hanger */}
              <path d="M220 70 L250 50 L280 70" fill="none" stroke="#D98E04" strokeWidth="3" strokeLinecap="round" />
              <path d="M250 50 C250 40 260 40 260 35" fill="none" stroke="#D98E04" strokeWidth="2.5" />
              {/* Shirt body */}
              <path
                d="M210 75 L235 70 L250 78 L265 70 L290 75 L305 105 L285 115 L280 95 L280 185 L220 185 L220 95 L215 115 L195 105 Z"
                fill="#0B2545"
                filter="url(#drop-shadow)"
              />
              <path d="M235 70 C240 85 260 85 265 70" fill="none" stroke="#F5F7FA" strokeWidth="2" />
              {/* Pocket detail */}
              <rect x="230" y="105" width="20" height="24" rx="2" fill="#0E9F9A" />
            </g>
            {/* Thread spool */}
            <g className="illustrative-float-3" transform="translate(240, 180)">
              <ellipse cx="60" cy="15" rx="22" ry="8" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2" />
              <rect x="42" y="15" width="36" height="50" fill="#0E9F9A" />
              <ellipse cx="60" cy="65" rx="22" ry="8" fill="#0B2545" />
              {/* Spool thread wraps */}
              <line x1="42" y1="28" x2="78" y2="28" stroke="#D98E04" strokeWidth="2" />
              <line x1="42" y1="38" x2="78" y2="38" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="42" y1="48" x2="78" y2="48" stroke="#D98E04" strokeWidth="2" />
            </g>
          </g>
        );

      case 'leather-goods':
        return (
          // Handbag, belt with buckle, shoe silhouette, stitching dashes
          <g>
            {/* Stitching dashes across background */}
            <path
              d="M30 50 Q 200 20 370 50"
              fill="none"
              stroke="#D98E04"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            {/* Handbag */}
            <g className="illustrative-float-1">
              {/* Handle */}
              <path
                d="M110 120 C110 50 170 50 170 120"
                fill="none"
                stroke="#0B2545"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Bag Body */}
              <path
                d="M80 120 L200 120 L215 210 L65 210 Z"
                fill="#0B2545"
                filter="url(#drop-shadow)"
              />
              {/* Bag Flap */}
              <path
                d="M80 120 L200 120 L190 165 L90 165 Z"
                fill="#0E9F9A"
              />
              {/* Clasp */}
              <rect x="133" y="158" width="14" height="14" rx="2" fill="#D98E04" />
              {/* Stitching on flap */}
              <path
                d="M93 160 L187 160"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </g>
            {/* Belt with buckle */}
            <g className="illustrative-float-2" transform="translate(190, 80)">
              <rect x="20" y="30" width="140" height="24" rx="3" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Buckle */}
              <rect x="10" y="24" width="30" height="36" rx="4" fill="none" stroke="#0B2545" strokeWidth="5" />
              <rect x="23" y="38" width="8" height="8" fill="#0B2545" />
              {/* Belt holes */}
              <circle cx="75" cy="42" r="3" fill="#0B2545" />
              <circle cx="95" cy="42" r="3" fill="#0B2545" />
              <circle cx="115" cy="42" r="3" fill="#0B2545" />
              <circle cx="135" cy="42" r="3" fill="#0B2545" />
            </g>
            {/* Shoe Silhouette */}
            <g className="illustrative-float-3" transform="translate(200, 150)">
              <path
                d="M10 50 C25 25 65 30 95 38 C120 45 140 40 150 50 C145 60 115 65 90 65 L20 65 C10 65 8 58 10 50 Z"
                fill="#0E9F9A"
                filter="url(#drop-shadow)"
              />
              <path d="M10 65 L50 65 L48 72 L12 72 Z" fill="#0B2545" />
              <path d="M50 65 L145 65 L140 70 L50 70 Z" fill="#0B2545" />
            </g>
          </g>
        );

      case 'bags-packaging':
        return (
          // Tote bag, cardboard box, shopping bag
          <g>
            {/* Cardboard Box */}
            <g className="illustrative-float-1" transform="translate(60, 110)">
              {/* Left face */}
              <polygon points="10,40 60,70 60,130 10,100" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Right face */}
              <polygon points="60,70 120,40 120,100 60,130" fill="#0B2545" />
              {/* Top face */}
              <polygon points="10,40 60,10 120,40 60,70" fill="#F5F7FA" stroke="#D98E04" strokeWidth="2" />
              {/* Packing tape strip */}
              <polygon points="50,15 70,25 70,125 50,115" fill="#0E9F9A" opacity="0.85" />
            </g>
            {/* Canvas Tote Bag */}
            <g className="illustrative-float-2" transform="translate(180, 50)">
              {/* Bag Handles */}
              <path
                d="M40 70 C40 20 80 20 80 70"
                fill="none"
                stroke="#0E9F9A"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Bag Body */}
              <path
                d="M20 70 L100 70 L95 160 L25 160 Z"
                fill="#F5F7FA"
                stroke="#0B2545"
                strokeWidth="2.5"
                filter="url(#drop-shadow)"
              />
              {/* Tote Accent block */}
              <rect x="24" y="115" width="73" height="42" fill="#0E9F9A" />
              {/* Pocket line */}
              <line x1="38" y1="95" x2="82" y2="95" stroke="#D98E04" strokeWidth="2" strokeDasharray="3 2" />
            </g>
            {/* Shopping Bag with die-cut handle */}
            <g className="illustrative-float-3" transform="translate(280, 100)">
              <rect x="10" y="30" width="75" height="95" rx="5" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Die-cut handle */}
              <rect x="30" y="44" width="35" height="10" rx="5" fill="#F5F7FA" />
              <circle cx="47" cy="88" r="16" fill="#D98E04" />
            </g>
          </g>
        );

      case 'engineering-components':
        return (
          // Gear, bolt and nut, CNC-part block with holes, metal plate
          <g>
            {/* Metal Plate Base */}
            <g transform="translate(50, 140)">
              <rect x="10" y="30" width="300" height="70" rx="6" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2.5" filter="url(#drop-shadow)" />
              <circle cx="35" cy="65" r="7" fill="#0B2545" />
              <circle cx="75" cy="65" r="7" fill="#0B2545" />
              <circle cx="245" cy="65" r="7" fill="#0B2545" />
              <circle cx="285" cy="65" r="7" fill="#0B2545" />
              <line x1="110" y1="65" x2="210" y2="65" stroke="#0E9F9A" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Gear */}
            <g className="illustrative-float-1" transform="translate(130, 40)">
              <circle cx="60" cy="60" r="42" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Gear Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="53"
                  y="10"
                  width="14"
                  height="16"
                  rx="2"
                  fill="#0B2545"
                  transform={`rotate(${angle} 60 60)`}
                />
              ))}
              <circle cx="60" cy="60" r="22" fill="#0E9F9A" />
              <circle cx="60" cy="60" r="10" fill="#F5F7FA" />
            </g>
            {/* Bolt & Hex Nut */}
            <g className="illustrative-float-2" transform="translate(60, 50)">
              {/* Hex Head */}
              <polygon points="35,20 55,10 75,20 75,40 55,50 35,40" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Bolt Shaft with threads */}
              <rect x="47" y="45" width="16" height="55" fill="#0B2545" />
              <line x1="47" y1="55" x2="63" y2="55" stroke="#F5F7FA" strokeWidth="2" />
              <line x1="47" y1="65" x2="63" y2="65" stroke="#F5F7FA" strokeWidth="2" />
              <line x1="47" y1="75" x2="63" y2="75" stroke="#F5F7FA" strokeWidth="2" />
              <line x1="47" y1="85" x2="63" y2="85" stroke="#F5F7FA" strokeWidth="2" />
              {/* Nut */}
              <polygon points="40,80 55,72 70,80 70,95 55,103 40,95" fill="#0E9F9A" />
            </g>
            {/* CNC Machined Block */}
            <g className="illustrative-float-3" transform="translate(250, 70)">
              <polygon points="20,30 70,10 110,35 60,55" fill="#0E9F9A" />
              <polygon points="20,30 60,55 60,100 20,75" fill="#0B2545" filter="url(#drop-shadow)" />
              <polygon points="60,55 110,35 110,80 60,100" fill="#D98E04" />
              <circle cx="60" cy="33" r="6" fill="#0B2545" />
            </g>
          </g>
        );

      case 'auto-components':
        return (
          // Wheel and brake disc, piston, spark-plug shape
          <g>
            {/* Brake Disc with Caliper */}
            <g className="illustrative-float-1" transform="translate(60, 50)">
              {/* Disc Rotor */}
              <circle cx="90" cy="90" r="70" fill="#F5F7FA" stroke="#0B2545" strokeWidth="4" filter="url(#drop-shadow)" />
              <circle cx="90" cy="90" r="50" fill="none" stroke="#0B2545" strokeWidth="2" strokeDasharray="8 6" />
              {/* Ventilation holes */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={90 + 35 * Math.cos((deg * Math.PI) / 180)}
                  cy={90 + 35 * Math.sin((deg * Math.PI) / 180)}
                  r="3.5"
                  fill="#0B2545"
                />
              ))}
              <circle cx="90" cy="90" r="22" fill="#0B2545" />
              <circle cx="90" cy="90" r="10" fill="#F5F7FA" />
              {/* Brake Caliper */}
              <path
                d="M130 35 C160 55 160 115 130 135 L115 125 C135 110 135 70 115 50 Z"
                fill="#D98E04"
                filter="url(#drop-shadow)"
              />
            </g>
            {/* Piston Assembly */}
            <g className="illustrative-float-2" transform="translate(230, 45)">
              {/* Piston Crown */}
              <rect x="20" y="20" width="60" height="45" rx="3" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Piston Rings */}
              <line x1="20" y1="28" x2="80" y2="28" stroke="#0E9F9A" strokeWidth="2" />
              <line x1="20" y1="36" x2="80" y2="36" stroke="#0E9F9A" strokeWidth="2" />
              {/* Gudgeon Pin */}
              <circle cx="50" cy="48" r="7" fill="#F5F7FA" />
              {/* Connecting Rod */}
              <path d="M44 55 L44 125 L36 135 L64 135 L56 125 L56 55 Z" fill="#0E9F9A" />
              {/* Big end */}
              <circle cx="50" cy="140" r="16" fill="none" stroke="#D98E04" strokeWidth="5" />
            </g>
            {/* Spark Plug Shape */}
            <g className="illustrative-float-3" transform="translate(305, 100)">
              {/* Insulator Ribs */}
              <rect x="25" y="10" width="16" height="30" rx="3" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2" />
              <line x1="22" y1="18" x2="44" y2="18" stroke="#0B2545" strokeWidth="2" />
              <line x1="22" y1="26" x2="44" y2="26" stroke="#0B2545" strokeWidth="2" />
              {/* Hex Body */}
              <polygon points="20,40 46,40 50,55 16,55" fill="#D98E04" />
              {/* Threaded Section */}
              <rect x="23" y="55" width="20" height="25" fill="#0B2545" />
              <line x1="23" y1="62" x2="43" y2="62" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="23" y1="70" x2="43" y2="70" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Electrode */}
              <path d="M33 80 L33 90 L26 90" fill="none" stroke="#0E9F9A" strokeWidth="2.5" />
            </g>
          </g>
        );

      case 'pumps-electricals':
        return (
          // Pump body with pipes, motor with coil, cable reel
          <g>
            {/* Centrifugal Pump Body with In/Outlet Pipes */}
            <g className="illustrative-float-1" transform="translate(60, 60)">
              {/* Volute Casing (spiral body) */}
              <circle cx="80" cy="90" r="50" fill="#0B2545" filter="url(#drop-shadow)" />
              <circle cx="80" cy="90" r="30" fill="#0E9F9A" />
              <circle cx="80" cy="90" r="14" fill="#F5F7FA" />
              {/* Impeller Blades */}
              {[0, 60, 120, 180, 240, 300].map((ang) => (
                <path
                  key={ang}
                  d={`M80 90 Q ${80 + 25 * Math.cos(((ang + 30) * Math.PI) / 180)} ${90 + 25 * Math.sin(((ang + 30) * Math.PI) / 180)} ${80 + 30 * Math.cos((ang * Math.PI) / 180)} ${90 + 30 * Math.sin((ang * Math.PI) / 180)}`}
                  fill="none"
                  stroke="#0B2545"
                  strokeWidth="2.5"
                />
              ))}
              {/* Discharge Pipe (Vertical) */}
              <rect x="70" y="10" width="22" height="40" fill="#0B2545" />
              <rect x="63" y="8" width="36" height="8" rx="2" fill="#D98E04" />
              {/* Suction Pipe (Horizontal) */}
              <rect x="10" y="80" width="30" height="22" fill="#0B2545" />
              <rect x="8" y="74" width="8" height="34" rx="2" fill="#D98E04" />
            </g>
            {/* Electric Motor with Cooling Fins */}
            <g className="illustrative-float-2" transform="translate(195, 75)">
              <rect x="20" y="30" width="90" height="70" rx="6" fill="#0E9F9A" filter="url(#drop-shadow)" />
              {/* Cooling Fins */}
              <line x1="35" y1="20" x2="35" y2="30" stroke="#0B2545" strokeWidth="4" />
              <line x1="50" y1="20" x2="50" y2="30" stroke="#0B2545" strokeWidth="4" />
              <line x1="65" y1="20" x2="65" y2="30" stroke="#0B2545" strokeWidth="4" />
              <line x1="80" y1="20" x2="80" y2="30" stroke="#0B2545" strokeWidth="4" />
              <line x1="95" y1="20" x2="95" y2="30" stroke="#0B2545" strokeWidth="4" />
              {/* Terminal Box on top */}
              <rect x="45" y="12" width="35" height="18" rx="2" fill="#D98E04" />
              {/* Drive Shaft */}
              <rect x="110" y="58" width="25" height="14" rx="2" fill="#0B2545" />
            </g>
            {/* Cable Reel / Coil */}
            <g className="illustrative-float-3" transform="translate(290, 130)">
              <ellipse cx="40" cy="25" rx="30" ry="12" fill="#0B2545" />
              <rect x="10" y="25" width="60" height="35" fill="#D98E04" />
              <ellipse cx="40" cy="60" rx="30" ry="12" fill="#0B2545" />
              <path d="M15 35 Q 40 45 65 35" fill="none" stroke="#F5F7FA" strokeWidth="2.5" />
              <path d="M15 48 Q 40 58 65 48" fill="none" stroke="#F5F7FA" strokeWidth="2.5" />
            </g>
          </g>
        );

      case 'rubber-plastics':
        return (
          // O-rings, moulded part, container
          <g>
            {/* Moulded Plastic Storage Container */}
            <g className="illustrative-float-1" transform="translate(60, 80)">
              {/* Lid */}
              <rect x="15" y="20" width="110" height="15" rx="3" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Container Tub */}
              <polygon points="25,35 115,35 105,120 35,120" fill="#0E9F9A" filter="url(#drop-shadow)" />
              {/* Rib reinforcement */}
              <line x1="30" y1="65" x2="110" y2="65" stroke="#F5F7FA" strokeWidth="2.5" strokeOpacity="0.8" />
              <line x1="33" y1="95" x2="107" y2="95" stroke="#F5F7FA" strokeWidth="2.5" strokeOpacity="0.8" />
            </g>
            {/* Interlocking O-Rings (Rubber Seals) */}
            <g className="illustrative-float-2" transform="translate(180, 60)">
              {/* Large O-Ring */}
              <circle cx="55" cy="55" r="45" fill="none" stroke="#0B2545" strokeWidth="12" filter="url(#drop-shadow)" />
              {/* Medium O-Ring (Teal) */}
              <circle cx="95" cy="85" r="35" fill="none" stroke="#0E9F9A" strokeWidth="10" filter="url(#drop-shadow)" />
              {/* Small Amber Ring */}
              <circle cx="55" cy="115" r="24" fill="none" stroke="#D98E04" strokeWidth="8" />
            </g>
            {/* Moulded Precision Plastic Bracket */}
            <g className="illustrative-float-3" transform="translate(255, 60)">
              <path
                d="M20 20 L75 20 L75 45 L50 45 L50 110 L20 110 Z"
                fill="#D98E04"
                filter="url(#drop-shadow)"
              />
              <circle cx="35" cy="32" r="5" fill="#FFFFFF" />
              <circle cx="35" cy="75" r="5" fill="#FFFFFF" />
              <circle cx="35" cy="95" r="5" fill="#FFFFFF" />
            </g>
          </g>
        );

      case 'handicrafts-home-decor':
        return (
          // Decorative lamp, vase, woven basket, carved motif
          <g>
            {/* Woven Basket */}
            <g className="illustrative-float-1" transform="translate(60, 100)">
              <path
                d="M15 30 L115 30 L100 110 L30 110 Z"
                fill="#D98E04"
                filter="url(#drop-shadow)"
              />
              {/* Weave pattern lines */}
              <path d="M20 55 L110 55 M25 80 L105 80" stroke="#0B2545" strokeWidth="2.5" />
              <path d="M45 30 L38 110 M70 30 L65 110 M90 30 L88 110" stroke="#0B2545" strokeWidth="2" strokeDasharray="4 3" />
            </g>
            {/* Elegant Ceramic / Terracotta Vase */}
            <g className="illustrative-float-2" transform="translate(170, 45)">
              <path
                d="M45 20 L75 20 L70 35 C85 55 100 75 95 115 C90 145 75 160 60 160 C45 160 30 145 25 115 C20 75 35 55 50 35 Z"
                fill="#0E9F9A"
                filter="url(#drop-shadow)"
              />
              <ellipse cx="60" cy="20" rx="15" ry="5" fill="#F5F7FA" stroke="#0E9F9A" strokeWidth="2" />
              <path d="M30 100 Q 60 115 90 100" stroke="#D98E04" strokeWidth="3" fill="none" />
              <path d="M32 115 Q 60 130 88 115" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            </g>
            {/* Traditional Decorative Hanging Brass Lamp (Diya / Kuthuvilakku Motif) */}
            <g className="illustrative-float-3" transform="translate(270, 40)">
              {/* Chain */}
              <line x1="45" y1="10" x2="45" y2="60" stroke="#D98E04" strokeWidth="2.5" strokeDasharray="3 3" />
              {/* Lamp Top */}
              <polygon points="25,60 65,60 55,75 35,75" fill="#0B2545" />
              {/* Lamp Bowl */}
              <path d="M15 85 Q 45 125 75 85 Z" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Flame Motif */}
              <path d="M45 55 C38 70 42 78 45 82 C48 78 52 70 45 55 Z" fill="#0E9F9A" />
              {/* Hanging Bells / Droplets */}
              <circle cx="20" cy="95" r="4" fill="#D98E04" />
              <circle cx="45" cy="115" r="5" fill="#D98E04" />
              <circle cx="70" cy="95" r="4" fill="#D98E04" />
            </g>
          </g>
        );

      case 'agricultural-products':
        return (
          // Moringa leaves, spice bowl, sacks, sprouts
          <g>
            {/* Burlap Sack */}
            <g className="illustrative-float-1" transform="translate(60, 90)">
              {/* Tied Neck */}
              <ellipse cx="60" cy="28" rx="20" ry="8" fill="#D98E04" />
              <rect x="52" y="24" width="16" height="8" rx="2" fill="#0B2545" />
              {/* Sack Body */}
              <path
                d="M40 32 C15 60 10 110 30 130 C45 135 75 135 90 130 C110 110 105 60 80 32 Z"
                fill="#D98E04"
                filter="url(#drop-shadow)"
              />
              <path d="M35 80 Q 60 95 85 80" stroke="#0B2545" strokeWidth="2" strokeDasharray="4 3" fill="none" />
            </g>
            {/* Spice Bowl with aromatic mound */}
            <g className="illustrative-float-2" transform="translate(170, 100)">
              {/* Turmeric / Spice Mound */}
              <path d="M20 40 Q 60 5 100 40 Z" fill="#D98E04" />
              {/* Bowl */}
              <path d="M10 40 Q 60 95 110 40 Z" fill="#0B2545" filter="url(#drop-shadow)" />
              <ellipse cx="60" cy="40" rx="50" ry="8" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2" />
              {/* Spice Powder Accent */}
              <ellipse cx="60" cy="38" rx="36" ry="6" fill="#0E9F9A" />
            </g>
            {/* Botanical Moringa Leaves / Organic Sprouts Branch */}
            <g className="illustrative-float-3" transform="translate(230, 30)">
              <path d="M20 120 Q 70 80 120 20" stroke="#0E9F9A" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Pairs of round leaflets */}
              <ellipse cx="45" cy="85" rx="10" ry="14" fill="#0E9F9A" transform="rotate(-35 45 85)" />
              <ellipse cx="70" cy="98" rx="10" ry="14" fill="#0B2545" transform="rotate(45 70 98)" />
              <ellipse cx="72" cy="62" rx="9" ry="13" fill="#0E9F9A" transform="rotate(-40 72 62)" />
              <ellipse cx="94" cy="74" rx="9" ry="13" fill="#D98E04" transform="rotate(50 94 74)" />
              <ellipse cx="98" cy="38" rx="8" ry="12" fill="#0E9F9A" transform="rotate(-30 98 38)" />
              <ellipse cx="118" cy="46" rx="8" ry="12" fill="#0E9F9A" transform="rotate(60 118 46)" />
              <ellipse cx="124" cy="18" rx="7" ry="10" fill="#D98E04" />
            </g>
          </g>
        );

      case 'food-processing':
        return (
          // Jars, packet, spice bowl, wheat sprig
          <g>
            {/* Processed Glass Jar with sealed lid */}
            <g className="illustrative-float-1" transform="translate(60, 70)">
              {/* Lid */}
              <rect x="25" y="15" width="50" height="12" rx="3" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Jar Body */}
              <rect x="18" y="27" width="64" height="85" rx="8" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2.5" filter="url(#drop-shadow)" />
              {/* Label */}
              <rect x="24" y="48" width="52" height="42" rx="3" fill="#0E9F9A" />
              <line x1="30" y1="62" x2="70" y2="62" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="30" y1="72" x2="62" y2="72" stroke="#FFFFFF" strokeWidth="2" />
            </g>
            {/* Sealed Flexible Food Packet */}
            <g className="illustrative-float-2" transform="translate(160, 55)">
              <path
                d="M15 15 L85 15 L80 125 L20 125 Z"
                fill="#0B2545"
                filter="url(#drop-shadow)"
              />
              {/* Crimped top & bottom edges */}
              <line x1="15" y1="18" x2="85" y2="18" stroke="#D98E04" strokeWidth="3" strokeDasharray="3 2" />
              <line x1="20" y1="122" x2="80" y2="122" stroke="#D98E04" strokeWidth="3" strokeDasharray="3 2" />
              {/* Front Badge */}
              <circle cx="50" cy="65" r="20" fill="#0E9F9A" />
              <circle cx="50" cy="65" r="10" fill="#F5F7FA" />
            </g>
            {/* Grain / Wheat Sprig */}
            <g className="illustrative-float-3" transform="translate(260, 50)">
              <line x1="40" y1="130" x2="40" y2="20" stroke="#D98E04" strokeWidth="2.5" />
              {[30, 50, 70, 90].map((y) => (
                <React.Fragment key={y}>
                  <ellipse cx="28" cy={y} rx="12" ry="6" fill="#D98E04" transform={`rotate(-30 28 ${y})`} />
                  <ellipse cx="52" cy={y} rx="12" ry="6" fill="#D98E04" transform={`rotate(30 52 ${y})`} />
                </React.Fragment>
              ))}
              <ellipse cx="40" cy="15" rx="6" ry="12" fill="#D98E04" />
            </g>
          </g>
        );

      case 'coir-natural-fibre':
        return (
          // Coir mat texture, rope coil, coconut halves, grow bag
          <g>
            {/* Woven Coir Mat Texture Base */}
            <g className="illustrative-float-1" transform="translate(60, 110)">
              <rect x="10" y="20" width="130" height="85" rx="5" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Coir cross-weave lines */}
              <line x1="10" y1="42" x2="140" y2="42" stroke="#0B2545" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="10" y1="64" x2="140" y2="64" stroke="#0B2545" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="10" y1="85" x2="140" y2="85" stroke="#0B2545" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="45" y1="20" x2="45" y2="105" stroke="#F5F7FA" strokeWidth="2" strokeDasharray="5 3" />
              <line x1="80" y1="20" x2="80" y2="105" stroke="#F5F7FA" strokeWidth="2" strokeDasharray="5 3" />
              <line x1="115" y1="20" x2="115" y2="105" stroke="#F5F7FA" strokeWidth="2" strokeDasharray="5 3" />
            </g>
            {/* Coconut Shell Halves */}
            <g className="illustrative-float-2" transform="translate(195, 60)">
              {/* Outer husk */}
              <circle cx="50" cy="50" r="36" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Inner kernel white rim */}
              <circle cx="50" cy="50" r="28" fill="#F5F7FA" />
              {/* Hollow interior */}
              <circle cx="50" cy="50" r="20" fill="#0E9F9A" />
            </g>
            {/* Coir Rope Coil */}
            <g className="illustrative-float-3" transform="translate(230, 115)">
              <ellipse cx="60" cy="50" rx="48" ry="24" fill="none" stroke="#D98E04" strokeWidth="9" filter="url(#drop-shadow)" />
              <ellipse cx="60" cy="45" rx="36" ry="18" fill="none" stroke="#0B2545" strokeWidth="8" />
              <ellipse cx="60" cy="40" rx="24" ry="12" fill="none" stroke="#D98E04" strokeWidth="7" />
              {/* Sprout emerging from coco peat */}
              <path d="M60 40 Q 65 15 80 10" stroke="#0E9F9A" strokeWidth="3" fill="none" />
              <ellipse cx="82" cy="10" rx="8" ry="4" fill="#0E9F9A" transform="rotate(-20 82 10)" />
            </g>
          </g>
        );

      case 'granite-stone-ceramics':
        return (
          // Stone slab layers, tile grid, terracotta pot
          <g>
            {/* Stack of Polished Granite Slabs */}
            <g className="illustrative-float-1" transform="translate(60, 110)">
              {/* Bottom slab */}
              <polygon points="10,50 110,25 150,55 50,80" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* Middle slab */}
              <polygon points="10,35 110,10 150,40 50,65" fill="#0E9F9A" filter="url(#drop-shadow)" />
              {/* Top slab with speckled granite texture */}
              <polygon points="10,20 110,-5 150,25 50,50" fill="#F5F7FA" stroke="#0B2545" strokeWidth="2" />
              <circle cx="50" cy="25" r="2" fill="#0B2545" />
              <circle cx="85" cy="18" r="2.5" fill="#0B2545" />
              <circle cx="110" cy="22" r="2" fill="#0B2545" />
              <circle cx="70" cy="35" r="2" fill="#0B2545" />
            </g>
            {/* Tile Grid */}
            <g className="illustrative-float-2" transform="translate(195, 40)">
              <rect x="20" y="20" width="80" height="80" rx="4" fill="#0B2545" filter="url(#drop-shadow)" />
              {/* 4 Tile squares */}
              <rect x="25" y="25" width="32" height="32" rx="2" fill="#F5F7FA" />
              <rect x="63" y="25" width="32" height="32" rx="2" fill="#0E9F9A" />
              <rect x="25" y="63" width="32" height="32" rx="2" fill="#D98E04" />
              <rect x="63" y="63" width="32" height="32" rx="2" fill="#F5F7FA" />
            </g>
            {/* Terracotta Pot */}
            <g className="illustrative-float-3" transform="translate(270, 95)">
              {/* Pot Rim */}
              <ellipse cx="45" cy="20" rx="30" ry="7" fill="#D98E04" filter="url(#drop-shadow)" />
              {/* Pot Body */}
              <path
                d="M18 20 C10 45 15 75 25 90 C32 98 58 98 65 90 C75 75 80 45 72 20 Z"
                fill="#D98E04"
                filter="url(#drop-shadow)"
              />
              <path d="M22 45 Q 45 60 68 45" stroke="#0B2545" strokeWidth="2.5" fill="none" />
              <ellipse cx="45" cy="19" rx="20" ry="4" fill="#0B2545" />
            </g>
          </g>
        );

      default:
        return (
          <g transform="translate(150, 80)">
            <circle cx="50" cy="50" r="45" fill="#0B2545" />
            <circle cx="50" cy="50" r="25" fill="#0E9F9A" />
          </g>
        );
    }
  };

  const bgGradient = getBackgroundTheme(slug);

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${bgGradient} border border-slate-200/80 ${
        variant === 'card' ? 'aspect-4/3 rounded-xl' : 'aspect-16/9 md:aspect-21/9 rounded-xl'
      } ${className}`}
    >
      {/* Background subtle geometric grid lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Inline SVG Scene */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full object-contain select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0B2545" floodOpacity="0.14" />
          </filter>
        </defs>

        {renderSvgScene(slug)}
      </svg>

      {/* Mandatory Small Illustrative Pill in bottom corner */}
      <div className="absolute bottom-2.5 end-2.5 z-10 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 text-[10px] font-semibold tracking-wide text-slate-500 shadow-xs pointer-events-none uppercase">
        Illustrative
      </div>
    </div>
  );
};
