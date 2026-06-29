const SERVICES = [
  {
    index: '01',
    title: 'Phần mềm theo quy trình doanh nghiệp',
    body: 'Ứng dụng web, di động và công cụ nội bộ thiết kế quanh cách bạn đang vận hành — thay thế Excel, sổ sách và các bước làm thủ công đang ngốn thời gian.',
    tags: ['Ứng dụng web', 'Ứng dụng di động', 'Quy trình riêng'],
  },
  {
    index: '02',
    title: 'Tự động hóa thao tác lặp lại',
    body: 'Kết nối các phần mềm bạn đang dùng, tự động thao tác lặp lại (nhập liệu, báo cáo, đồng bộ đơn hàng) để đội ngũ nhỏ bớt việc tay.',
    tags: ['API', 'Đồng bộ dữ liệu', 'Bớt thao tác tay'],
  },
  {
    index: '03',
    title: 'Dữ liệu, báo cáo và AI ứng dụng',
    body: 'Biến dữ liệu rải rác thành bảng đo đơn giản, báo cáo tự động và trợ lý AI giúp chủ doanh nghiệp ra quyết định nhanh hơn, ít phụ thuộc cảm tính.',
    tags: ['Báo cáo tự động', 'Trợ lý AI', 'Quyết định bằng số liệu'],
  },
  {
    index: '04',
    title: 'Vận hành, bảo trì và mở rộng',
    body: 'Giữ hệ thống chạy ổn định, an toàn, chi phí hợp lý — bao gồm sao lưu, bảo mật, cập nhật và mở rộng khi doanh nghiệp lớn dần.',
    tags: ['Ổn định', 'Bảo mật', 'Chi phí hợp lý'],
  },
] as const;

export function Services() {
  return (
    <section className="section services" id="dich-vu">
      <div className="container">
        <div className="section-heading split-heading reveal">
          <div>
            <p className="kicker">Năng lực đồng hành</p>
            <h2>Bốn nhóm năng lực biến công nghệ thành năng suất hằng ngày.</h2>
          </div>
          <p>
            Từ ứng dụng đầu tiên thay thế Excel, đến nền tảng vận hành đầy đủ —
            Ting Ting Soft chọn cách làm phù hợp quy mô và bài toán thực tế của
            bạn, không phải bộ công nghệ hào nhoáng.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((s) => (
            <article className="service-row reveal" key={s.index}>
              <div className="service-index">{s.index}</div>
              <div className="service-title">
                <h3>{s.title}</h3>
              </div>
              <p>{s.body}</p>
              <div className="tag-list">
                {s.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
