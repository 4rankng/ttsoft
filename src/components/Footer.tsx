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
            Số hóa quy trình và đưa công nghệ vào đúng chỗ để doanh nghiệp nhỏ
            làm việc nhẹ hơn, nhanh hơn và tự tin hơn với dữ liệu của mình.
          </p>
        </div>
        <div>
          <h3>Điều hướng</h3>
          <a href="#khac-biet">Cách đồng hành</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#giai-phap">Giải pháp</a>
          <a href="#quy-trinh">Quy trình</a>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <a href="mailto:tingtingsoft.vn@gmail.com">tingtingsoft.vn@gmail.com</a>
          <a href="#lien-he">Trao đổi nhu cầu</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Công ty TNHH Giải Pháp Phần Mềm Ting Ting. Bảo lưu mọi quyền.</span>
        <a href="#dau-trang">Về đầu trang ↑</a>
      </div>
    </footer>
  );
}
