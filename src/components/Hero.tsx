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
          <span>TTSOFT / ĐỒNG HÀNH SỐ</span>
        </div>
        <div className="canvas-wrap" data-scene-wrap>
          <CanvasFallback />
          {showScene ? (
            <Suspense fallback={null}>
              <SceneCanvas />
            </Suspense>
          ) : null}
          <div className="scene-label scene-label-a">
            <span>01</span><strong>Quy trình thủ công → tự động</strong><small>Bớt việc tay, nhiều việc đúng</small>
          </div>
          <div className="scene-label scene-label-b">
            <span>02</span><strong>Dữ liệu rõ ràng</strong><small>Quyết định không còn theo cảm tính</small>
          </div>
          <div className="scene-label scene-label-c">
            <span>03</span><strong>Dễ dùng cho đội ngũ nhỏ</strong><small>Không cần chuyên gia IT</small>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>Hiểu bài toán</span>
          <span>Đi từng bước</span>
          <span>Vận hành thực tế</span>
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
          <p className="eyebrow"><span /> Đối tác đồng hành số hóa</p>
          <h1 id="hero-title">
            Từ sổ sách và Excel, đến <em>vận hành tự động</em> — từng bước, cùng bạn.
          </h1>
          <p className="hero-lead">
            TTSoft đồng hành cùng doanh nghiệp nhỏ chuyển đổi số từng bước: từ
            những quy trình còn làm thủ công, đến phần mềm vận hành, tự động hóa
            và ra quyết định bằng dữ liệu — nền tảng kỹ thuật vững, đi đúng tốc độ
            của bạn.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lien-he">
              Trao đổi nhu cầu <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#quy-trinh">
              Xem quy trình 4 bước <span aria-hidden="true">↓</span>
            </a>
          </div>
          <ul className="hero-capabilities" aria-label="Năng lực chính">
            <li><span>01</span> Phần mềm theo yêu cầu của bạn</li>
            <li><span>02</span> Tự động hóa quy trình thủ công</li>
            <li><span>03</span> Ra quyết định bằng dữ liệu</li>
          </ul>
        </div>

        <HeroVisual />
      </div>

      <div className="container proof-rail reveal" data-delay="2">
        <p>Đồng hành thực sự — không bán hàng vòng vo.</p>
        <div className="proof-items">
          <span><i>✓</i> Bắt đầu từ nhu cầu thực của bạn</span>
          <span><i>✓</i> Kiến trúc mở rộng được</span>
          <span><i>✓</i> Chi phí rõ ràng, không ôm đồm</span>
        </div>
      </div>
    </section>
  );
}
