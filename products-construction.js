// 건설안전용품(construction) 카테고리 그리드를 products-data.js의 PRODUCTS에서 동적으로 렌더링.
// 2026-09-20: 매너티 안전화 811개 일괄 등록으로 카드 수가 커져서, 정적 HTML 카드 대신
// search.js의 renderSearchCard()와 동일한 패턴으로 이 파일에서 동적 렌더링하도록 전환함.
// 새 건설안전용품 상품을 추가할 때는 이 파일이 아니라 products-data.js의 PRODUCTS 배열만 고치면 됨.

function photoMarkup(photo, name) {
  if (photo) {
    return `<img src="${photo}" alt="${name}" class="product-photo-img" loading="lazy">`;
  }
  return `<div class="product-photo-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15a8 8 0 0 1 16 0v1H4v-1Z"/><path d="M2 16h20"/><path d="M12 7V4"/></svg></div>`;
}

function badgeMarkup(badge) {
  if (!badge) return '';
  const cls = badge === '특가' ? 'product-badge product-badge-sale'
    : badge === 'NEW' ? 'product-badge product-badge-new'
    : 'product-badge';
  return `<span class="${cls}">${badge}</span>`;
}

function renderConstructionCard(p) {
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
              <div class="spec-row"><span>규격</span><span>${p.spec}</span></div>
              <div class="spec-row"><span>원산지</span><span>${p.origin}</span></div>
            </div>
            <div class="product-card-actions">
              <a href="product-detail.html?id=${p.id}" class="btn-detail">상세보기</a>
              <a href="index.html?qname=${encodeURIComponent(p.name)}&qcode=${encodeURIComponent(p.id)}#contact" class="btn-quote">견적문의</a>
            </div>
          </div>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('constructionGrid');
  const countEl = document.getElementById('constructionCount');
  if (!gridEl || typeof PRODUCTS === 'undefined') return;

  const items = PRODUCTS.filter((p) => p.cat === 'construction');
  if (countEl) countEl.textContent = `총 ${items.length}개 상품이 있습니다`;
  gridEl.innerHTML = items.map(renderConstructionCard).join('');
});

