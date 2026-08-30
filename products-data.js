// 실제 상품 사진: 회사 자체 보유 파일(로컬 저장) + 공급사 카탈로그 제공 사진만 사용.
// ※ 2026-08-30: 기존에 여기 있던 blog.naver.com(blogthumb.pstatic.net) 링크 11개는
//   전부 죽은 링크(404)로 확인되어 photo:null로 전환하고 이 목록에서 제거함.
//   자세한 경위는 CLAUDE.md "원본 12개 상품 사진 깨짐" 항목 참고.
const PHOTOS = {
  // 공급사 카탈로그 제공 사진 (K2코리아 / 블랙야크 / 대신화학 / 에스큐브 / 빅스탑)
  k2_117be: "product-k2-117be.jpg",
  k2_107be: "product-k2-107be.jpg",
  k2_51n: "product-k2-51n.jpg",
  k2_26: "product-k2-26.jpg",
  blackyakYak501d: "product-blackyak-yak501d.jpg",
  daeshinBoots: "product-daeshin-boots.jpg",
  scubeInsulatedBoots: "product-scube-insulated-boots.jpg",
  vicstopChemicalBoots: "product-vicstop-chemical-boots.jpg",
};

// Shared product catalog — used by product listing cards and the product detail page.
const PRODUCTS = [
  // 건설안전용품
  { id: "KM-HM-001", name: "ABS 산업용 안전모 (백색)", price: 12000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KC 인증", origin: "국내", badge: "", hit: true, photo: null,
    desc: "건설 현장 필수 보호구인 ABS 소재 안전모입니다. 충격 흡수성이 뛰어나며 장시간 착용해도 무게 부담이 적습니다." },
  { id: "KM-HM-003", name: "통풍형 안전모 (황색)", price: 15000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KC 인증", origin: "국내", badge: "NEW", hit: false, photo: null,
    desc: "통풍구가 있어 여름철 현장에서도 쾌적하게 착용할 수 있는 안전모입니다." },
  { id: "KM-SB-005", name: "안전대 (2줄 걸이)", price: 45000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KS 표준", origin: "국내", badge: "", hit: false, photo: null,
    desc: "고소 작업 시 추락을 방지하는 2줄 걸이 안전대로, 이동 중에도 상시 체결 상태를 유지할 수 있습니다." },
  { id: "KM-SH-014", name: "절연 안전화 (6인치)", price: 68000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KC 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "전기 작업 현장에 적합한 절연 기능을 갖춘 6인치 안전화입니다." },
  { id: "KM-NT-002", name: "추락방지망 (그물망)", price: 120000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KS 표준", origin: "국내", badge: "", hit: false, photo: null,
    desc: "고소 작업 구간에 설치하는 추락방지망으로, 낙하물 및 추락 사고를 예방합니다." },
  { id: "KM-SG-009", name: "안전표지판 세트", price: 35000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KC 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "현장 위험 요소를 안내하는 표준 규격 안전표지판 세트입니다." },
  { id: "KM-SR-011", name: "비계용 안전난간대", price: 55000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "KS 표준", origin: "국내", badge: "", hit: false, photo: null,
    desc: "비계 설치 구간의 추락 사고를 예방하는 조립식 안전난간대입니다." },
  { id: "KM-CB-003", name: "안전벨트 고리 (카라비너)", price: 18000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "CE 인증", origin: "수입", badge: "", hit: false, photo: null,
    desc: "안전대와 함께 사용하는 고강도 카라비너 고리로, 국제 인증을 획득한 제품입니다." },
  { id: "KM-SH-020", name: "K2 워킹화 (K2-117BE, 베이지)", price: 58000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "벨크로 스트랩형", origin: "국내", badge: "", hit: false, photo: PHOTOS.k2_117be,
    desc: "K2 세이프티의 벨크로 스트랩형 워킹화입니다. 착탈이 편리해 현장 출입이 잦은 작업에 적합합니다." },
  { id: "KM-SH-021", name: "K2 스틸토캡 안전화 (K2-107BE)", price: 89000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "스틸토캡·BOA 다이얼", origin: "국내", badge: "", hit: false, photo: PHOTOS.k2_107be,
    desc: "스틸토캡으로 발끝을 보호하고, BOA 다이얼로 발등 조임을 세밀하게 조절할 수 있는 K2 안전화입니다." },
  { id: "KM-SH-022", name: "K2 방한 안전화 (K2-51N)", price: 98000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "GORE-TEX 방한", origin: "국내", badge: "", hit: false, photo: PHOTOS.k2_51n,
    desc: "GORE-TEX 소재를 적용한 K2 방한 안전화로, 동절기 외부 현장 작업에 적합합니다." },
  { id: "KM-SH-023", name: "K2 비계화 (K2-26)", price: 79000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "비계작업용", origin: "국내", badge: "", hit: false, photo: PHOTOS.k2_26,
    desc: "비계 설치·해체 작업에 특화된 K2 비계화로, 발목 지지력과 접지력을 강화했습니다." },
  { id: "KM-SH-024", name: "블랙야크 안전화 (YAK-501D)", price: 85000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "BOA 다이얼", origin: "국내", badge: "", hit: false, photo: PHOTOS.blackyakYak501d,
    desc: "블랙야크의 BOA 다이얼 적용 안전화로, 끈 없이 다이얼로 조임을 조절할 수 있습니다." },
  { id: "KM-SH-025", name: "대신 안전 장화", price: 32000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "PVC 인젝션", origin: "국내", badge: "", hit: false, photo: PHOTOS.daeshinBoots,
    desc: "우천·습지 현장에 적합한 PVC 인젝션 공법의 대신 안전 장화입니다." },
  { id: "KM-SH-026", name: "에스큐브 절연장화 (고압용)", price: 62000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "내전압 절연", origin: "국내", badge: "", hit: false, photo: PHOTOS.scubeInsulatedBoots,
    desc: "전기 작업 현장에서 사용하는 에스큐브 고압용 절연장화입니다." },
  { id: "KM-SH-027", name: "빅스탑 내화학 장화", price: 48000, cat: "construction", catLabel: "건설안전용품", catPage: "products-construction.html", spec: "내화학 소재", origin: "국내", badge: "", hit: false, photo: PHOTOS.vicstopChemicalBoots,
    desc: "화학 약품 취급 현장에 적합한 빅스탑 내화학 장화입니다." },

  // 개인안전용품
  { id: "KM-MK-022", name: "방진마스크 2급 (10매입)", price: 9900, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KF80", origin: "국내", badge: "", hit: false, photo: null,
    desc: "분진이 많은 작업 환경에서 호흡기를 보호하는 2급 방진마스크 10매입 제품입니다." },
  { id: "KM-GG-007", name: "산업용 보안경 (김서림방지)", price: 7500, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KC 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "김서림 방지 코팅이 적용되어 장시간 착용해도 시야가 흐려지지 않는 보안경입니다." },
  { id: "KM-GL-015", name: "내화학 안전장갑", price: 6800, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "CE 인증", origin: "수입", badge: "", hit: false, photo: null,
    desc: "화학 약품 취급 작업에 적합한 내화학성 소재의 안전장갑입니다." },
  { id: "KM-CW-004", name: "방한 작업복", price: 42000, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KC 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "동절기 실외 현장 작업에 적합한 보온성 높은 방한 작업복입니다." },
  { id: "KM-EP-008", name: "귀마개 (소음차단)", price: 3500, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KC 인증", origin: "국내", badge: "NEW", hit: false, photo: null,
    desc: "소음이 심한 작업 환경에서 청력을 보호하는 차단형 귀마개입니다." },
  { id: "KM-VT-006", name: "안전조끼 (형광)", price: 8900, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KS 표준", origin: "국내", badge: "", hit: false, photo: null,
    desc: "야간 및 저조도 현장에서 작업자의 시인성을 높여주는 형광 안전조끼입니다." },
  { id: "KM-GG-012", name: "방진고글", price: 11000, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KC 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "분진과 비산물로부터 눈을 보호하는 밀착형 방진고글입니다." },
  { id: "KM-GL-019", name: "미끄럼방지 작업장갑", price: 4200, cat: "personal", catLabel: "개인안전용품", catPage: "products-personal.html", spec: "KS 표준", origin: "국내", badge: "", hit: true, photo: null,
    desc: "손바닥 코팅 처리로 그립력을 높인 미끄럼방지 작업장갑입니다." },

  // 소방안전용품
  { id: "KM-FE-001", name: "분말 소화기 (3.3kg)", price: 25000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "초기 화재 진압에 적합한 3.3kg 분말 소화기입니다." },
  { id: "KM-FD-002", name: "화재감지기 (연기식)", price: 32000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "연기를 감지해 화재 초기 경보를 울리는 연기식 화재감지기입니다." },
  { id: "KM-FB-003", name: "소화전함 (옥내)", price: 180000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "옥내소화전 설비에 사용되는 표준 규격 소화전함입니다." },
  { id: "KM-EL-005", name: "비상유도등", price: 28000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "NEW", hit: false, photo: null,
    desc: "정전 시에도 대피 방향을 안내하는 비상유도등입니다." },
  { id: "KM-FS-007", name: "방화복 세트", price: 350000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "화재 현장 대응을 위한 내열·내화 소재의 방화복 세트입니다." },
  { id: "KM-ES-004", name: "완강기 (피난기구)", price: 220000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: false, photo: null,
    desc: "고층 건물 비상 대피 시 사용하는 완강기(피난기구)입니다." },
  { id: "KM-FH-006", name: "소화기 거치대", price: 9000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KS 표준", origin: "국내", badge: "", hit: false, photo: null,
    desc: "소화기를 안전하게 비치할 수 있는 벽걸이형 거치대입니다." },
  { id: "KM-EL-009", name: "비상조명등", price: 24000, cat: "fire", catLabel: "소방안전용품", catPage: "products-fire.html", spec: "KFI 인증", origin: "국내", badge: "", hit: true, photo: null,
    desc: "정전 시 대피로를 밝혀주는 비상조명등입니다." },
];

const CAT_ICONS = {
  construction: '<path d="M4 15a8 8 0 0 1 16 0v1H4v-1Z"/><path d="M2 16h20"/><path d="M12 7V4"/>',
  personal: '<path d="M4 10c0-2 2-3 8-3s8 1 8 3v3c0 3-3 6-8 6s-8-3-8-6v-3Z"/><path d="M8 13h.01M16 13h.01"/>',
  fire: '<path d="M9 6h6l1 3H8l1-3Z"/><path d="M11 3v3M13 3v3"/><path d="M8 9h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9Z"/><path d="M16 11l4-2"/>',
};

function formatWonPlain(amount) {
  return amount.toLocaleString('ko-KR') + '원';
}
