// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// TTransport manual — rebuilt with Astro Starlight, replacing the hand-written
// static .html pages in /ttransport. The site URL scheme is preserved:
// every page keeps its /ttransport/... path (build.format 'file' emits
// quan-ly.html style files that nginx try_files resolves extensionless).
export default defineConfig({
  site: 'https://tingtingsoft.vn',
  base: '/ttransport',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    starlight({
      title: 'Ting Ting Soft',
      description:
        'Tài liệu hướng dẫn sử dụng phần mềm quản lý vận tải TTransport cho bốn vai trò: Quản lý, Kế toán, Lái xe và Giao nhận.',
      logo: { src: './src/assets/brand-logo.png', alt: 'Ting Ting Soft' },
      favicon: 'favicon.png',
      customCss: ['./src/custom.css'],
      locales: {
        root: {
          lang: 'vi',
          label: 'Tiếng Việt',
        },
      },
      social: [
        { label: 'Bản demo', icon: 'external', href: 'https://demo.tingting.vip/' },
        { label: 'Zalo 0914 827 988', icon: 'comment', href: 'https://zalo.me/0914827988' },
        { label: 'Messenger', icon: 'comment-alt', href: 'https://m.me/tingtingsoft' },
      ],
      sidebar: [
        { label: 'Tổng quan', slug: '' },
        { label: 'Bắt đầu', slug: 'bat-dau' },
        {
          label: 'Quản lý',
          items: [
            { label: 'Vai trò Quản lý', slug: 'quan-ly' },
            {
              label: 'Vận hành',
              items: [
                { slug: 'quan-ly/tong-quan-he-thong' },
                { slug: 'quan-ly/dieu-van-phan-xe' },
                { slug: 'quan-ly/ke-hoach-van-chuyen' },
                { slug: 'quan-ly/tao-lenh-van-chuyen' },
                { slug: 'quan-ly/bang-so-lieu' },
              ],
            },
            {
              label: 'Nhân sự',
              items: [
                { slug: 'quan-ly/luong-cham-cong' },
                { slug: 'quan-ly/ky-luat' },
              ],
            },
            {
              label: 'Tài chính',
              items: [
                { slug: 'quan-ly/bao-cao-lai-lo' },
                { slug: 'quan-ly/phan-chia-loi-nhuan' },
                { slug: 'quan-ly/cong-no-phai-thu' },
                { slug: 'quan-ly/cong-no-phai-tra' },
                { slug: 'quan-ly/chi-phi-phat-sinh' },
                { slug: 'quan-ly/tam-ung' },
                { slug: 'quan-ly/duyet-hoan-ung' },
              ],
            },
            {
              label: 'Danh mục & hệ thống',
              items: [
                { slug: 'quan-ly/danh-muc' },
                { slug: 'quan-ly/nguoi-dung-nhat-ky' },
                { slug: 'quan-ly/cau-hinh-he-thong' },
              ],
            },
          ],
        },
        { label: 'Kế toán', slug: 'ke-toan' },
        { label: 'Lái xe', slug: 'lai-xe' },
        { label: 'Giao nhận', slug: 'giao-nhan' },
      ],
    }),
  ],
});
