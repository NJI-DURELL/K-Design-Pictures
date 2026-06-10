/** Join class names, dropping falsy values. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

/** Durell Njie -> DN, John Smith -> JS, single name -> first two letters. */
export function initials(name = '') {
  const clean = name.trim()
  if (!clean) return 'KD'
  const words = clean.split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/** Deterministic gold-tinted gradient seed from a string (for avatars). */
export function seedHue(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360
  return h
}

export function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return value
  }
}

/** Slugify a title for routes. */
export function slugify(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
