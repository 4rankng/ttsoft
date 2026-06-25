export function Principles() {
  return (
    <section className="section section-intro" id="khac-biet">
      <div className="container">
        <div className="section-heading reveal">
          <p className="kicker">Cách TTSoft tạo khác biệt</p>
          <h2>Vấn đề đúng. Kiến trúc đúng. <span>Kết quả bền vững.</span></h2>
          <p>
            Thay vì bắt đầu bằng một danh sách công nghệ, chúng tôi bắt đầu từ luồng
            công việc, dữ liệu, người dùng và kết quả kinh doanh cần đạt.
          </p>
        </div>

        <div className="principles-grid">
          <article className="principle-card reveal">
            <div className="card-number">01</div>
            <div className="icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" /><circle cx="12" cy="12" r="7" /></svg>
            </div>
            <h3>Đúng bài toán</h3>
            <p>Làm rõ điểm nghẽn, người dùng và thước đo thành công trước khi thiết kế giải pháp.</p>
            <span className="card-meta">Khám phá · Chiến lược</span>
          </article>
          <article className="principle-card reveal" data-delay="1">
            <div className="card-number">02</div>
            <div className="icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="7" height="7" rx="1" />
                <rect x="13" y="4" width="7" height="7" rx="1" />
                <rect x="4" y="13" width="7" height="7" rx="1" />
                <path d="M16.5 14v5M14 16.5h5" />
              </svg>
            </div>
            <h3>Sẵn sàng mở rộng</h3>
            <p>Kiến trúc mô-đun, bảo mật và khả năng tích hợp được tính từ nền móng đầu tiên.</p>
            <span className="card-meta">Kiến trúc · Nền tảng</span>
          </article>
          <article className="principle-card reveal" data-delay="2">
            <div className="card-number">03</div>
            <div className="icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 3 7-8" /><path d="M15 7h5v5" /></svg>
            </div>
            <h3>Minh bạch tiến độ</h3>
            <p>Mỗi chu kỳ phát triển có bản dùng thử, tiêu chí nghiệm thu và quyết định dựa trên dữ liệu.</p>
            <span className="card-meta">Thực thi · Đo lường</span>
          </article>
        </div>
      </div>
    </section>
  );
}
