<template>
  <div>
    <Hero />
    <Intro />
    <ProjectOrigin />
    <Relation />
    <Process />
    <Cooperation />
    <Contact />
    <Credit />
    <More />
    <Footer />
  </div>
</template>

<script>
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import ProjectOrigin from '../components/ProjectOrigin'
import Relation from '../components/Relation'
import Process from '../components/Process'
import Cooperation from '../components/Cooperation'
import Contact from '../components/Contact'
import Credit from '../components/Credit'
import More from '../components/More'
import Footer from '../components/Footer'

export default {
  components: {
    Hero,
    Intro,
    ProjectOrigin,
    Relation,
    Process,
    Cooperation,
    Contact,
    Credit,
    More,
    Footer,
  },
  mounted() {
    this.initIntersectionObserver()
  },

  methods: {
    initIntersectionObserver() {
      const target = document.querySelector('#Credit')
      const callback = (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            observer.disconnect()
            this.$ga.event({
              eventCategory: 'projects',
              eventAction: 'scroll',
              eventLabel: 'scroll to end',
            })
          }
        })
      }
      const observer = new IntersectionObserver(callback, {
        threshold: 1,
      })
      observer.observe(target)
    },
  },
}
</script>

<style lang="scss">
.container {
  max-width: 700px !important;
}

.landingPage-title {
  text-align: center;
  margin: 30px;
}

.buttonsContainer {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  li {
    list-style-type: none;
    margin: 5px;
  }
}

.introduction-section {
  .introduction-detail {
    margin: 50px;
    display: flex;
    flex-direction: column;
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
