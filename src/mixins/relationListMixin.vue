<script>
export default {
  data() {
    return {
      createSectionList: [
        { id: 1, title: "新增人物", route: "/person", enable: true },
        { id: 2, title: "新增組織", route: "/organization", enable: true },
        {
          id: 3,
          title: "新增人物關係",
          route: "/person_relation",
          enable: false,
        },
        {
          id: 4,
          title: "新增組織關係",
          route: "/organization_relation",
          enable: false,
        },
        {
          id: 5,
          title: "新增人物組織關係",
          route: "/person_organization",
          enable: false,
        },
      ],
      verifySectionList: [
        { id: 1, title: "驗證人物", route: "/person_verify", enable: true },
        {
          id: 2,
          title: "驗證組織",
          route: "/organization_verify",
          enable: true,
        },
        {
          id: 3,
          title: "驗證人物關係",
          route: "/person_relation_verify",
          enable: false,
        },
        {
          id: 4,
          title: "驗證組織關係",
          route: "/organization_relation_verify",
          enable: false,
        },
        {
          id: 5,
          title: "驗證人物組織關係",
          route: "/person_organization_verify",
          enable: false,
        },
      ],
    };
  },
};
</script>
