<template >
  <div v-if="information" class="m-3 pt-3">

    <InfoBreadcrumb :information="information"/>
    <InfoBox :information="information"/>
    <InfoText :information="information" />

    <div class="related-item mt-4 pt-4">
      <hr>
      <h6 class="pb-4">RELATED ARTS</h6>
      <Art :CardArray="relatedItems" />
    </div>

  </div>
</template>

<script>
import InfoBreadcrumb from '@/components/InfoPage/InfoBreadcrumb.vue'
import InfoBox from '@/components/InfoPage/InfoBox.vue'
import InfoText from '@/components/InfoPage/InfoText.vue'
import Art from '@/components/ArtsPage/Art.vue'
import axios from "axios"

export default {
  name:'Info',
  components: {
    InfoBreadcrumb, InfoBox, InfoText, Art
  },
  data() {
    return {
      API_HOST: process.env.VUE_APP_API_HOST,
      information: {},
      relatedItems: []
    }
  },
  created(){
    let artId = this.artId;
    this.information = this.$store.state.arts.items.find(function(art) {
      return art.id == artId
    })
    this.relatedItems = this.sliceRelatedItems

    /* TODO: Move this to VUEX */
    if (!this.information) {
      axios.get(this.API_HOST + '/api/art/all')
      .then(arts => { 
        this.$store.state.arts.items = arts.data;
        this.information = arts.data.find(function(art) {
          return art.id == artId
        })
        this.relatedItems = this.sliceRelatedItems;
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
    }
    /* End of TODO */
  },
  computed: {
    artId() {
      return this.$route.params.artId
    },
    sliceRelatedItems(){
      let MAX_NUMBER_RELATED_ITEMS = 4;
      let artsArray = []
      let temp = []

      if (this.$store.state.arts.items.length > 0) {
        while(artsArray.length < MAX_NUMBER_RELATED_ITEMS) {
          let randomNumber = Math.floor( Math.random() * 10 )
          if(temp.indexOf(randomNumber) === -1) {
            temp.push(randomNumber)
            if ( this.$store.state.arts.items[randomNumber] ) {
              artsArray.push(this.$store.state.arts.items[randomNumber])
            }
          }
        }
      }
      
      return this.relatedItems = artsArray;
    }
  },
  watch: {
    '$route.params.artId': function(artId){
      this.information = this.$store.state.arts.items.find(function(art) {
        return art.id == artId
      })
    }
  }
}
</script>

<style scoped>
hr {
  width: 50px;
  border-bottom: 1px solid black;
}
.related-item{
  height: auto;
  text-align: center;
}
</style>
