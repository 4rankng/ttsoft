// TransTing user manual — shadcn/ui docs on static multi-page routes.
// Each section is its own HTML page (/ttransport/<section>); this script only
// adds in-page behavior: right-rail TOC + scroll-spy, mobile drawer, feedback
// widget, cross-page ⌘K search, and legacy #hash redirects to the new routes.

(() => {
  const layout = document.getElementById('manLayout');
  const sidenav = document.getElementById('manSidenav');
  const toggle = document.getElementById('manNavToggle');
  const scrim = document.getElementById('manNavScrim');
  const tocNav = document.getElementById('manTocNav');
  const toc = document.getElementById('manToc');
  const searchBtn = document.getElementById('manSearchBtn');
  const searchDialog = document.getElementById('manSearchDialog');
  const searchInput = document.getElementById('manSearchInput');
  const searchResults = document.getElementById('manSearchResults');
  const searchCloseBtn = document.getElementById('manSearchCloseBtn');

  if (!layout) return;

  const PAGE_PATHS = {
    'tong-quan': '/ttransport',
    'bat-dau': '/ttransport/bat-dau',
    'quan-ly': '/ttransport/quan-ly',
    'ke-toan': '/ttransport/ke-toan',
    'lai-xe': '/ttransport/lai-xe',
    'giao-nhan': '/ttransport/giao-nhan',
    'quan-ly/tong-quan-he-thong': '/ttransport/quan-ly/tong-quan-he-thong',
    'quan-ly/dieu-van-phan-xe': '/ttransport/quan-ly/dieu-van-phan-xe',
    'quan-ly/ke-hoach-van-chuyen': '/ttransport/quan-ly/ke-hoach-van-chuyen',
    'quan-ly/tao-lenh-van-chuyen': '/ttransport/quan-ly/tao-lenh-van-chuyen',
    'quan-ly/bang-so-lieu': '/ttransport/quan-ly/bang-so-lieu',
    'quan-ly/luong-cham-cong': '/ttransport/quan-ly/luong-cham-cong',
    'quan-ly/ky-luat': '/ttransport/quan-ly/ky-luat',
    'quan-ly/bao-cao-lai-lo': '/ttransport/quan-ly/bao-cao-lai-lo',
    'quan-ly/phan-chia-loi-nhuan': '/ttransport/quan-ly/phan-chia-loi-nhuan',
    'quan-ly/cong-no-phai-thu': '/ttransport/quan-ly/cong-no-phai-thu',
    'quan-ly/cong-no-phai-tra': '/ttransport/quan-ly/cong-no-phai-tra',
    'quan-ly/chi-phi-phat-sinh': '/ttransport/quan-ly/chi-phi-phat-sinh',
    'quan-ly/tam-ung': '/ttransport/quan-ly/tam-ung',
    'quan-ly/duyet-hoan-ung': '/ttransport/quan-ly/duyet-hoan-ung',
    'quan-ly/danh-muc': '/ttransport/quan-ly/danh-muc',
    'quan-ly/nguoi-dung-nhat-ky': '/ttransport/quan-ly/nguoi-dung-nhat-ky',
    'quan-ly/cau-hinh-he-thong': '/ttransport/quan-ly/cau-hinh-he-thong',
  };
  const currentSlug = document.body.dataset.manPage || 'tong-quan';

  // ── 1. Legacy #hash redirect ──────────────────────────────────────────
  // Links bookmarked before the split used /ttransport#section-or-task;
  // forward them to the page that owns the anchor now.
  const ANCHOR_TO_PAGE = {"tong-quan":"tong-quan","chon-vai-tro":"tong-quan","bat-dau":"bat-dau","dang-nhap":"bat-dau","giao-dien":"bat-dau","tai-khoan":"bat-dau","giam-doc":"quan-ly","giam-doc-tong-quan":"quan-ly/tong-quan-he-thong","giam-doc-dieu-van":"quan-ly/dieu-van-phan-xe","giam-doc-ke-hoach":"quan-ly/ke-hoach-van-chuyen","giam-doc-tao-lenh":"quan-ly/tao-lenh-van-chuyen","giam-doc-bang-so-lieu":"quan-ly/bang-so-lieu","giam-doc-luong":"quan-ly/luong-cham-cong","giam-doc-ky-luat":"quan-ly/ky-luat","giam-doc-lai-lo":"quan-ly/bao-cao-lai-lo","giam-doc-phan-chia":"quan-ly/phan-chia-loi-nhuan","giam-doc-no-thu":"quan-ly/cong-no-phai-thu","giam-doc-no-tra":"quan-ly/cong-no-phai-tra","giam-doc-chi-phi":"quan-ly/chi-phi-phat-sinh","giam-doc-tam-ung":"quan-ly/tam-ung","giam-doc-duyet-hoan-ung":"quan-ly/duyet-hoan-ung","giam-doc-danh-muc":"quan-ly/danh-muc","giam-doc-nguoi-dung":"quan-ly/nguoi-dung-nhat-ky","giam-doc-cau-hinh":"quan-ly/cau-hinh-he-thong","ke-toan":"ke-toan","ke-toan-tong-quan":"ke-toan","ke-toan-so-cai":"ke-toan","ke-toan-no":"ke-toan","ke-toan-luong":"ke-toan","ke-toan-duyet-hoan-ung":"ke-toan","lai-xe":"lai-xe","lai-xe-hanh-trinh":"lai-xe","lai-xe-chi-tiet":"lai-xe","lai-xe-thu-nhap":"lai-xe","lai-xe-ky-luat":"lai-xe","giao-nhan":"giao-nhan","giao-nhan-chuyen-di":"giao-nhan","giao-nhan-chi-tiet":"giao-nhan","giao-nhan-tam-ung":"giao-nhan","giao-nhan-phieu-thanh-toan":"giao-nhan"};

  {
    const hash = window.location.hash.slice(1);
    const target = hash && ANCHOR_TO_PAGE[hash];
    if (target && target !== currentSlug) {
      window.location.replace(PAGE_PATHS[target] + '#' + hash);
    }
  }

  // ── 2. Right rail TOC ("Trên trang này") — current page only ──────────
  const content = document.getElementById('noi-dung');
  const tocTargets = [];

  if (tocNav && content) {
    const frag = document.createDocumentFragment();
    content
      .querySelectorAll('section.man-section[id] > h2, .man-task[id] > h3')
      .forEach((heading) => {
        const container = heading.closest('[id]');
        if (!container) return;
        const link = document.createElement('a');
        link.className = 'man-toc-link';
        link.href = '#' + container.id;
        link.textContent = heading.textContent.trim();
        frag.appendChild(link);
        tocTargets.push({ el: container, id: container.id });
      });
    tocNav.appendChild(frag);

    // Mobile pages have no rail (<1280px) — mirror the TOC into a <details>
    // block right under the breadcrumbs so phones keep section navigation.
    if (tocTargets.length > 0) {
      const mob = document.createElement('details');
      mob.className = 'man-toc-mobile';
      mob.innerHTML = '<summary>Trong trang này</summary>';
      const mobNav = document.createElement('nav');
      mobNav.setAttribute('aria-label', 'Mục lục trang này');
      mobNav.innerHTML = frag.textContent ? '' : '';
      mobNav.append(...Array.from(tocNav.children).map((a) => {
        const c = a.cloneNode(true);
        c.classList.remove('active');
        return c;
      }));
      mob.appendChild(mobNav);
      const crumbs = content.querySelector('.man-breadcrumbs');
      if (crumbs) crumbs.after(mob);
      mob.addEventListener('click', (e) => {
        if (e.target.closest('a')) mob.removeAttribute('open');
      });
    }
    if (tocTargets.length === 0) toc?.querySelector('.man-toc-title')?.remove();
  }

  // ── 3. Scroll-spy for the right rail (window scroll; sidebar static) ───
  const updateTocSpy = () => {
    if (tocTargets.length === 0) return;
    const scrollLine = window.scrollY + 120;
    let currentId = tocTargets[0].id;
    for (const t of tocTargets) {
      if (t.el.getBoundingClientRect().top + window.scrollY <= scrollLine) currentId = t.id;
    }
    for (const a of tocNav.querySelectorAll('a')) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    }
  };

  let scrollRaf = 0;
  window.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateTocSpy);
    },
    { passive: true }
  );
  updateTocSpy();

  // ── 4. Mobile drawer ──────────────────────────────────────────────────
  if (sidenav && toggle) {
    const setDrawerOpen = (open) => {
      layout.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        const first = sidenav.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      } else {
        toggle.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', () => setDrawerOpen(!layout.classList.contains('nav-open')));
    if (scrim) scrim.addEventListener('click', () => setDrawerOpen(false));
    sidenav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setDrawerOpen(false);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && layout.classList.contains('nav-open')) setDrawerOpen(false);
    });
  }

  // ── 5. Screenshot zoom links follow the bundled image URL ─────────────
  // Vite rewrites <img src> but not <a href>, so point each figure link at
  // its image's final URL (also fixes the old relative ./src/assets paths).
  document.querySelectorAll('a.man-fig-media').forEach((a) => {
    const img = a.querySelector('img');
    if (img && img.src) a.href = img.src;
  });

  // ── 6. ⌘K command palette — searches across all manual pages ──────────
  const SEARCH_INDEX = [{"t":"Chọn vai trò của bạn","r":"Tổng quan","p":"tong-quan","a":"chon-vai-tro","d":""},{"t":"Đăng nhập","r":"Bắt đầu","p":"bat-dau","a":"dang-nhap","d":"Mở trình duyệt (Chrome, Edge, Safari…) và truy cập địa chỉ https://demo.tingting.vip/. Đăng nhập bằng tài…"},{"t":"Giao diện &amp; điều hướng","r":"Bắt đầu","p":"bat-dau","a":"giao-dien","d":"Menu bên trái chia theo nhóm nghiệp vụ: Vận hành, Nhân sự, Tài chính, Danh mục, Hệ thống. Nhóm đang chọn sẽ…"},{"t":"Tài khoản &amp; đổi mật khẩu","r":"Bắt đầu","p":"bat-dau","a":"tai-khoan","d":"Tên và vai trò của bạn luôn hiển thị ở góc trên bên phải. Mọi thao tác tài khoản bắt đầu từ đây."},{"t":"Menu của kế toán","r":"Kế toán","p":"ke-toan","a":"ke-toan-tong-quan","d":"Menu kế toán được tối ưu tinh gọn: ẩn các mục điều vận và tài khoản người dùng để tập trung vào số liệu tài…"},{"t":"Bảng số liệu &amp; sổ cái","r":"Kế toán","p":"ke-toan","a":"ke-toan-so-cai","d":"Hỗ trợ ghi thêm các dòng phát sinh tay, đối soát sổ cái theo từng khách hàng hoặc nhà cung cấp và xuất file…"},{"t":"Công nợ phải thu","r":"Kế toán","p":"ke-toan","a":"ke-toan-no","d":"Kế toán theo dõi tiến độ thu tiền từ khách hàng, tạo đợt thanh toán và xuất bảng kê công nợ đối soát định kỳ."},{"t":"Lương &amp; ghi thanh toán","r":"Kế toán","p":"ke-toan","a":"ke-toan-luong","d":"Sau khi rà soát ngày công, chuyến chạy và các khoản trừ kỷ luật, kế toán tiến hành xác nhận đã trả lương."},{"t":"Duyệt hoàn ứng","r":"Kế toán","p":"ke-toan","a":"ke-toan-duyet-hoan-ung","d":"Kiểm tra tính hợp lệ của hóa đơn, vé cầu đường và chi phí phát sinh trước khi duyệt hoàn tiền cho giao nhận."},{"t":"Xem hành trình","r":"Lái xe","p":"lai-xe","a":"lai-xe-hanh-trinh","d":"Màn hình đầu tiên sau khi đăng nhập: hiển thị toàn bộ chuyến đi được điều vận phân công trong tháng."},{"t":"Chi tiết chuyến đi","r":"Lái xe","p":"lai-xe","a":"lai-xe-chi-tiet","d":"Bấm vào một chuyến để xem đầy đủ thông tin: tuyến đường, thời gian giao nhận, biển số xe và tiền công chuyến."},{"t":"Thu nhập","r":"Lái xe","p":"lai-xe","a":"lai-xe-thu-nhap","d":"Minh bạch thu nhập: tổng tiền công theo chuyến, tiền làm thêm giờ và các khoản hỗ trợ trong tháng."},{"t":"Kỷ luật của tôi","r":"Lái xe","p":"lai-xe","a":"lai-xe-ky-luat","d":"Tra cứu danh sách các biên bản kỷ luật hoặc lỗi nghiệp vụ đã ghi nhận trong tháng."},{"t":"Chuyến đi","r":"Giao nhận","p":"giao-nhan","a":"giao-nhan-chuyen-di","d":"Danh sách các chuyến hàng được giao phụ trách giao nhận trong kỳ."},{"t":"Chi tiết chuyến &amp; gán lái xe","r":"Giao nhận","p":"giao-nhan","a":"giao-nhan-chi-tiet","d":"Gán người lái xe thực tế nhận lệnh tại hiện trường và bổ sung số container, số chì niêm phong (seal)."},{"t":"Tạm ứng","r":"Giao nhận","p":"giao-nhan","a":"giao-nhan-tam-ung","d":"Lập đề xuất xin tạm ứng chi phí nâng hạ, bốc xếp hoặc cước đường bộ trước khi nhận hàng."},{"t":"Phiếu thanh toán","r":"Giao nhận","p":"giao-nhan","a":"giao-nhan-phieu-thanh-toan","d":"Lập bảng quyết toán hoàn ứng chi phí thực tế phát sinh sau khi hoàn thành giao nhận chuyến."},{"t":"Tổng quan","r":"Quản lý","p":"quan-ly/tong-quan-he-thong","a":"giam-doc-tong-quan","d":"Màn hình tổng quan cập nhật tình hình hoạt động đầu ngày: doanh thu, chi phí, việc cần xử lý và tình trạng…"},{"t":"Điều vận & phân xe","r":"Quản lý","p":"quan-ly/dieu-van-phan-xe","a":"giam-doc-dieu-van","d":""},{"t":"Kế hoạch vận chuyển","r":"Quản lý","p":"quan-ly/ke-hoach-van-chuyen","a":"giam-doc-ke-hoach","d":"Danh sách toàn bộ chuyến đi theo kỳ tháng. Mỗi dòng tương ứng một lệnh vận chuyển — bấm vào để xem chi tiết."},{"t":"Tạo lệnh vận chuyển","r":"Quản lý","p":"quan-ly/tao-lenh-van-chuyen","a":"giam-doc-tao-lenh","d":""},{"t":"Bảng số liệu","r":"Quản lý","p":"quan-ly/bang-so-lieu","a":"giam-doc-bang-so-lieu","d":"Bảng tổng hợp chi tiết theo từng dòng lệnh — phục vụ đối soát số liệu vận hành và xuất dữ liệu ra file Excel."},{"t":"Lương & chấm công","r":"Quản lý","p":"quan-ly/luong-cham-cong","a":"giam-doc-luong","d":"Bảng tổng hợp tiền công theo chuyến, ngày công, phụ cấp và các khoản trừ kỷ luật của từng lái xe trong tháng."},{"t":"Kỷ luật","r":"Quản lý","p":"quan-ly/ky-luat","a":"giam-doc-ky-luat","d":"Ghi nhận biên bản vi phạm quy chế an toàn, trễ chuyến của lái xe có ảnh hưởng đến bảng lương kỳ đó."},{"t":"Báo cáo lãi lỗ","r":"Quản lý","p":"quan-ly/bao-cao-lai-lo","a":"giam-doc-lai-lo","d":"Báo cáo tài chính phản ánh doanh thu, giá vốn chuyến xe, chi phí quản lý và lợi nhuận ròng toàn công ty."},{"t":"Phân chia lợi nhuận","r":"Quản lý","p":"quan-ly/phan-chia-loi-nhuan","a":"giam-doc-phan-chia","d":"Tính toán phân chia lợi nhuận cho các cổ đông theo tỷ lệ góp vốn sau khi đã hoàn thành quyết toán quý."},{"t":"Công nợ phải thu","r":"Quản lý","p":"quan-ly/cong-no-phai-thu","a":"giam-doc-no-thu","d":"Theo dõi số tiền khách hàng còn nợ theo hạn thanh toán kèm mã màu cảnh báo công nợ sắp đến hạn."},{"t":"Công nợ phải trả","r":"Quản lý","p":"quan-ly/cong-no-phai-tra","a":"giam-doc-no-tra","d":"Theo dõi công nợ phải trả cho nhà cung cấp xăng dầu, sửa chữa xe và dịch vụ logistics bên ngoài."},{"t":"Chi phí phát sinh","r":"Quản lý","p":"quan-ly/chi-phi-phat-sinh","a":"giam-doc-chi-phi","d":"Ghi nhận các khoản chi phí phát sinh ngoài lệnh: bảo trì đột xuất, chi phí bến bãi hoặc phí hành chính."},{"t":"Tạm ứng","r":"Quản lý","p":"quan-ly/tam-ung","a":"giam-doc-tam-ung","d":"Duyệt các yêu cầu tạm ứng chi phí đường bộ hoặc nhiên liệu do nhân viên giao nhận gửi lên trước chuyến đi."},{"t":"Duyệt hoàn ứng","r":"Quản lý","p":"quan-ly/duyet-hoan-ung","a":"giam-doc-duyet-hoan-ung","d":"Sau khi kết thúc chuyến đi, nhân viên gửi phiếu hoàn ứng đối soát chi phí thực tế so với tiền tạm ứng."},{"t":"Danh mục: xe, khách, NCC","r":"Quản lý","p":"quan-ly/danh-muc","a":"giam-doc-danh-muc","d":"Dữ liệu nền tảng phục vụ toàn bộ các biểu mẫu tạo lệnh và phân xe trong hệ thống."},{"t":"Người dùng & nhật ký","r":"Quản lý","p":"quan-ly/nguoi-dung-nhat-ky","a":"giam-doc-nguoi-dung","d":"Phân quyền truy cập cho nhân sự mới và tra cứu nhật ký thao tác kiểm soát bảo mật hệ thống."},{"t":"Cấu hình hệ thống","r":"Quản lý","p":"quan-ly/cau-hinh-he-thong","a":"giam-doc-cau-hinh","d":"Thiết lập thông tin doanh nghiệp, định mức tiêu hao nhiên liệu, đơn giá cự ly và phụ cấp đi đường."}];

  if (searchDialog && searchInput && searchResults) {
    let selectedIndex = 0;
    let filteredItems = [];

    const pathFor = (item) => PAGE_PATHS[item.p] + (item.a ? '#' + item.a : '');

    const renderResults = (items) => {
      filteredItems = items;
      selectedIndex = 0;
      searchResults.innerHTML = '';
      if (items.length === 0) {
        searchResults.innerHTML = '<div class="man-search-empty">Không tìm thấy kết quả phù hợp.</div>';
        return;
      }
      items.forEach((item, index) => {
        const link = document.createElement('a');
        link.className = 'man-search-item' + (index === 0 ? ' selected' : '');
        link.href = pathFor(item);
        link.setAttribute('role', 'option');
        link.innerHTML =
          '<div><span class="man-search-item-title">' + item.t + '</span></div>' +
          '<span class="man-search-item-badge">' + item.r + '</span>';
        link.addEventListener('click', () => closeSearch());
        searchResults.appendChild(link);
      });
    };

    const updateSelectedResult = () => {
      searchResults.querySelectorAll('.man-search-item').forEach((el, idx) => {
        const isSel = idx === selectedIndex;
        el.classList.toggle('selected', isSel);
        if (isSel) el.scrollIntoView({ block: 'nearest' });
      });
    };

    const filterSearch = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        renderResults(SEARCH_INDEX.slice(0, 15));
        return;
      }
      renderResults(
        SEARCH_INDEX.filter(
          (item) => item.t.toLowerCase().includes(q) || item.r.toLowerCase().includes(q) || (item.d || '').toLowerCase().includes(q)
        )
      );
    };

    const openSearch = () => {
      if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
      else searchDialog.setAttribute('open', '');
      searchInput.value = '';
      filterSearch('');
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
      if (typeof searchDialog.close === 'function') searchDialog.close();
      else searchDialog.removeAttribute('open');
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    const searchBtnMob = document.getElementById('manSearchBtnMob');
    if (searchBtnMob) searchBtnMob.addEventListener('click', openSearch);
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
    searchDialog.addEventListener('click', (e) => {
      if (e.target === searchDialog) closeSearch();
    });
    searchInput.addEventListener('input', (e) => filterSearch(e.target.value));

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredItems.length > 0) {
          selectedIndex = (selectedIndex + 1) % filteredItems.length;
          updateSelectedResult();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredItems.length > 0) {
          selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
          updateSelectedResult();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filteredItems[selectedIndex];
        if (item) {
          closeSearch();
          window.location.assign(pathFor(item));
        }
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchDialog.open) closeSearch();
        else openSearch();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        openSearch();
      }
    });
  }
})();
