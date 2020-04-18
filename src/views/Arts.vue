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
  }
}
</script>
