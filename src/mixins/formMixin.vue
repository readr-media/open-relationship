<script>
import axios from 'axios'
import qs from 'qs'
export default {
  methods: {
    goToErrorField() {
      const error = document.querySelector('.fieldError')
      if (error) {
        error.scrollIntoView()
      }
    },
    checkForm(targetForm) {
      // check form before upload
      for (const item of Object.entries(targetForm)) {
        // get form's each field object
        const field = item[1]
        // if there's an unedit field ,but required, return
        if (field.required && field.value === '') {
          field.formState = false
          return false
        }
        // if there's an uncorrect field ,reutrn
        if (field.formState === false) {
          return false
        }
      }
      return true
    },
    clearForm(targetForm) {
      for (const item of Object.entries(targetForm)) {
        // get form's each field object
        const field = item[1]
        // relation input's default type is object, others are string
        if (field.inputStatus.type === 'relation') {
          field.value = { name: '', id: '' }
        } else {
          field.value = ''
        }
      }
    },
    uploadFormToGoogle(form, target) {
      let data = {}
      let url = ''

      switch (target) {
        case 'person':
          url =
            'https://script.google.com/macros/s/AKfycbw7C2oVigkE7cnox82Y9JR3m4YjHjmJKSJg_fheosrTfbSt1c4H/exec'
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
          }
          break

        case 'organization':
          url =
            'https://script.google.com/macros/s/AKfycbw7C2oVigkE7cnox82Y9JR3m4YjHjmJKSJg_fheosrTfbSt1c4H/exec'
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
          }
          break

        case 'personRelation':
          url =
            'https://script.google.com/macros/s/AKfycbwZsp1UIqQUY3q8NMkrTa2M6LqyjIgvl2yRSDOOM1PusWcNyBs/exec'
          data = {
            modify_time: Date(Date.now()).toString(),
            field_name: form.person_id.value,
            person_id: form.person_id.correctVerify,
            related_person_id: form.related_person_id.correctVerify,
            relative: form.relative.correctVerify,
            start_date_year: form.start_date.correctVerify,
            start_date_month: form.start_date.correctVerify,
            start_date_day: form.start_date.correctVerify,
            end_date_year: form.end_date.correctVerify,
            end_date_month: form.end_date.correctVerify,
            end_date_day: form.end_date.correctVerify,
            source: form.source.correctVerify,
          }
          break

        case 'organizationRelation':
          url =
            'https://script.google.com/macros/s/AKfycbwFzV0FKnBH7REv9vMRM0tNc0ZfaLFOcHKoNbvwx-WYEd4HjX0/exec'
          data = {
            modify_time: Date(Date.now()).toString(),
            field_name: form.organization_id.value,
            organization_id: form.organization_id.correctVerify,
            related_organization_id: form.related_organization_id.correctVerify,
            relative: form.relative.correctVerify,
            start_date_year: form.start_date.correctVerify,
            start_date_month: form.start_date.correctVerify,
            start_date_day: form.start_date.correctVerify,
            end_date_year: form.end_date.correctVerify,
            end_date_month: form.end_date.correctVerify,
            end_date_day: form.end_date.correctVerify,
            source: form.source.correctVerify,
          }
          break

        case 'personOrganization':
          url =
            'https://script.google.com/macros/s/AKfycbx56ui4by3Nxsm_RleYlOHCXQiS5eXSG-rv5ZC0jYe6zaClSSw/exec'
          data = {
            modify_time: Date(Date.now()).toString(),
            field_name: form.person_id.value,
            person_id: form.person_id.correctVerify,
            organization_id: form.organization_id.correctVerify,
            role: form.role.correctVerify,
            start_date_year: form.start_date.correctVerify,
            start_date_month: form.start_date.correctVerify,
            start_date_day: form.start_date.correctVerify,
            end_date_year: form.end_date.correctVerify,
            end_date_month: form.end_date.correctVerify,
            end_date_day: form.end_date.correctVerify,
            source: form.source.correctVerify,
          }
          break

        default:
          return
      }

      const cors = 'https://cors-anywhere.herokuapp.com/' // use cors-anywhere to fetch api data

      axios({
        method: 'post',
        url: `${cors}${url}`,
        // data: payload,
        data: qs.stringify(data),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    },
  },
}
</script>
