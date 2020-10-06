export const personRelationFields = {
  person_id: {
    label: '姓名',
    info: [
      '若名字有分隔點，請用全形分隔點「・」',
      '原住民中文名與羅馬拼音之間需要空格',
      '若名字之間有空格，請用半形空格',
    ],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  related_person_id: {
    label: '關係者姓名',
    info: [
      '若名字有分隔點，請用全形分隔點「・」',
      '原住民中文名與羅馬拼音之間需要空格',
      '若名字之間有空格，請用半形空格',
    ],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  relative: {
    label: '關係者如何稱呼該人物',
    info: [],
    value: '',
    inputStatus: { type: 'text' },

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
    info: ['網站連結'],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required', 'urlFormat'],
    formState: true,
  },
}
