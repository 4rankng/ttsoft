import { Suspense, lazy } from 'react';
import { useInView, useWebGLSupport } from '../hooks';

// Lazy-mount the 3D Canvas only after the hero is near the viewport. Keeps the
// headline / CTA independent of WebGL and Three.js, matching main.js intent.
const SceneCanvas = lazy(() =>
  import('../scene/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
);

/** Decorative CSS fallback shown until WebGL boots (and if it never can). */
function CanvasFallback() {
  return (
    <div className="canvas-fallback" aria-hidden="true">
      <i className="fallback-core" />
      <i className="fallback-orbit orbit-a" />
      <i className="fallback-orbit orbit-b" />
      <i className="fallback-dot dot-a" />
      <i className="fallback-dot dot-b" />
      <i className="fallback-dot dot-c" />
    </div>
  );
}

/** The hero visual shell: status topline, 3D canvas (or CSS fallback), labels. */
function HeroVisual() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '250px' });
  const webgl = useWebGLSupport();
  const showScene = webgl && inView;

  return (
    <div className="hero-visual reveal" data-delay="1" ref={ref}>
      <div className="visual-shell">
        <div className="visual-topline">
          <span className="signal"><i /> Hệ thống đang hoạt động</span>
          <span>TTSOFT / KIẾN TRÚC SỐ</span>
        </div>
        <div className="canvas-wrap" data-scene-wrap>
          {showScene ? (
            <Suspense fallback={<CanvasFallback />}>
              <SceneCanvas />
            </Suspense>
          ) : (
            <CanvasFallback />
          )}
          <div className="scene-label scene-label-a">
            <span>01</span><strong>Luồng dữ liệu</strong><small>Kết nối theo thời gian thực</small>
          </div>
          <div className="scene-label scene-label-b">
            <span>02</span><strong>Kiến trúc</strong><small>Sẵn sàng mở rộng</small>
          </div>
          <div className="scene-label scene-label-c">
            <span>03</span><strong>Trải nghiệm</strong><small>Đơn giản và nhất quán</small>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>Chiến lược sản phẩm</span>
          <span>Thiết kế UX/UI</span>
          <span>Kỹ thuật nền tảng</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="dau-trang" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Đối tác công nghệ cho doanh nghiệp hiện đại</p>
          <h1 id="hero-title">
            Biến quy trình phức tạp thành <em>phần mềm tinh gọn.</em>
          </h1>
          <p className="hero-lead">
            TTSoft kết nối chiến lược, trải nghiệm, kỹ thuật và dữ liệu để xây sản
            phẩm số dễ dùng, dễ mở rộng và tạo hiệu quả vận hành đo lường được.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lien-he">
              Khởi động dự án <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#giai-phap">
              Khám phá năng lực <span aria-hidden="true">↓</span>
            </a>
          </div>
          <ul className="hero-capabilities" aria-label="Năng lực chính">
            <li><span>01</span> Ứng dụng web và di động</li>
            <li><span>02</span> Tự động hóa vận hành</li>
            <li><span>03</span> Dữ liệu và AI</li>
          </ul>
        </div>

        <HeroVisual />
      </div>

      <div className="container proof-rail reveal" data-delay="2">
        <p>Thiết kế để tạo giá trị, không chỉ để gây ấn tượng.</p>
        <div className="proof-items">
          <span><i>✓</i> Bài toán kinh doanh rõ ràng</span>
          <span><i>✓</i> Đầu ra kiểm chứng theo từng chu kỳ</span>
          <span><i>✓</i> Kiến trúc phù hợp đường dài</span>
        </div>
      </div>
    </section>
  );
}
