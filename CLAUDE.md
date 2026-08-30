# KM FORCE ((주)케이엠산업) 웹사이트

인천 소재 산업안전용품 유통·제조 기업 (주)케이엠산업의 자사 브랜드 "KM FORCE" 쇼핑 사이트.
실제 회사이며, 실제 사업자등록번호·주소·연락처를 사용하는 라이브 사이트입니다 — 사실과 다른
정보(가짜 통계, 허위 인증, 타사 사진 등)를 넣지 마세요.

- **라이브 사이트**: https://shil1244715-gif.github.io/km-force-shop/ (GitHub Pages, `main` 브랜치 자동 배포)
- **회사 블로그**: https://blog.naver.com/kmbiz2100 (실제 제품 사진 출처, RSS: `rss.blog.naver.com/kmbiz2100.xml`)
- **연락처**: 032-710-1393 / kmbiz2100@naver.com / 인천광역시 동구 방축로83번길 23, 인천산업용품유통단지 10동 111호

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

## 로고

실제 회사 로고 파일이 `logo-icon.png`에 있음 (사용자가 직접 보내준 실제 로고에서 아이콘만
크롭 + 흰 배경 투명화 처리). 기존에 CSS/SVG로 그렸던 가짜 마름모 로고는 전부 제거하고 실제 로고로
교체 완료 — `index.html` 등 11개 HTML 파일 전부, 헤더(밝은 배경)/푸터·챗위젯(남색 배경) 총 3곳씩.
남색 배경 위에서는 `.logo-mark.on-dark` 클래스로 흰색 뱃지를 깔아 대비를 확보함(원본 로고엔 배경이
없어서 남색 위에 그대로 두면 남색 다이아몬드가 안 보임). `favicon.ico` / `favicon.png` /
`apple-touch-icon.png`도 같은 아이콘으로 생성해서 전 페이지 `<head>`에 연결함.
로고 텍스트("KM FORCE")는 이미지로 굽지 않고 계속 `.logo-text`로 HTML 텍스트 유지 — 폰트/색상이
사이트 디자인 시스템과 그대로 맞물리게 하기 위함.
앞으로 로고를 다시 바꿀 일이 있으면 `logo-icon.png` 파일만 교체하면 전 사이트에 반영됨.

## 메인 사진 (히어로 배경)

사용자가 보내준 실제 사진 2장을 히어로 배경으로 사용 중 (`hero-construction.jpg`: 건설현장 전경,
`hero-safety-gear.jpg`: 안전용품 플랫레이). `index.html` 홈 히어로 = 건설현장 사진,
`company-profile.html` 회사소개 히어로 = 안전용품 사진으로 매칭함. 구조는 `.hero-photo`(사진,
background-image) 위에 `.hero-bg`를 겹치는 방식 — 사진이 없는 다른 `.hero` 섹션은 원래의 불투명
블러 그라디언트를 그대로 쓰고, `.hero:has(.hero-photo) .hero-bg`가 그 경우만 override함.

**사진 선명도 — 절대 다시 블러/진하게 넣지 말 것.** 처음엔 남색 그라디언트를 진하게(0.86~0.93
불투명도) + blur(40px)로 깔았다가 사용자가 "사진이 너무 흐리다, 선명하게 나왔으면 좋겠다"고
피드백. 그래서 사진 히어로는 blur 없이, 위/아래만 살짝 어둡게(0.5→0.18→0.3→0.68, 세로
그라디언트)로 바꾸고, 텍스트는 대신 `text-shadow`로 가독성을 확보하는 방식으로 수정함. 앞으로
히어로 사진 관련 요청이 오면 이 가벼운 스크림 방식을 유지하고, 사진 위에 진한 색을 다시 덮지
말 것. 사진을 바꾸려면 같은 파일명으로 교체하거나 `style.css`의
`.hero-photo-construction`/`.hero-photo-safety` 배경 이미지 경로만 바꾸면 됨.

**홈 히어로는 사진도 텍스트 캐러셀과 같이 넘어감.** `index.html`에만 해당 — `.hero-photo`를 슬라이드
개수만큼(3개: 건설현장/안전용품/건설현장 순서로 재사용) 나열해두고 `script.js`의 `goToSlide()`가
`.hero-slide`·`.hero-dot`과 함께 `.hero-photo`도 index로 맞춰 `is-active`를 토글함(opacity
crossfade, `.hero-photo`는 기본 opacity:0, `.is-active`만 1). `company-profile.html`처럼 캐러셀이
없는 단일 히어로는 사진 1장에 `is-active`를 처음부터 박아두면 됨. 사진이 3장 이상 생기면
`index.html`의 `.hero-photo` 3개를 그만큼 늘리기만 하면 JS는 그대로 동작함(개수를 슬라이드 수와
맞추는 게 중요).

## 상품 배지(뱃지)

"BEST 1/2", "특가" 배지는 사용자 요청으로 전부 제거함 (검증 안 된 마케팅 문구라 판단 — 위
"하지 말아야 할 것" 항목의 "확인 안 된 수치 지어내지 말 것"과 같은 맥락). `products-data.js`의
`badge` 필드에서 `"BEST 1"`/`"BEST 2"`/`"특가"` 값을 전부 `""`로 비움, `index.html` /
`products-construction.html` / `products-personal.html` / `products-fire.html`에 하드코딩돼
있던 `<span class="product-badge">...</span>` 뱃지 태그도 제거함. `"NEW"` 배지는 그대로 유지 —
사용자가 NEW는 빼달라고 하지 않았음. `search.js`/`product-detail.js`는 badge 값을 그대로 읽어서
렌더링하는 구조라 데이터만 비웠고 코드는 안 건드림 — 앞으로 배지를 다시 넣게 되면
`products-data.js`의 `badge` 필드만 채우면 전 페이지에 자동 반영됨(단, index.html 등 4개 파일의
하드코딩된 카드는 별도로 다시 넣어야 함 — 이 카드들은 products-data.js를 안 읽는 정적 마크업).

**"재고보유" / "HIT" 태그도 사용자 요청으로 전부 제거함** (특가/BEST 지운 직후 바로 이어서 요청).
`.tag.tag-stock`("재고보유")과 `.tag.tag-hit`("HIT") 두 개 다 없앰 — index.html /
products-construction.html / products-fire.html / products-personal.html의 정적 카드,
search.js의 renderSearchCard(), product-detail.js의 상단 태그(`#detailTags`, 이제
`hidden=true`로 완전히 숨김)와 "함께 찾는 상품" 관련상품 카드까지 전부. 결과적으로 비어버린
`.product-tags` 컨테이너 div는 통째로 지워서 빈 여백이 안 남게 정리함. 앞으로 재고/HIT 표시를
다시 넣어달라는 요청이 오면 이 4곳(정적 HTML 4개 + search.js + product-detail.js 2군데)을 전부
같이 고쳐야 함 — 한 곳만 고치면 나머지에서 다시 나타남.

## 상세보기 링크 무결성

"상세보기를 누르면 실제 상세페이지가 나와야 한다"는 사용자 요청에 따라, 사이트 전체의
`product-detail.html?id=...` 링크와 `products-data.js`의 `PRODUCTS` id들을 전수 대조 검증함
(정적 HTML의 href와 데이터 배열의 id를 diff) — 현재는 32개 상품 전부 깨진 링크 없이 정상 연결됨.
앞으로 새 상품을 추가할 때는 반드시 이 방식으로 (1) products-data.js에 id를 추가하고 (2) 그 id를
참조하는 모든 정적 카드의 href도 같은 id로 맞춰야 함 — products-data.js에만 추가하고 정적 카드의
href를 빠뜨리면 "상세보기"가 다른 상품 페이지로 잘못 연결되거나 404처럼 보일 수 있음.

## 실제 공급사 카탈로그 상품 등록 (K2/블랙야크/장화)

사용자가 K2 안전화(57종), 블랙야크 YAK-501D, 장화 10종(대신/에스큐브/빅스탑/파인웰)이 담긴 PPT
3개를 올려줬고, 그중 대표 8개를 골라 등록함 (`KM-SH-020` ~ `KM-SH-027`, 전부 `건설안전용품`
카테고리). PPT의 슬라이드별 임베드 이미지를 python-pptx로 추출 → 흰 배경으로 flatten →
`product-k2-117be.jpg` 등 8개 파일로 저장(레포 루트, 다른 이미지들과 동일하게 flat 구조).

**주의 — 처음에 이 작업을 빼먹었던 적이 있음.** 사용자가 "제품 등록해달라"고 명확히 답했는데
로고/히어로 사진 등 다른 요청들 처리하다가 실제로 등록을 안 하고 "이어서 하겠다"고만 말하고
넘어간 적이 있음. 사용자가 "내가 준 제품 이미지 사진이 하나도 없다"고 지적하고 나서야 처리함.
여러 요청이 겹칠 때 뒤로 미룬 작업을 실제로 마무리했는지 다음 세션에서 다시 확인할 것.

**등록 시 주의점**: (1) `products-data.js`의 `PRODUCTS`/`PHOTOS`에 추가하는 것만으로는 부족함 —
`products-construction.html`(및 personal/fire) 카테고리 페이지는 `products-data.js`를 안 읽는
정적 HTML이라, 카드를 직접 하드코딩해서 추가하고 상단 "총 N개 상품이 있습니다" 카운트도 같이
고쳐야 실제로 카테고리 페이지에 보임. (2) 가격은 필드에 채워뒀지만 어디에도 표시 안 되는 구조
그대로 유지(견적문의 모델). (3) 스펙은 PPT에 없어서 사진에서 보이는 특징(스틸토캡·BOA다이얼·
GORE-TEX 등)과 일반적으로 알려진 사실만 적었고, 확인 안 된 인증번호는 지어내지 않음.
공급사 카탈로그 사진에 K2/블랙야크/대신/에스큐브/빅스탑 브랜드 로고가 그대로 박혀있는데, 이건
경쟁사 사진이 아니라 (주)케이엠산업이 실제로 유통하는 제품의 제조사 사진이라 "타사 사진 금지"
규칙과 무관함 — 오히려 원본을 그대로 쓰는 게 맞음.

## 미해결 항목 (다음 세션에서 이어갈 것)

1. **사업영역 카드 이미지** — 사진 없이는 아이콘 일러스트로 보완할지 사용자 확인 대기 중
2. ~~검색 결과 페이지~~ — 완료. `search.html` + `search.js` 추가, `products-data.js`의 `PRODUCTS`를
   `?q=` 쿼리로 필터링해 카드 렌더링. 결과 0건일 때는 카테고리 3종 + 문의 링크로 안내.
3. ~~장바구니 정리~~ — 사용자 확인: **나중을 위해 그대로 유지**. cart.html/cart.js는 계속 코드에
   남겨두고, 지금처럼 아무데도 연결하지 않은 상태를 유지할 것 (다시 연결하려면 사용자 지시 필요).
4. ~~무통장입금 계좌 정보~~ — 완료. IBK기업은행 223-118442-04-017 (예금주 (주)케이엠산업)로 전체
   10개 페이지 반영. 통신판매신고번호도 실제 값(제2025-인천동구-021호)으로 채움.
5. **주소 확정** — 사용자 확인 완료: "인천산업용품유통단지 10동 111호"가 맞음(공식 서류 기준).
   이전에 사이트에 있던 "2단지 11동 310호"는 오기였음 — 전체 페이지 교체 완료. 앞으로 주소를
   다시 바꾸지 말 것.

## 하지 말아야 할 것

- 타사(경쟁사) 웹사이트의 사진을 가져다 쓰지 말 것 — 우리 회사 소유가 아닌 사진은 저작권/사실
  왜곡 문제. 사진이 필요하면 KM FORCE 자체 블로그(blog.naver.com/kmbiz2100)나 사용자가 직접
  보내주는 파일만 사용.
- 가격, 매출액, 거래처 수 등 실제로 확인되지 않은 구체적 수치를 새로 지어내지 말 것. 이미 사이트에
  있는 수치(200+ 취급품목, 300+ 납품현장, B+ 신용등급 등)는 사용자가 "대략적인 수치로 괜찮다"고
  승인한 것 — 이 이상으로 더 구체적인 숫자를 임의로 추가하지 말 것.
- 사용자가 AskUserQuestion을 dismiss하면 "진행하지 말고 다음 지시를 기다리라"는 뜻 — 같은 걸 다시
  묻거나 임의로 진행하지 말 것.
