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
  methods: {
    checkFormsHaveItems(data) {
      if (data?._allPersonsMeta?.count <= 0) {
        this.verifySectionList[0].enable = false
      }
      if (data?._allOrganizationsMeta?.count <= 0) {
        this.verifySectionList[1].enable = false
      }
      if (data?._allPersonRelationsMeta?.count <= 0) {
        this.verifySectionList[2].enable = false
      }
      if (data?._allOrganizationRelationsMeta?.count <= 0) {
        this.verifySectionList[3].enable = false
      }
      if (data?._allPersonOrganizationsMeta?.count <= 0) {
        this.verifySectionList[4].enable = false
      }
    },
  },
}
</script>
