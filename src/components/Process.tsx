const STEPS = [
  { n: '01', title: 'Khảo sát quy trình', body: 'Hiểu cách đội ngũ đang làm việc, điểm nghẽn lớn nhất và kết quả năng suất bạn muốn cải thiện.' },
  { n: '02', title: 'Chọn bước số hóa đầu tiên', body: 'Đề xuất một phạm vi nhỏ, rõ chi phí, rõ kết quả — đủ để kiểm chứng trước khi đầu tư lớn hơn.' },
  { n: '03', title: 'Triển khai và thử thật', body: 'Làm theo chu kỳ ngắn, có bản dùng thử mỗi 1–2 tuần, điều chỉnh theo phản hồi vận hành thực tế.' },
  { n: '04', title: 'Đo hiệu quả và mở rộng', body: 'Khi bước đầu tạo giá trị, mở rộng dần sang quy trình kế tiếp — không ép làm hệ thống lớn từ đầu.' },
] as const;

export function Process() {
  return (
    <section className="section process" id="quy-trinh">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="kicker">Cách chúng tôi cùng bạn đi</p>
          <h2>Bốn bước để số hóa không bị quá sức.</h2>
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
