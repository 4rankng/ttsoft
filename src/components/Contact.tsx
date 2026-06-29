import { useEffect, useRef, useState } from 'react';

const NEED_OPTIONS = [
  'Phần mềm theo yêu cầu',
  'Tự động hóa quy trình',
  'Dữ liệu và AI',
  'Vận hành và bảo trì',
  'Chưa xác định — cần tư vấn',
] as const;

/**
 * Netlify form, name "yeu-cau-du-an". A hidden static copy lives in index.html
 * so Netlify's build-time bot registers the form. This visible React form posts
 * the same fields as URL-encoded data (Netlify's required encoding for SPA
 * forms) and redirects to /cam-on.html on success.
 */
export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [need, setNeed] = useState('');
  const [needOpen, setNeedOpen] = useState(false);
  const [needTouched, setNeedTouched] = useState(false);
  const needRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!needRef.current?.contains(event.target as Node)) setNeedOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNeedOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNeedTouched(true);
    if (!need) {
      setNeedOpen(true);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify requires form-name in the body for SPA submissions.
    data.append('form-name', 'yeu-cau-du-an');

    try {
      setSubmitting(true);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        window.location.href = '/cam-on.html';
      } else {
        // Fallback: let the browser do a native full-page submit.
        form.removeAttribute('data-react-submit');
        form.submit();
      }
    } catch {
      // Network error fallback: native submit.
      form.submit();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact" id="lien-he">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <p className="kicker">Bắt đầu từ một cuộc trò chuyện</p>
          <h2>Không biết bắt đầu từ đâu? Cùng nhau tìm ra.</h2>
          <p>
            Chia sẻ bài toán hiện tại — dù chỉ là 'đang kẹt ở Excel'. Ting Ting
            Soft sẽ cùng bạn tìm bước đầu tiên rõ ràng, khả thi, không áp lực.
          </p>
          <div className="contact-points">
            <span><i>01</i> Phản hồi thẳng thắn, không bán hàng</span>
            <span><i>02</i> Bảo mật thông tin doanh nghiệp</span>
            <span><i>03</i> Đề xuất bước đầu tiên trong tầm tay</span>
          </div>
          <a className="contact-email" href="mailto:tingtingsoft.vn@gmail.com">
            tingtingsoft.vn@gmail.com <span>↗</span>
          </a>
        </div>

        <form
          className="contact-form reveal"
          name="yeu-cau-du-an"
          method="POST"
          data-netlify="true"
          netlify-honeypot="truong-khong-dien"
          action="/cam-on.html"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="yeu-cau-du-an" />
          <p className="hidden">
            <label>Không điền trường này: <input name="truong-khong-dien" /></label>
          </p>
          <div className="field-row">
            <label>
              Họ và tên
              <input type="text" name="ho-ten" autoComplete="name" required placeholder="Nguyễn Văn A" />
            </label>
            <label>
              Email liên hệ
              <input type="email" name="email" autoComplete="email" required placeholder="ban@email.com" />
            </label>
          </div>
          <div className="field-row">
            <label>
              Tên doanh nghiệp
              <input type="text" name="doanh-nghiep" autoComplete="organization" placeholder="Tên doanh nghiệp" />
            </label>
            <label>
              Số điện thoại
              <input type="tel" name="so-dien-thoai" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" />
            </label>
          </div>
          <div className="form-field">
            <span className="field-label">Bạn đang cần giải quyết</span>
            <div className={`custom-select${needOpen ? ' is-open' : ''}${needTouched && !need ? ' has-error' : ''}`} ref={needRef}>
              <input type="hidden" name="nhu-cau" value={need} />
              <button
                className="select-trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={needOpen}
                aria-controls="need-options"
                onClick={() => {
                  setNeedOpen((v) => !v);
                }}
              >
                <span className={need ? '' : 'select-placeholder'}>
                  {need || 'Chọn một nhu cầu'}
                </span>
                <span className="select-chevron" aria-hidden="true" />
              </button>
              <div className="select-menu" id="need-options" role="listbox" aria-label="Bạn đang cần giải quyết">
                {NEED_OPTIONS.map((option) => (
                  <button
                    className={`select-option${need === option ? ' is-selected' : ''}`}
                    type="button"
                    role="option"
                    aria-selected={need === option}
                    key={option}
                    onClick={() => {
                      setNeed(option);
                      setNeedTouched(true);
                      setNeedOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="field-error">Vui lòng chọn một nhu cầu.</p>
            </div>
          </div>
          <label>
            Mô tả ngắn bài toán
            <textarea name="mo-ta" rows={5} required placeholder="Ví dụ: đang quản lý đơn hàng bằng Excel, muốn tự động hóa..." />
          </label>
          <button className="button button-primary form-submit" type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi...' : <>Gửi nhu cầu của bạn <span aria-hidden="true">↗</span></>}
          </button>
          <p className="form-note">
            Bằng cách gửi biểu mẫu, bạn đồng ý để Ting Ting Soft liên hệ về nhu
            cầu này — không cam kết nào khác.
          </p>
        </form>
      </div>
    </section>
  );
}
