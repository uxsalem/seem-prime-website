/**
 * A fixed-frame image with a legible empty state — the Next equivalent of the `<image-slot>`
 * element the authoring tool provided. Where real artwork exists it is passed as `src`;
 * everywhere else the slot states, in the reader's language, what belongs there, so unfilled
 * frames stay obvious rather than collapsing to a blank box.
 *
 * Every call site wraps this in a `position:relative;overflow:clip` frame, so both states fill
 * their frame absolutely and crop against it.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  fit = 'cover',
}: {
  src?: string
  alt?: string
  placeholder: string
  fit?: 'cover' | 'contain'
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fluid frames, no intrinsic size to hand next/image
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit }}
      />
    )
  }

  return (
    <span
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        background: 'rgba(127,127,127,.08)',
        border: '1px dashed var(--line2)',
        textAlign: 'center',
        font: "13px/1.4 'IBM Plex Mono', monospace",
        color: 'var(--muted)',
      }}
    >
      {placeholder}
    </span>
  )
}
