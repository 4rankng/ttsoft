const SERVICES = [
  {
    index: '01',
    icon: '↗',
    title: 'Phần mềm theo yêu cầu',
    body: 'Ứng dụng web, di động, cổng nội bộ và nền tảng nghiệp vụ bám sát quy trình riêng của doanh nghiệp.',
    tags: ['Ứng dụng web', 'Ứng dụng di động', 'SaaS'],
  },
  {
    index: '02',
    icon: '⌁',
    title: 'Tự động hóa và tích hợp',
    body: 'Kết nối hệ thống, đồng bộ dữ liệu và loại bỏ thao tác lặp để đội ngũ tập trung vào công việc tạo giá trị.',
    tags: ['API', 'Quy trình', 'ERP / CRM'],
  },
  {
    index: '03',
    icon: '✦',
    title: 'Dữ liệu và AI',
    body: 'Biến dữ liệu rời rạc thành bảng điều khiển, dự báo và trợ lý AI hỗ trợ quyết định nhanh hơn.',
    tags: ['Phân tích dữ liệu', 'AI tạo sinh', 'Nền tảng dữ liệu'],
  },
  {
    index: '04',
    icon: '◎',
    title: 'Đám mây và hiện đại hóa',
    body: 'Tối ưu kiến trúc, hiệu năng, bảo mật và quy trình triển khai để hệ thống vận hành ổn định ở quy mô lớn.',
    tags: ['Đám mây', 'DevOps', 'Hiện đại hóa'],
  },
] as const;

export function Services() {
  return (
    <section className="section services" id="dich-vu">
      <div className="container">
        <div className="section-heading split-heading reveal">
          <div>
            <p className="kicker">Dịch vụ cốt lõi</p>
            <h2>Năng lực số cho từng giai đoạn tăng trưởng.</h2>
          </div>
          <p>
            Từ sản phẩm khả dụng tối thiểu cần ra mắt nhanh đến hệ thống doanh
            nghiệp cần tái cấu trúc, TTSoft chọn phương pháp và nền tảng phù hợp
            với bối cảnh thực tế.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((s) => (
            <article className="service-row reveal" key={s.index}>
              <div className="service-index">{s.index}</div>
              <div className="service-title">
                <span className="service-icon" aria-hidden="true">{s.icon}</span>
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
