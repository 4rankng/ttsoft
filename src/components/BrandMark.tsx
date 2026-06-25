/** Shared TTSoft brand glyph + wordmark. Subtitle = official name. */
export function BrandMark({ subtitle = 'Giải pháp phần mềm Ting Ting' }: { subtitle?: string }) {
  return (
    <a className="brand" href="#dau-trang" aria-label="TTSoft — về đầu trang">
      <svg className="brand-mark" viewBox="0 0 42 42" aria-hidden="true">
        <path d="M8 9h26v7H24v17h-7V16H8z" />
        <path d="M25 20h9v13h-9z" opacity=".36" />
      </svg>
      <span className="brand-text">
        <strong>TTSoft</strong>
        <small>{subtitle}</small>
      </span>
    </a>
  );
}
