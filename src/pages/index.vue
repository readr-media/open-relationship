<template>
  <div class="app">
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
import Hero from "../layouts/Hero";
import Intro from "../layouts/Intro";
import About from "../layouts/About";
import Relation from "../layouts/Relation";
import Process from "../layouts/Process";
import Cooperation from "../layouts/Cooperation";
import Contact from "../layouts/Contact";
import Footer from "../layouts/Footer";

export default {
  head: {
    title: "Home page",
  },
  data() {
    return {};
  },

  methods: {},
  components: {
    Hero,
    Intro,
    About,
    Relation,
    Process,
    Cooperation,
    Contact,
    Footer,
  },
};
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
