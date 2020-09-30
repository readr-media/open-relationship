<script>
export default {
  methods: {
    checkForm(targetForm) {
      // check form before upload
      for (const item of Object.entries(targetForm)) {
        // get form's each field object
        const field = item[1];
        // if there's an unedit field ,but required, return
        if (field.required && field.value == "") {
          field.formState = false;
          return;
        }
        // if there's an uncorrect field ,reutrn
        if (field.formState == false) {
          return;
        }
      }
    },
    clearForm(targetForm) {
      for (const item of Object.entries(targetForm)) {
        // get form's each field object
        const field = item[1];
        field.value = "";
      }
    },
  },
};
</script>

