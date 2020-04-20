<template >
  <div v-if="information" class="container py-5" style="padding-top:70px;">

    <InfoBreadcrumb :information="information"/>
    <InfoBox :information="information"/>
    <InfoText />

    <div class="related-item">
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

const API_URL = 'http://lya-api.us-east-2.elasticbeanstalk.com/api/';

export default {
  name:'Info',
  components: {
    InfoBreadcrumb, InfoBox, InfoText, Art
  },
  data() {
    return {
      information: {},
      relatedItems: []
    }
  },
  created(){
    this.information = this.$store.state.arts.items[this.artId]
    this.relatedItems = this.sliceRelatedItems

    /* TODO: Move this to VUEX */
    if (!this.information) {
      axios.get(API_URL + 'art/all')
      .then(arts => { 
        this.$store.state.arts.items = arts.data;
        this.information = arts.data[this.artId];
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
      return this.$route.params.artId - 1
    },
    sliceRelatedItems(){
      let MAX_NUMBER_RELATED_ITEMS = 4;
      let artsArray = []
      let temp = []

      while(artsArray.length < MAX_NUMBER_RELATED_ITEMS) {
        let randomNumber = Math.floor( Math.random() * 10 )
        if(temp.indexOf(randomNumber) === -1) {
          temp.push(randomNumber)
          artsArray.push(this.$store.state.arts.items[randomNumber])
        }
      }
      return this.relatedItems = artsArray
    }
  },
  watch: {
    '$route.params.artId': function(artId){
      this.information = this.$store.state.arts.items[this.artId]
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
