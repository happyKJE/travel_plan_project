// RouletteData.jsx
const rouletteData = [
    {
      region: "서울시",
      places: [
        { name: "경희궁", address: "서울특별시 종로구 새문안로 55" },
        { name: "남산골 한옥마을", address: "서울특별시 중구 퇴계로34길 28" }
      ]
    },
    {
      region: "부산시",
      places: [
        { name: "해동 용궁사", address: "부산광역시 기장군 기장읍 용궁길 86" },
        { name: "태종대", address: "부산광역시 영도구 전망로 24" },
        { name: "해운대해수욕장", address: "부산 해운대구 해운대해변로 264" },
        { name: "감천문화마을", address: "부산 사하구 감내2로 203" }
      ]
    },
    {
      region: "인천시",
      places: [
        { name: "인천 차이나타운", address: "인천광역시 중구 차이나타운로 59" },
        { name: "송도 센트럴파크", address: "인천광역시 연수구 센트럴로 160" }
      ]
    },
    {
      region: "대구시",
      places: [
        { name: "동성로", address: "대구광역시 중구 동성로 2가" },
        { name: "대구근대역사관", address: "대구광역시 중구 동성로3길 7" }
      ]
    },
    {
      region: "광주시",
      places: [
        { name: "광주 국립아시아문화전당", address: "광주광역시 동구 문화전당로 38" },
        { name: "광주 5·18 기념공원", address: "광주광역시 서구 상록로 25" }
      ]
    },
    {
      region: "대전시",
      places: [
        { name: "대전 한밭수목원", address: "대전광역시 서구 월평북로 242" },
        { name: "대동벽화마을 ", address: "대전광역시 동구 백룡로48번길 일대" }
      ]
    },
    {
      region: "울산시",
      places: [
        { name: "대왕암공원", address: "울산광역시 동구 대왕암로 155" },
        { name: "울산대공원", address: "울산광역시 남구 대공원로 94" }
      ]
    },
    {
      region: "경기도",
      places: [
        { name: "에버랜드", address: "경기도 용인시 처인구 포곡읍 에버랜드로 199" },
        { name: "수원 화성", address: "경기도 수원시 장안구 정조로 825" }
      ]
    },
    {
      region: "강원도",
      places: [
        {
          name: "설악산국립공원",
          address: "강원도 속초시 설악동"
        },
        {
          name: "남이섬",
          address: "강원도 춘천시 남산면 남이섬길 1"
        }
      ]
    },

    {
      region: "제주도",
      places: [
        { name: "성산일출봉", address: "제주특별자치도 서귀포시 성산읍 성산리" },
        { name: "만장굴", address: "제주특별자치도 제주시 구좌읍 만장굴길 182" }
      ]
    },
    {
      region: "경상북도",
      places: [
        { name: "구룡포해수욕장", address: "경상북도 포항시 남구 구룡포읍 호미로426번길 6" },
        { name: "국립산림치유원", address: "경상북도 영주시 봉현면 테라피로 209" }
      ]
    },
    {
      region: "경상남도",
      places: [
        { name: "궁항어촌체험마을", address: "경상남도 통영시 산양읍 궁항길 46-8" },
        { name: "금왕사", address: "경상남도 남해군 이동면 보리암로 65-23" }
      ]
    },
    {
      region: "전라북도",
      places: [
        { name: "김제 벽골제", address: "전북특별자치도 김제시 부량면 벽골제로 442" },
        { name: "무성서원[유네스코 세계유산]", address: "전북특별자치도 정읍시 칠보면 원촌1길 44-12" }
      ]
    },
    {
      region: "전라남도",
      places: [
        { name: "담양 창평면 [슬로시티]", address: "전라남도 담양군 창평면 돌담길 56-24" },
        { name: "표충사", address: "전라남도 해남군 삼산면 대흥사길 400" }
      ]
    },
    {
      region: "충청북도",
      places: [
        { name: "충북알프스자연휴양림", address: "충청북도 보은군 산외면 장갑리 산15" },
        { name: "속리산조각공원", address: "충청북도 보은군 속리산면 법주사로 293" }
      ]
    },
    {
      region: "충청남도",
      places: [
        { name: "충남 서산빛들마을", address: "충청남도 서산시 부석면 마룡심포길 77-77" },
        { name: "충곡서원", address: "충청남도 논산시 부적면 충곡로269번길 60-7" }
      ]
    }
];

export const regions = [
  "서울시", "부산시", "인천시", "대구시", "광주시",
  "대전시", "울산시", "경기도", "강원도", "제주도",
  "경상북도", "경상남도", "전라북도", "전라남도",
  "충청북도", "충청남도"
];

export default rouletteData;