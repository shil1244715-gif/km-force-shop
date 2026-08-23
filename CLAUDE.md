# KM FORCE ((주)케이엠산업) 웹사이트

인천 소재 산업안전용품 유통·제조 기업 (주)케이엠산업의 자사 브랜드 "KM FORCE" 쇼핑 사이트.
실제 회사이며, 실제 사업자등록번호·주소·연락처를 사용하는 라이브 사이트입니다 — 사실과 다른
정보(가짜 통계, 허위 인증, 타사 사진 등)를 넣지 마세요.

- **라이브 사이트**: https://shil1244715-gif.github.io/km-force-shop/ (GitHub Pages, `main` 브랜치 자동 배포)
- **회사 블로그**: https://blog.naver.com/kmbiz2100 (실제 제품 사진 출처, RSS: `rss.blog.naver.com/kmbiz2100.xml`)
- **연락처**: 032-710-1393 / kmbiz2100@naver.com / 인천광역시 동구 방축로83번길 23, 인천산업용품유통단지 2단지 11동 310호

## 사업 모델 — 중요

이 사이트는 **가격 표시가 없는 B2B 견적문의 카탈로그**입니다 (쇼핑카트/즉시결제 아님).
모든 상품 카드는 "상세보기"(product-detail.html) + "견적문의"(index.html#contact로 연결) 두 버튼만
사용하고, 가격이나 "장바구니 담기" 버튼을 다시 넣지 마세요 — 이건 명시적으로 되돌린 결정입니다.

cart.html / cart.js의 장바구니 인프라는 아직 코드에 남아있지만 실제로는 아무데도 연결되어 있지
않은 상태(정리 여부 미정, 아래 "미해결 항목" 참고).

## 배포 워크플로우

- 작업은 `claude/naver-blog-content-r51qn7` 브랜치에서 진행하고, PR을 만들어 **바로 `main`에 merge**합니다
  (사용자가 라이브 사이트를 직접 계속 확인하므로, 병합을 미루지 말 것).
- GitHub Pages는 `main` 브랜치 `/(root)`에서 서빙됩니다.
- 저장소는 `my-shopping-site` → `km-force-shop`으로 이름이 바뀐 적이 있음. `git remote -v`가 여전히
  `my-shopping-site`로 나오면 `git remote set-url origin https://github.com/shil1244715-gif/km-force-shop`으로
  고칠 것 (세션이 리셋되면 종종 되돌아가 있음).
- 이 샌드박스의 프록시는 `blog.naver.com`/`rss.blog.naver.com`은 허용하지만 `*.pstatic.net`(이미지
  CDN)은 차단합니다 — 그래서 이미지 다운로드가 안 되고, `<img src="https://blogthumb.pstatic.net/...">`
  로 직접 hotlink해야 합니다. 실제 방문자 브라우저는 이 프록시의 영향을 받지 않으므로 정상 로드됩니다.

## 페이지 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 홈 — 히어로 캐러셀, 신뢰지표, 세부카테고리 9종, 제품 카테고리 3종, 인기상품, 문의폼 |
| `company-profile.html` | 회사소개(지명원) 전용 페이지 — 회사개요/CEO메시지/사업영역/핵심가치/경쟁력/신용도/주요거래처/비전. 헤더의 "회사소개"는 항상 여기로 연결 (홈에는 더 이상 이 섹션들이 없음) |
| `products-construction.html` / `products-personal.html` / `products-fire.html` | 건설/개인/소방안전용품 카테고리별 상품 목록 (각 8개, 총 24개) — 네이버 블로그의 실제 상위 카테고리 3개와 일치 |
| `product-detail.html` + `product-detail.js` | `?id=` 쿼리로 상품 상세 렌더링. 데이터는 `products-data.js`의 `PRODUCTS` 배열 |
| `products-data.js` | 상품 24개 공용 데이터 (id/name/cat/spec/origin/badge/photo 등). 카드·상세페이지가 모두 이걸 참조 |
| `cart.html` / `cart.js` | 장바구니 인프라 (현재 미사용 — 위 "미해결 항목" 참고) |
| `terms.html` / `privacy-policy.html` / `shopping-guide.html` | 이용약관 / 개인정보처리방침 / 쇼핑몰 이용안내 |
| `style.css` / `script.js` | 공용 스타일 / 공용 스크립트 (네비 토글, 문의폼 검증, 히어로 캐러셀, 카테고리 탭) |

## 디자인 시스템

- 색상: 남색 `--color-navy: #16264f` / `--color-navy-deep: #0e1a3a` / `--color-navy-soft: #1c2f61`,
  오렌지 `--color-orange: #c24715` (텍스트 대비 위해 `--color-orange-vivid: #e8622c`보다 어둡게 조정됨).
  모든 색상 조합은 WCAG AA 대비 확인됨 — 임의로 더 쨍한 색으로 바꾸지 말 것.
- 폰트: Pretendard Variable (본문/UI) — 세리프·디스플레이 폰트 없음.
- 상품 카드 표준 구조: `.product-photo`(사진 또는 아이콘) → `.product-body`(이름/스펙/태그) →
  `.product-card-actions`(상세보기 + 견적문의).

## 미해결 항목 (다음 세션에서 이어갈 것)

1. **사업영역 카드 이미지** — 사진 없이는 아이콘 일러스트로 보완할지 사용자 확인 대기 중
2. **검색 결과 페이지** — 헤더 검색창은 있지만 `search.html`이 없어 검색 시 404
3. **장바구니 정리** — 모든 상품이 견적문의 방식이라 장바구니에 담을 게 없음. 아이콘/페이지를
   완전히 없앨지 유지할지 미정
4. **무통장입금 계좌 정보** — 푸터에 "등록 준비 중" placeholder, 실제 계좌 필요

## 하지 말아야 할 것

- 타사(경쟁사) 웹사이트의 사진을 가져다 쓰지 말 것 — 우리 회사 소유가 아닌 사진은 저작권/사실
  왜곡 문제. 사진이 필요하면 KM FORCE 자체 블로그(blog.naver.com/kmbiz2100)나 사용자가 직접
  보내주는 파일만 사용.
- 가격, 매출액, 거래처 수 등 실제로 확인되지 않은 구체적 수치를 새로 지어내지 말 것. 이미 사이트에
  있는 수치(200+ 취급품목, 300+ 납품현장, B+ 신용등급 등)는 사용자가 "대략적인 수치로 괜찮다"고
  승인한 것 — 이 이상으로 더 구체적인 숫자를 임의로 추가하지 말 것.
- 사용자가 AskUserQuestion을 dismiss하면 "진행하지 말고 다음 지시를 기다리라"는 뜻 — 같은 걸 다시
  묻거나 임의로 진행하지 말 것.
