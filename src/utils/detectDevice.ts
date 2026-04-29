/**
 * Detect device type for user agent data
 * @returns 'iphone' | 'ipad' | 'android' | 'other'
 * @see https://tech.every.tv/entry/2025/09/23/120000
 */
export async function detectDevice() {
  // @ts-expect-error: navigator.userAgentData is not yet in TypeScript DOM types
  if (navigator.userAgentData) {
    // @ts-expect-error: navigator.userAgentData is not yet in TypeScript DOM types
    const { platform, mobile } = navigator.userAgentData;
    if (platform === 'iOS' && mobile) return 'iphone';
    if (platform === 'iOS' && !mobile) return 'ipad';
    if (platform === 'Android') return mobile ? 'android' : 'other';
    return 'other';
  }

  const ua = navigator.userAgent;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isIpad = /iPad/.test(ua) || (/Macintosh/.test(ua) && isTouch);

  if (/iPhone/.test(ua)) return 'iphone';
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? 'android' : 'other';
  if (isIpad) return 'ipad';
  return 'other';
}
