<script>
import axios from "axios";
import qs from "qs";
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
    uploadFormToGoogle(form, target) {
      // const payload = [Date(Date.now()).toString(), form.name.value];
      // for (const item of Object.entries(form)) {
      //   // get form's each field object
      //   const correctVerify = item[1].correctVerify;
      //   payload.push(correctVerify);
      // }
      // // console.log(form);
      // console.log(payload);
      // console.log(form);
      // console.log(target);

      let data = {};
      let url = "";
      if (target == "person") {
        url =
          "https://script.google.com/macros/s/AKfycbw7C2oVigkE7cnox82Y9JR3m4YjHjmJKSJg_fheosrTfbSt1c4H/exec";
        data = {
          modify_time: Date(Date.now()).toString(),
          field_name: form.name.value,
          name: form.name.correctVerify,
          alternative: form.alternative.correctVerify,
          other_names: form.other_names.correctVerify,
          email: form.email.correctVerify,
          gender: form.gender.correctVerify,
          birth_date_year: form.birth_date.correctVerify,
          birth_date_month: form.birth_date.correctVerify,
          birth_date_day: form.birth_date.correctVerify,
          death_date_year: form.death_date.correctVerify,
          death_date_month: form.death_date.correctVerify,
          death_date_day: form.death_date.correctVerify,
          image: form.image.correctVerify,
          summary: form.summary.correctVerify,
          biography: form.biography.correctVerify,
          national_identity: form.national_identity.correctVerify,
          contact_details: form.contact_details.correctVerify,
          links: form.links.correctVerify,
          source: form.source.correctVerify,
        };
      } else if (target == "organization") {
        url =
          "https://script.google.com/macros/s/AKfycbwWPdn-Vn_P_jnSJ075W5liYeRZZ5EhajHe2LuSFeli_kXDzgAD/exec";
        data = {
          modify_time: Date(Date.now()).toString(),
          field_name: form.name.value,
          name: form.name.correctVerify,
          alternative: form.alternative.correctVerify,
          other_names: form.other_names.correctVerify,
          identifiers: form.identifiers.correctVerify,
          classification: form.classification.correctVerify,
          abstract: form.abstract.correctVerify,
          description: form.description.correctVerify,
          founding_date_year: form.founding_date.correctVerify,
          founding_date_month: form.founding_date.correctVerify,
          founding_date_day: form.founding_date.correctVerify,
          dissolution_date_year: form.dissolution_date.correctVerify,
          dissolution_date_month: form.dissolution_date.correctVerify,
          dissolution_date_day: form.dissolution_date.correctVerify,
          image: form.image.correctVerify,
          contact_details: form.contact_details.correctVerify,
          links: form.links.correctVerify,
          address: form.address.correctVerify,
          source: form.source.correctVerify,
        };
      } else return;

      const cors = "https://cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data

      axios({
        method: "post",
        url: `${cors}${url}`,
        // data: payload,
        data: qs.stringify(data),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>
