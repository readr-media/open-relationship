import LOGO_PTS_NEWS_LAB from '~/assets/partners/pts-news-lab.svg'

const INTRODUCTION =
  '這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係、甚至說過的每一句話。當資料庫成形，人們可以專心在開發應用或是更深入的調查報導，而不是每一次都要從頭蒐集資料。'

const LINKS = {
  FACEBOOK_PAGE: 'https://www.facebook.com/readr.tw',
  MAIL: 'mailto:readr@readr.tw',
}

const PARTNER_LIST = [
  {
    name: '公視P新聞實驗室',
    logo: LOGO_PTS_NEWS_LAB,
    link: 'https://newslab.pts.org.tw/',
  },
]

const GENDER_MAPPING = {
  M: '男',
  F: '女',
}

const ROUTE_MAPPING = {
  organization: '組織',
  'organization-relation': '組織關係',
  person: '人物',
  'person-organization': '人物組織關係',
  'person-relation': '人物關係',
}

export { GENDER_MAPPING, INTRODUCTION, LINKS, PARTNER_LIST, ROUTE_MAPPING }
