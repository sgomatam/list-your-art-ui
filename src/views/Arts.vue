<template>
  <div>
    <BreadCrumbs />
    <Grid />
  </div>
</template>

<script>
import BreadCrumbs from '@/components/ArtsPage/BreadCrumbs.vue'
import Grid from '@/components/ArtsPage/Grid.vue'
import {mapState} from "vuex";

export default {
  components: {
    BreadCrumbs, Grid
  },
  mounted() {
    // For Safari
    document.body.scrollTop = 0; 
    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0; 
  }
}
</script>
