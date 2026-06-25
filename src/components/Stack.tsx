const STACK = [
  { abbr: '3D', name: 'Three.js' },
  { abbr: 'TS', name: 'TypeScript' },
  { abbr: 'R', name: 'React' },
  { abbr: 'N', name: 'Node.js' },
  { abbr: 'PG', name: 'PostgreSQL' },
  { abbr: 'D', name: 'Docker' },
  { abbr: '☁', name: 'Đám mây' },
] as const;

export function Stack() {
  return (
    <section className="section stack-section" aria-labelledby="stack-title">
      <div className="container">
        <div className="stack-panel reveal">
          <div>
            <p className="kicker">Công nghệ phù hợp bài toán</p>
            <h2 id="stack-title">Hiện đại, nhưng không chạy theo trào lưu.</h2>
          </div>
          <div className="stack-cloud" aria-label="Công nghệ sử dụng">
            {STACK.map((t) => (
              <span key={t.name}><b>{t.abbr}</b> {t.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
