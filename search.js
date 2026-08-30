// Search results page — filters the shared PRODUCTS catalog (products-data.js)
// by the `q` query parameter and renders cards using the same markup pattern
// as the static category pages (products-construction.html etc).

function badgeMarkup(badge) {
  if (!badge) return '';
  const cls = badge === '특가' ? 'product-badge product-badge-sale'
    : badge === 'NEW' ? 'product-badge product-badge-new'
    : 'product-badge';
  return `<span class="${cls}">${badge}</span>`;
}

function photoMarkup(photo, name) {
  if (photo) {
    return `<img src="${photo}" alt="${name}" class="product-photo-img" loading="lazy">`;
  }
  return `<div class="product-photo-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10c0-2 2-3 8-3s8 1 8 3v3c0 3-3 6-8 6s-8-3-8-6v-3Z"/><path d="M8 13h.01M16 13h.01"/></svg></div>`;
}

function renderSearchCard(p) {
  return `
  <div class="product-item">
    <div class="product-photo">
      ${badgeMarkup(p.badge)}
      <button class="product-wish" aria-label="찜하기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.35-9.5-8.5C.8 8 2.5 4.5 6 4.5c2 0 3.5 1 6 3.5 2.5-2.5 4-3.5 6-3.5 3.5 0 5.2 3.5 3.5 7C19 15.65 12 20 12 20Z"/></svg></button>
      ${photoMarkup(p.photo, p.name)}
    </div>
    <div class="product-body">
      <h3 class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-specs">
        <div class="spec-row"><span>코드</span><span>${p.id}</span></div>
        <div class="spec-row"><span>분류</span><span>${p.catLabel}</span></div>
        <div class="spec-row"><span>규격</span><span>${p.spec}</span></div>
        <div class="spec-row"><span>원산지</span><span>${p.origin}</span></div>
      </div>
      <div class="product-card-actions">
        <a href="product-detail.html?id=${p.id}" class="btn-detail">상세보기</a>
        <a href="index.html#contact" class="btn-quote">견적문의</a>
      </div>
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const q = (params.get('q') || '').trim();

  const queryTextEl = document.getElementById('queryText');
  const queryDescEl = document.getElementById('queryDesc');
  const countEl = document.getElementById('resultCount');
  const gridEl = document.getElementById('searchGrid');
  const emptyEl = document.getElementById('emptyState');

  queryTextEl.textContent = q || '전체';

  // Also reflect the query back into the header search box for this page.
  const headerInput = document.querySelector('.header-search input[name="q"]');
  if (headerInput) headerInput.value = q;

  let results;
  if (!q) {
    results = [];
    queryDescEl.textContent = '검색어를 입력해 상품을 찾아보세요.';
  } else {
    const needle = q.toLowerCase();
    results = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).filter(p =>
      p.name.toLowerCase().includes(needle) ||
      p.catLabel.toLowerCase().includes(needle) ||
      p.spec.toLowerCase().includes(needle) ||
      p.id.toLowerCase().includes(needle)
    );
    queryDescEl.textContent = `'${q}'(으)로 검색한 상품 목록입니다.`;
  }

  countEl.textContent = `총 ${results.length}개 상품이 있습니다`;

  if (results.length === 0) {
    gridEl.hidden = true;
    emptyEl.hidden = false;
  } else {
    emptyEl.hidden = true;
    gridEl.hidden = false;
    gridEl.innerHTML = results.map(renderSearchCard).join('');
  }
});
