<template>
  <div>
    <t-layout>
      <Sidebar :collapsed="collapsed"></Sidebar>
      <t-layout
        :style="{
          width: collapsed ? 'calc(100vw - 64px)' : 'calc(100vw - 232px)',
        }"
      >
        <t-header
          ><Header
            :collapsed="collapsed"
            @on-toggle-collapsed="toggleCollapsed"
          ></Header
        ></t-header>
        <t-content>
          <Navbar></Navbar>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </t-content>
        <t-footer>
          <Footer></Footer>
        </t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
const MIN_POINT = 992 - 1;
export default {
  name: "Layout",
  components: {
    Sidebar,
    Footer,
    Header,
    Navbar,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  mounted() {
    this.autoCollapsed();
    window.onresize = () => {
      this.autoCollapsed();
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    autoCollapsed() {
      this.collapsed = window.innerWidth <= MIN_POINT;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-view {
  padding: 20px;
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.28s cubic-bezier(0.38, 0, 0.24, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
