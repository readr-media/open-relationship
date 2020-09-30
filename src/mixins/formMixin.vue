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
    uploadFormToGoogle(form) {
      const payload = [Date(Date.now()).toString(), form.name.value];
      for (const item of Object.entries(form)) {
        // get form's each field object
        const correctVerify = item[1].correctVerify;
        payload.push(correctVerify);
      }
      // console.log(form);
      console.log(payload);

      const data = {
        modify_time: Date(Date.now()).toString(),
        field_name: form.name.value,
        name: true,
        aternative: true,
        other_names: false,
      };

      const cors = "https://cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data
      let url =
        "https://script.google.com/macros/s/AKfycbw7C2oVigkE7cnox82Y9JR3m4YjHjmJKSJg_fheosrTfbSt1c4H/exec";

      axios({
        method: "post",
        url: `${cors}${url}`,
        // data: payload,
        data: qs.stringify(data),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // const data = {
      //   name: "LIYI",
      //   phone: "123",
      //   demand: "沒有",
      // };
      // axios({
      //   method: "post",
      //   url:
      //     "https://script.google.com/macros/s/AKfycbysFToJy23aOzqhoRuKvhefP1WDHzTpQpSbf_4Vq52jRxRAOvxo/exec",
      //   data: data,
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
    },
  },
};
</script>
