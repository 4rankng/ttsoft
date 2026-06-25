import { useState } from 'react';

const NEED_OPTIONS = [
  'Phần mềm theo yêu cầu',
  'Tự động hóa và tích hợp',
  'Dữ liệu và AI',
  'Đám mây và hiện đại hóa',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <h2>Ý tưởng tốt cần một đội ngũ đúng.</h2>
          <p>
            Chia sẻ bài toán của bạn. TTSoft sẽ cùng xác định phạm vi, hướng tiếp
            cận và bước đi khả thi đầu tiên.
          </p>
          <div className="contact-points">
            <span><i>01</i> Phản hồi rõ ràng, không bán hàng vòng vo</span>
            <span><i>02</i> Bảo mật thông tin dự án</span>
            <span><i>03</i> Đề xuất bước tiếp theo có thể thực hiện</span>
          </div>
          <a className="contact-email" href="mailto:hello@ttsoft.vn">
            hello@ttsoft.vn <span>↗</span>
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
              Email công việc
              <input type="email" name="email" autoComplete="email" required placeholder="ban@congty.vn" />
            </label>
          </div>
          <div className="field-row">
            <label>
              Tổ chức / doanh nghiệp
              <input type="text" name="doanh-nghiep" autoComplete="organization" placeholder="Tên doanh nghiệp" />
            </label>
            <label>
              Số điện thoại
              <input type="tel" name="so-dien-thoai" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" />
            </label>
          </div>
          <label>
            Bạn cần hỗ trợ về
            <select name="nhu-cau" required defaultValue="">
              <option value="" disabled>Chọn một hạng mục</option>
              {NEED_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label>
            Mô tả ngắn bài toán
            <textarea name="mo-ta" rows={5} required placeholder="Quy trình hiện tại, điểm nghẽn và kết quả bạn muốn đạt..." />
          </label>
          <button className="button button-primary form-submit" type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi...' : <>Gửi yêu cầu dự án <span aria-hidden="true">↗</span></>}
          </button>
          <p className="form-note">
            Bằng cách gửi biểu mẫu, bạn đồng ý để TTSoft liên hệ về yêu cầu này.
          </p>
        </form>
      </div>
    </section>
  );
}
