export function Principles() {
  return (
    <section className="section section-intro" id="khac-biet">
      <div className="container">
        <div className="section-heading reveal">
          <p className="kicker">Cách Ting Ting Soft đồng hành</p>
          <h2>Bắt đầu từ năng suất. Đi từng bước. <span>Đo được hiệu quả.</span></h2>
          <p>
            Chúng tôi không bắt đầu bằng bộ công nghệ hào nhoáng, mà bắt đầu từ
            cách đội ngũ bạn đang làm việc hôm nay: việc nào mất thời gian, dữ liệu
            nào đang rời rạc, điểm nào nếu số hóa sẽ giúp doanh nghiệp chạy nhẹ hơn.
          </p>
        </div>

        <div className="principles-grid">
          <article className="principle-card reveal">
            <div className="card-number">01</div>
            <div className="icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" /><circle cx="12" cy="12" r="7" /></svg>
            </div>
            <h3>Chọn đúng việc cần số hóa</h3>
            <p>Ngồi cùng bạn để hiểu quy trình hiện tại: đang làm tay ở đâu, kẹt ở đâu, tốn thời gian và chi phí thế nào — trước khi đề xuất giải pháp.</p>
            <span className="card-meta">Lắng nghe · Tìm điểm nghẽn</span>
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
            <h3>Làm gọn để đội ngũ dễ dùng</h3>
            <p>Không ép bạn làm lại toàn bộ hệ thống. Bắt đầu từ điểm nghẽn lớn nhất, ra kết quả sớm, rồi mở rộng theo nhịp kinh doanh và ngân sách.</p>
            <span className="card-meta">Tinh gọn · Dễ áp dụng</span>
          </article>
          <article className="principle-card reveal" data-delay="2">
            <div className="card-number">03</div>
            <div className="icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 3 7-8" /><path d="M15 7h5v5" /></svg>
            </div>
            <h3>Đo hiệu quả trước khi mở rộng</h3>
            <p>Báo giá rõ ràng, tiến độ cập nhật liên tục, mỗi giai đoạn có bản dùng thử để kiểm chứng trước khi đầu tư tiếp.</p>
            <span className="card-meta">Minh bạch · Có kiểm chứng</span>
          </article>
        </div>
      </div>
    </section>
  );
}
