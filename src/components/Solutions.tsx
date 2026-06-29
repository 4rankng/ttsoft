export function Solutions() {
  return (
    <section className="section solutions" id="giai-phap">
      <div className="container">
        <div className="section-heading split-heading reveal">
          <div>
            <p className="kicker">Hướng triển khai phổ biến</p>
            <h2>Ba điểm bắt đầu giúp doanh nghiệp nhỏ số hóa có trọng tâm.</h2>
          </div>
          <p>
            Đây là các hướng giải pháp minh họa — mỗi dự án sẽ được điều chỉnh
            theo mô hình, ngân sách và đội ngũ thực tế. Bạn không cần làm hết, chỉ
            cần bắt đầu từ một điểm tạo năng suất rõ nhất.
          </p>
        </div>

        {/* Featured solution: unified operations center.
            KPIs are intentionally "—" placeholder values per the honest-evidence
            policy — "Dữ liệu thực tế" captions signal they are templates. */}
        <div className="featured-solution reveal">
          <div className="featured-copy">
            <span className="solution-label">Mẫu giải pháp · Quản lý vận hành</span>
            <h3>Trung tâm vận hành tinh gọn</h3>
            <p>
              Gom công việc, phê duyệt, chỉ số và cảnh báo vào một màn hình — chủ
              doanh nghiệp nhìn toàn cảnh, nhân viên biết việc cần làm, không còn
              rải rác qua Excel và chat.
            </p>
            <ul className="check-list">
              <li><span>✓</span> Một màn hình cho cả đội</li>
              <li><span>✓</span> Phê duyệt không cần giấy tờ</li>
              <li><span>✓</span> Số liệu cập nhật theo quy trình thật</li>
            </ul>
            <a className="text-link" href="#lien-he">Bắt đầu giải pháp này <span>↗</span></a>
          </div>
          <div className="dashboard-mock" aria-label="Minh họa bảng quản lý vận hành">
            <div className="mock-toolbar">
              <span /><span /><span />
              <b>QUẢN LÝ VẬN HÀNH / TỔNG QUAN</b>
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
                          <stop offset="0" stopColor="#14b8a6" stopOpacity=".24" />
                          <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
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
              <span className="floating-chip chip-two">Tự động</span>
            </div>
            <div className="solution-card-copy">
              <span className="solution-label">Mẫu giải pháp · Bán hàng</span>
              <h3>Bán hàng đa kênh</h3>
              <p>Tự động gom đơn từ sàn, website và cửa hàng vào một chỗ — đồng bộ kho, giá, khách hàng, không còn nhập tay từng đơn.</p>
              <div className="tag-list">
                <span>Đa kênh</span><span>Đồng bộ kho</span><span>Một chỗ quản lý</span>
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
              <span className="solution-label">Mẫu giải pháp · Quyết định bằng dữ liệu</span>
              <h3>Ra quyết định bằng dữ liệu</h3>
              <p>Tổng hợp doanh thu, chi phí, tồn kho và khách hàng thành báo cáo tự động, phát hiện bất thường và gợi ý hành động tiếp theo.</p>
              <div className="tag-list">
                <span>Báo cáo tự động</span><span>Phát hiện bất thường</span><span>Gợi ý hành động</span>
              </div>
            </div>
          </article>
        </div>

        {/* Honesty marker: these are solution templates, not shipped client work. */}
        <p className="integrity-note reveal">
          <strong>Lưu ý nội dung:</strong> Các khối trên là mẫu minh họa, không phải
          dự án khách hàng thực tế. Khi có dự án được phép công bố, Ting Ting Soft
          sẽ thay bằng tên ngành, phạm vi và kết quả thật.
        </p>
      </div>
    </section>
  );
}
