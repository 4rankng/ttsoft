import { BrandMark } from './BrandMark';
import { useCurrentYear } from '../hooks';

export function Footer() {
  const year = useCurrentYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>
            Thiết kế và phát triển phần mềm giúp doanh nghiệp vận hành tinh gọn,
            thích ứng nhanh và tăng trưởng bền vững.
          </p>
        </div>
        <div>
          <h3>Điều hướng</h3>
          <a href="#khac-biet">Về TTSoft</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#giai-phap">Giải pháp</a>
          <a href="#quy-trinh">Quy trình</a>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <a href="mailto:hello@ttsoft.vn">hello@ttsoft.vn</a>
          <a href="#lien-he">Đặt lịch trao đổi</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} TTSoft. Bảo lưu mọi quyền.</span>
        <a href="#dau-trang">Về đầu trang ↑</a>
      </div>
    </footer>
  );
}
