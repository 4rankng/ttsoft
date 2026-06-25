const STEPS = [
  { n: '01', title: 'Khám phá', body: 'Làm rõ vấn đề, người dùng, dữ liệu, ràng buộc và kết quả cần đạt.' },
  { n: '02', title: 'Thiết kế', body: 'Xây kiến trúc, luồng trải nghiệm và mẫu thử để kiểm chứng trước khi đầu tư sâu.' },
  { n: '03', title: 'Phát triển', body: 'Triển khai theo chu kỳ, kiểm thử liên tục và trình bày đầu ra có thể sử dụng.' },
  { n: '04', title: 'Mở rộng', body: 'Đo lường, tối ưu, vận hành và phát triển thêm mô-đun theo nhu cầu thực tế.' },
] as const;

export function Process() {
  return (
    <section className="section process" id="quy-trinh">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="kicker">Quy trình hợp tác</p>
          <h2>Nhanh để tạo đà. Chặt để đi xa.</h2>
          <p>Bốn bước giúp giảm rủi ro, tạo phản hồi sớm và giữ mọi quyết định gắn với hiệu quả kinh doanh.</p>
        </div>
        <ol className="process-grid">
          {STEPS.map((s, i) => (
            <li className="process-step reveal" data-delay={i} key={s.n}>
              <span>{s.n}</span>
              <div className="step-dot" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
