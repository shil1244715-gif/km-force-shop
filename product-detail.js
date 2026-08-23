// Populates product-detail.html from the ?id= query param using PRODUCTS (products-data.js)
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find((p) => p.id === id);

  const notFound = document.getElementById('notFound');
  const layout = document.getElementById('detailLayout');
  const roleSection = document.getElementById('roleSection');

  if (!product) {
    notFound.hidden = false;
    return;
  }

  layout.hidden = false;
  roleSection.hidden = false;

  document.title = `${product.name} | KM FORCE`;
  document.getElementById('backLink').href = product.catPage;
  document.getElementById('detailCat').textContent = product.catLabel.toUpperCase();
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailDesc').textContent = product.desc;
  document.getElementById('detailCode').textContent = product.id;
  document.getElementById('detailSpec').textContent = product.spec;
  document.getElementById('detailOrigin').textContent = product.origin;
  document.getElementById('detailIcon').innerHTML = CAT_ICONS[product.cat];

  const badge = document.getElementById('detailBadge');
  if (product.badge) {
    badge.textContent = product.badge;
    badge.hidden = false;
    if (product.badge === 'NEW') badge.classList.add('product-badge-new');
    if (product.badge === '특가') badge.classList.add('product-badge-sale');
  }

  const tags = document.getElementById('detailTags');
  tags.innerHTML = '<span class="tag tag-stock">재고보유</span>' + (product.hit ? '<span class="tag tag-hit">HIT</span>' : '');

  document.getElementById('roleQualityText').textContent =
    `${product.spec}을 획득한 제품으로, 산업 현장에서 요구하는 안전 기준을 충족합니다.`;
  document.getElementById('roleQualityTags').innerHTML =
    `<span>${product.spec}</span><span>${product.origin}</span>`;

  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((p) => `
    <div class="product-item">
      <div class="product-photo">
        ${p.badge ? `<span class="product-badge${p.badge === 'NEW' ? ' product-badge-new' : ''}${p.badge === '특가' ? ' product-badge-sale' : ''}">${p.badge}</span>` : ''}
        <button class="product-wish" aria-label="찜하기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.35-9.5-8.5C.8 8 2.5 4.5 6 4.5c2 0 3.5 1 6 3.5 2.5-2.5 4-3.5 6-3.5 3.5 0 5.2 3.5 3.5 7C19 15.65 12 20 12 20Z"/></svg></button>
        <div class="product-photo-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${CAT_ICONS[p.cat]}</svg></div>
      </div>
      <div class="product-body">
        <h3 class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-specs">
          <div class="spec-row"><span>코드</span><span>${p.id}</span></div>
          <div class="spec-row"><span>규격</span><span>${p.spec}</span></div>
          <div class="spec-row"><span>원산지</span><span>${p.origin}</span></div>
        </div>
        <div class="product-tags">
          <span class="tag tag-stock">재고보유</span>
          ${p.hit ? '<span class="tag tag-hit">HIT</span>' : ''}
        </div>
        <div class="product-card-actions">
          <a href="product-detail.html?id=${p.id}" class="btn-detail">상세보기</a>
          <a href="index.html#contact" class="btn-quote">견적문의</a>
        </div>
      </div>
    </div>
  `).join('');
})();
