<template>
  <div id="More">
    <SponsorButton :style="{ marginBottom: '69px' }" />
    <RelativeNews />
  </div>
</template>

<script>
import SponsorButton from './SponsorButton'
import RelativeNews from './RelativeNews'

export default {
  components: {
    SponsorButton,
    RelativeNews,
  },
}
</script>

<style lang="scss" scoped>
#More {
  background: white;
  width: 100%;
  padding: 61px 0 31px;
}
</style>
