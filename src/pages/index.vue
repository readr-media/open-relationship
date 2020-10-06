<template>
  <div class="app">
    <!-- <Navigation /> -->
    <Hero />
    <Intro />
    <About />
    <Relation />
    <Process />
    <!-- <Cooperation /> -->
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import About from '../components/About'
import Relation from '../components/Relation'
import Process from '../components/Process'
// import Cooperation from "../components/Cooperation";
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default {
  components: {
    Hero,
    Intro,
    About,
    Relation,
    Process,
    // Cooperation,
    Contact,
    Footer,
    Navigation,
  },
  data() {
    return {}
  },
  mounted() {
    this.initIntersectionObserver()
  },

  methods: {
    initIntersectionObserver() {
      const target = document.querySelector('#Footer')
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
  head: {
    title: 'Open Relationship',
  },
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,
    sans-serif;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

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
