import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';

/** Fixed site header with scroll state, keyboard-accessible mobile menu. */
export function Header() {
  const [open, setOpen] = useState(false);

  // Close on Escape, matching main.js behavior.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header" data-header>
      <div className="container header-inner">
        <BrandMark />

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="menu-chinh"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Mở trình đơn</span>
          <span />
          <span />
        </button>

        <nav
          className={`main-nav${open ? ' is-open' : ''}`}
          id="menu-chinh"
          aria-label="Điều hướng chính"
          data-nav
        >
          <a href="#khac-biet" onClick={close}>Về TTSoft</a>
          <a href="#dich-vu" onClick={close}>Dịch vụ</a>
          <a href="#giai-phap" onClick={close}>Giải pháp</a>
          <a href="#quy-trinh" onClick={close}>Quy trình</a>
          <a className="button button-small button-primary" href="#lien-he" onClick={close}>
            Trao đổi dự án
          </a>
        </nav>
      </div>
    </header>
  );
}
