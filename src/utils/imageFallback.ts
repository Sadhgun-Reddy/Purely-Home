/**
 * Image error handler and fallback data URL
 */
export const FALLBACK_FOOD_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#f8ece1"/>
      <circle cx="200" cy="130" r="50" fill="#ede1cb" />
      <path d="M175 145 C175 160 225 160 225 145 Z" fill="#9d4225" />
      <path d="M185 110 C185 100 200 95 200 85 C200 95 215 100 215 110" stroke="#1a3c2c" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="50%" y="220" text-anchor="middle" fill="#594e42" font-family="sans-serif" font-size="14" font-weight="600">Purely Home Kitchen</text>
    </svg>
  `.trim());

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_FOOD_IMAGE) {
    target.src = FALLBACK_FOOD_IMAGE;
  }
};
