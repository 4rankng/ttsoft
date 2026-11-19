// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Payroll manual (/guides/payroll) — same Starlight pattern as the TransTing
// manual in manual-starlight/ (/guides/ttransport). Content mirrors the Payroll
// KB kept in the private Folio wiki (book.tingting.vip, space "payroll"); this
// site is the public static publish. build.format 'file' emits index.html /
// <slug>.html files that nginx try_files resolves extensionless.
export default defineConfig({
  site: 'https://tingtingsoft.vn',
  base: '/guides/payroll',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    starlight({
      title: 'Ting Ting Soft',
      description:
        'Hướng dẫn sử dụng Payroll cho vai trò Quản lý: tạo dự án, bảng lương, nhân viên, nhập bảng chấm công từ Excel.',
      logo: { src: './src/assets/brand-logo.png', alt: 'Ting Ting Soft' },
      favicon: 'favicon.png',
      customCss: [
        '@fontsource/inter/400.css',
        '@fontsource/inter/500.css',
        '@fontsource/inter/600.css',
        '@fontsource/inter/700.css',
        './src/styles/tokens.css',
        './src/styles/chrome.css',
        './src/styles/content.css',
        './src/styles/landing.css',
      ],
      locales: {
        root: {
          lang: 'vi',
          label: 'Tiếng Việt',
        },
      },
      social: [
        { label: 'Zalo 0914 827 988', icon: 'comment', href: 'https://zalo.me/0914827988' },
        { label: 'Messenger', icon: 'comment-alt', href: 'https://m.me/tingtingsoft' },
      ],
      components: {
        Pagination: './src/components/Pagination.astro',
      },
      sidebar: [
        { label: 'Đăng nhập & tổng quan', slug: '' },
        { label: 'Tạo dự án', slug: 'tao-du-an' },
        { label: 'Tạo bảng lương', slug: 'tao-bang-luong' },
        { label: 'Tạo nhân viên', slug: 'tao-nhan-vien' },
        { label: 'Thêm nhân viên vào dự án', slug: 'them-nhan-vien-vao-du-an' },
        { label: 'Nhập bảng chấm công', slug: 'nhap-bang-cham-cong' },
      ],
    }),
  ],
});
