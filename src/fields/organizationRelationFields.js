export const organizationRelationFields = {
  organization_id: {
    label: '組織名稱',
    info: ['若名字之間有空格，請用半形空格'],
    value: { name: '', id: '' },
    inputStatus: { type: 'relation', target: 'organization' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  related_organization_id: {
    label: '關係組織名稱',
    info: ['若名字之間有空格，請用半形空格'],
    value: { name: '', id: '' },
    inputStatus: { type: 'relation', target: 'organization' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  relative: {
    label: '組織與關係組織的從屬關係',
    info: ['例：子公司、母公司、轉投資事業'],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  start_date: {
    label: '關係開始日期',
    info: [
      '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
      '親屬關係發生的原因有：出生、認領、準正、收養、結婚',
    ],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],

    formState: true,
  },
  end_date: {
    label: '關係結束日期',
    info: [
      '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
      '親屬關係消滅的原因有：死亡、婚姻關係消滅、終止或撤銷收養關係',
    ],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],

    formState: true,
  },
  source: {
    label: '資料來源',
    info: [
      '網站連結',
      '若要提供 2 個以上的資料來源網址，請在網址與網址之間加入半形分號',
    ],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required', 'urlFormat'],
    formState: true,
  },
}
