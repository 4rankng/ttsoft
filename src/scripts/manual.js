// TransTing user manual — shadcn/ui docs interactions
// Includes: mobile drawer, left sidebar scroll-spy, right rail dynamic TOC,
// live breadcrumb sync, feedback widget, and ⌘K command palette search.

(() => {
  const layout = document.getElementById('manLayout');
  const sidenav = document.getElementById('manSidenav');
  const toggle = document.getElementById('manNavToggle');
  const scrim = document.getElementById('manNavScrim');
  const tocNav = document.getElementById('manTocNav');
  const activeCrumb = document.getElementById('manActiveCrumb');
  const searchBtn = document.getElementById('manSearchBtn');
  const searchDialog = document.getElementById('manSearchDialog');
  const searchInput = document.getElementById('manSearchInput');
  const searchResults = document.getElementById('manSearchResults');
  const searchCloseBtn = document.getElementById('manSearchCloseBtn');
  const feedback = document.getElementById('manFeedback');

  if (!layout) return;

  // ── 1. Mobile Drawer ──────────────────────────────────────────────────
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

  // ── 2. Collect Sections & Tasks for Navigation & Search ───────────────
  const content = document.getElementById('noi-dung');
  if (!content) return;

  const sectionEls = [...content.querySelectorAll('section.man-section')];
  const taskEls = [...content.querySelectorAll('.man-task')];

  // Build search index
  const searchIndex = [];

  sectionEls.forEach((sec) => {
    const h2 = sec.querySelector('h2');
    if (!h2 || !sec.id) return;
    const title = h2.textContent.trim();
    searchIndex.push({
      id: sec.id,
      title: title,
      role: 'Phần chính',
      desc: sec.querySelector('.man-section-lead')?.textContent.trim() || '',
    });
  });

  taskEls.forEach((task) => {
    const h3 = task.querySelector('h3');
    if (!h3 || !task.id) return;
    const parentSection = task.closest('section.man-section');
    const roleTitle = parentSection?.querySelector('h2')?.textContent.trim() || 'Hướng dẫn';
    const firstPara = task.querySelector('p')?.textContent.trim() || '';
    searchIndex.push({
      id: task.id,
      title: h3.textContent.trim(),
      role: roleTitle,
      desc: firstPara,
    });
  });

  // ── 3. Populate Right TOC ("Trên trang này") ──────────────────────────
  if (tocNav) {
    const tocItems = [];
    sectionEls.forEach((sec) => {
      const h2 = sec.querySelector('h2');
      if (!h2 || !sec.id) return;
      const secLink = document.createElement('a');
      secLink.className = 'man-toc-link';
      secLink.href = '#' + sec.id;
      secLink.textContent = h2.textContent.trim();
      tocNav.appendChild(secLink);
      tocItems.push({ el: sec, link: secLink, isSub: false });

      // Add child tasks
      const secTasks = sec.querySelectorAll('.man-task');
      secTasks.forEach((task) => {
        const h3 = task.querySelector('h3');
        if (!h3 || !task.id) return;
        const taskLink = document.createElement('a');
        taskLink.className = 'man-toc-sublink';
        taskLink.href = '#' + task.id;
        taskLink.textContent = h3.textContent.trim();
        tocNav.appendChild(taskLink);
        tocItems.push({ el: task, link: taskLink, isSub: true });
      });
    });
  }

  // ── 4. Scroll-Spy (Left Sidenav + Right TOC + Breadcrumbs) ─────────────
  const leftLinks = sidenav ? [...sidenav.querySelectorAll('a[href^="#"]')] : [];
  const allTargets = [
    ...sectionEls.map((sec) => ({ id: sec.id, el: sec, type: 'section' })),
    ...taskEls.map((task) => ({ id: task.id, el: task, type: 'task' })),
  ].filter((t) => Boolean(t.id && t.el));

  const rightTocLinks = tocNav ? [...tocNav.querySelectorAll('a[href^="#"]')] : [];

  const updateActiveStates = () => {
    const scrollLine = window.scrollY + 100;
    let currentId = allTargets[0]?.id;
    let currentTitle = allTargets[0]?.el.querySelector('h2, h3')?.textContent.trim() || '';

    for (const t of allTargets) {
      const top = t.el.getBoundingClientRect().top + window.scrollY;
      if (top <= scrollLine) {
        currentId = t.id;
        currentTitle = t.el.querySelector('h2, h3')?.textContent.trim() || '';
      }
    }

    if (!currentId) return;

    // Update left sidenav
    for (const a of leftLinks) {
      const href = a.getAttribute('href');
      const on = href === '#' + currentId;
      a.classList.toggle('active', on);
      if (on) {
        a.setAttribute('aria-current', 'true');
        // Auto-scroll left sidebar to keep active link in view if needed
        const sTop = sidenav.scrollTop;
        const sHeight = sidenav.clientHeight;
        const aTop = a.offsetTop;
        if (aTop < sTop || aTop > sTop + sHeight - 40) {
          sidenav.scrollTo({ top: Math.max(0, aTop - 80), behavior: 'smooth' });
        }
      } else {
        a.removeAttribute('aria-current');
      }
    }

    // Update right TOC
    for (const a of rightTocLinks) {
      const href = a.getAttribute('href');
      const on = href === '#' + currentId;
      a.classList.toggle('active', on);
    }

    // Update breadcrumb
    if (activeCrumb && currentTitle) {
      activeCrumb.textContent = currentTitle;
    }
  };

  let scrollRaf = 0;
  const onScroll = () => {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(updateActiveStates);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateActiveStates();

  // ── 5. Feedback Widget ────────────────────────────────────────────────
  if (feedback) {
    feedback.addEventListener('click', (e) => {
      const btn = e.target.closest('.man-feedback-btn');
      if (!btn) return;
      const btnsContainer = feedback.querySelector('.man-feedback-btns');
      if (btnsContainer) {
        btnsContainer.innerHTML = '<span class="man-feedback-thanks">Cảm ơn bạn đã phản hồi!</span>';
      }
    });
  }

  // ── 6. Command Palette Search (⌘K / Ctrl+K) ───────────────────────────
  if (searchDialog && searchInput && searchResults) {
    let selectedIndex = 0;
    let filteredItems = [];

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
        link.href = '#' + item.id;
        link.setAttribute('role', 'option');
        link.innerHTML = `
          <div>
            <span class="man-search-item-title">${item.title}</span>
          </div>
          <span class="man-search-item-badge">${item.role}</span>
        `;
        link.addEventListener('click', () => {
          closeSearch();
        });
        searchResults.appendChild(link);
      });
    };

    const updateSelectedResult = () => {
      const rendered = searchResults.querySelectorAll('.man-search-item');
      rendered.forEach((el, idx) => {
        const isSel = idx === selectedIndex;
        el.classList.toggle('selected', isSel);
        if (isSel) el.scrollIntoView({ block: 'nearest' });
      });
    };

    const filterSearch = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        renderResults(searchIndex.slice(0, 15));
        return;
      }
      const matches = searchIndex.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
        );
      });
      renderResults(matches);
    };

    const openSearch = () => {
      if (typeof searchDialog.showModal === 'function') {
        searchDialog.showModal();
      } else {
        searchDialog.setAttribute('open', '');
      }
      searchInput.value = '';
      filterSearch('');
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
      if (typeof searchDialog.close === 'function') {
        searchDialog.close();
      } else {
        searchDialog.removeAttribute('open');
      }
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

    searchDialog.addEventListener('click', (e) => {
      if (e.target === searchDialog) closeSearch();
    });

    searchInput.addEventListener('input', (e) => {
      filterSearch(e.target.value);
    });

    // Keyboard navigation within search
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
        if (filteredItems[selectedIndex]) {
          const targetId = filteredItems[selectedIndex].id;
          const targetEl = document.getElementById(targetId);
          closeSearch();
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', '#' + targetId);
          }
        }
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });

    // Global shortcut: ⌘K, Ctrl+K, or slash "/"
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
