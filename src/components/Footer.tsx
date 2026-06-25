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
            Đồng hành cùng doanh nghiệp vừa và nhỏ Việt Nam trên hành trình số
            hóa — từng bước rõ ràng, minh bạch và bền vững.
          </p>
        </div>
        <div>
          <h3>Điều hướng</h3>
          <a href="#khac-biet">Cách chúng tôi đồng hành</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#giai-phap">Giải pháp</a>
          <a href="#quy-trinh">Quy trình</a>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <a href="mailto:hello@ttsoft.vn">hello@ttsoft.vn</a>
          <a href="#lien-he">Trao đổi nhu cầu</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} TTSoft. Bảo lưu mọi quyền.</span>
        <a href="#dau-trang">Về đầu trang ↑</a>
      </div>
    </footer>
  );
}
