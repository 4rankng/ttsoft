export function Solutions() {
  return (
    <section className="section solutions" id="giai-phap">
      <div className="container">
        <div className="section-heading split-heading reveal">
          <div>
            <p className="kicker">Năng lực giải pháp</p>
            <h2>Đẹp ở giao diện. Mạnh ở lõi. Rõ ở hiệu quả.</h2>
          </div>
          <p>
            Ba hướng giải pháp mẫu dưới đây có thể tùy biến theo mô hình vận
            hành, dữ liệu và hệ thống hiện hữu của doanh nghiệp.
          </p>
        </div>

        {/* Featured solution: unified operations center.
            KPIs are intentionally "—" placeholder values per the honest-evidence
            policy — "Dữ liệu thực tế" captions signal they are templates. */}
        <div className="featured-solution reveal">
          <div className="featured-copy">
            <span className="solution-label">Mẫu giải pháp · Vận hành</span>
            <h3>Trung tâm vận hành hợp nhất</h3>
            <p>
              Gom công việc, phê duyệt, chỉ số và cảnh báo vào một không gian duy
              nhất — giúp lãnh đạo thấy toàn cảnh và đội ngũ hành động đúng lúc.
            </p>
            <ul className="check-list">
              <li><span>✓</span> Bảng điều khiển theo vai trò</li>
              <li><span>✓</span> Luồng phê duyệt có thể cấu hình</li>
              <li><span>✓</span> Dữ liệu và cảnh báo theo thời gian thực</li>
            </ul>
            <a className="text-link" href="#lien-he">Xây giải pháp tương tự <span>↗</span></a>
          </div>
          <div className="dashboard-mock" aria-label="Minh họa bảng điều khiển vận hành">
            <div className="mock-toolbar">
              <span /><span /><span />
              <b>TRUNG TÂM VẬN HÀNH / TỔNG QUAN</b>
            </div>
            <div className="mock-body">
              <aside className="mock-sidebar"><i /><i /><i /><i /><i /></aside>
              <div className="mock-content">
                <div className="mock-kpis">
                  <div><small>Yêu cầu mới</small><strong>—</strong><span>Dữ liệu thực tế</span></div>
                  <div><small>Đang xử lý</small><strong>—</strong><span>Dữ liệu thực tế</span></div>
                  <div><small>Đúng hạn</small><strong>—</strong><span>Dữ liệu thực tế</span></div>
                </div>
                <div className="mock-grid">
                  <div className="mock-chart">
                    <div className="chart-head"><span>Nhịp vận hành</span><small>7 ngày</small></div>
                    <svg viewBox="0 0 520 170" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#3971ff" stopOpacity=".24" />
                          <stop offset="1" stopColor="#3971ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="area" d="M0 145 C60 135 70 72 126 98 S220 132 258 66 S345 40 382 77 S461 18 520 40 L520 170 L0 170 Z" />
                      <path className="line" d="M0 145 C60 135 70 72 126 98 S220 132 258 66 S345 40 382 77 S461 18 520 40" />
                    </svg>
                  </div>
                  <div className="mock-activity">
                    <div className="chart-head"><span>Hoạt động gần đây</span><small>Trực tiếp</small></div>
                    <ul>
                      <li><i /><span><b>Phê duyệt đề xuất</b><small>Vừa cập nhật</small></span></li>
                      <li><i /><span><b>Đồng bộ dữ liệu</b><small>Đã hoàn tất</small></span></li>
                      <li><i /><span><b>Cảnh báo vận hành</b><small>Cần xử lý</small></span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="solution-cards">
          <article className="solution-card reveal">
            <div className="solution-art commerce-art" aria-hidden="true">
              <span className="phone-card"><i /><i /><i /></span>
              <span className="floating-chip chip-one">Đa kênh</span>
              <span className="floating-chip chip-two">Cá nhân hóa</span>
            </div>
            <div className="solution-card-copy">
              <span className="solution-label">Mẫu giải pháp · Thương mại số</span>
              <h3>Thương mại thông minh</h3>
              <p>Trải nghiệm bán hàng liền mạch, kết nối kho, đơn hàng và khách hàng trên mọi điểm chạm.</p>
              <div className="tag-list">
                <span>Kiến trúc tách lớp</span><span>Đa kênh</span><span>Cá nhân hóa</span>
              </div>
            </div>
          </article>
          <article className="solution-card reveal" data-delay="1">
            <div className="solution-art insight-art" aria-hidden="true">
              <div className="signal-rings"><i /><i /><i /><b /></div>
              <span className="floating-chip chip-three">Dự báo</span>
              <span className="floating-chip chip-four">Trợ lý AI</span>
            </div>
            <div className="solution-card-copy">
              <span className="solution-label">Mẫu giải pháp · Trí tuệ dữ liệu</span>
              <h3>Bộ máy phân tích</h3>
              <p>Tổng hợp tín hiệu kinh doanh, phát hiện bất thường và đề xuất hành động tiếp theo.</p>
              <div className="tag-list">
                <span>Kho dữ liệu</span><span>Trợ lý AI</span><span>Dự báo</span>
              </div>
            </div>
          </article>
        </div>

        {/* Honesty marker: these are solution templates, not shipped client work. */}
        <p className="integrity-note reveal">
          <strong>Lưu ý nội dung:</strong> Các khối trên được ghi rõ là &ldquo;mẫu giải
          pháp&rdquo;. Trước khi xuất bản chính thức, nên thay ít nhất một khối bằng
          dự án thực tế, tên ngành, phạm vi và kết quả đã được khách hàng cho phép công bố.
        </p>
      </div>
    </section>
  );
}
