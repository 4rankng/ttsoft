/** Shared Ting Ting Soft brand mark + wordmark. Subtitle = official name. */
export function BrandMark({ subtitle = 'Công ty TNHH Giải Pháp Phần Mềm Ting Ting' }: { subtitle?: string }) {
  return (
    <a className="brand" href="#dau-trang" aria-label="Ting Ting Soft — về đầu trang">
      <img className="brand-mark" src="/favicon.png" width="42" height="42" alt="" aria-hidden="true" />
      <span className="brand-text">
        <strong>Ting Ting Soft</strong>
        <small>{subtitle}</small>
      </span>
    </a>
  );
}
