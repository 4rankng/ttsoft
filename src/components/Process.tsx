const STEPS = [
  { n: '01', title: 'Lắng nghe', body: 'Hiểu quy trình hiện tại, điểm nghẽn lớn nhất và kết quả bạn muốn — không bắt đầu bằng giải pháp.' },
  { n: '02', title: 'Đề xuất bước đầu tiên', body: 'Chọn 1 điểm nghẽn lớn nhất, đề xuất giải pháp nhỏ, rõ ràng, có chi phí — kèm bản thử để thấy trước khi đầu tư.' },
  { n: '03', title: 'Làm ra kết quả', body: 'Triển khai chu kỳ ngắn, bản dùng thử mỗi 1–2 tuần, điều chỉnh theo phản hồi thực tế.' },
  { n: '04', title: 'Mở rộng khi sẵn sàng', body: 'Khi bước đầu tạo giá trị, mở rộng dần — không ép làm hệ thống lớn từ đầu.' },
] as const;

export function Process() {
  return (
    <section className="section process" id="quy-trinh">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="kicker">Cách chúng tôi cùng bạn đi</p>
          <h2>Bốn bước, rủi ro thấp, kết quả sớm.</h2>
          <p>Quy trình từng bước nhỏ, có bản dùng thử ở mỗi giai đoạn. Bạn luôn biết mình ở đâu, chi phí bao nhiêu, bước tiếp theo là gì — không bất ngờ.</p>
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
