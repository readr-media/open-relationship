<script>
export default {
  data() {
    return {
      createSectionList: [
        { id: 1, title: '新增人物', route: '/person/create', enable: true },
        {
          id: 2,
          title: '新增組織',
          route: '/organization/create',
          enable: true,
        },
        {
          id: 3,
          title: '新增人物關係',
          route: '/person-relation/create',
          enable: true,
        },
        {
          id: 4,
          title: '新增組織關係',
          route: '/organization-relation/create',
          enable: true,
        },
        {
          id: 5,
          title: '新增人物組織關係',
          route: '/person-organization/create',
          enable: true,
        },
      ],
      verifySectionList: [
        { id: 1, title: '驗證人物', route: '/person/verify', enable: true },
        {
          id: 2,
          title: '驗證組織',
          route: '/organization/verify',
          enable: true,
        },
        {
          id: 3,
          title: '驗證人物關係',
          route: '/person-relation/verify',
          enable: true,
        },
        {
          id: 4,
          title: '驗證組織關係',
          route: '/organization-relation/verify',
          enable: true,
        },
        {
          id: 5,
          title: '驗證人物組織關係',
          route: '/person-organization/verify',
          enable: true,
        },
      ],
    }
  },
}
</script>
