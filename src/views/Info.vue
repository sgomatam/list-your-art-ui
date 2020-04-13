<template >
  <div class="container py-5" style="padding-top:70px;">

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
import InfoBreadcrumb from '@/Components/InfoPage/InfoBreadcrumb.vue'
import InfoBox from '@/Components/InfoPage/InfoBox.vue'
import InfoText from '@/Components/InfoPage/InfoText.vue'
import Art from '@/Components/ArtsPage/Art.vue'
import axios from "axios"

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
    this.information = this.$store.state.items[this.artId]
    this.relatedItems = this.sliceRelatedItems

    /* TODO: Move this to VUEX */
    axios.get('http://listyourart-stage.us-east-2.elasticbeanstalk.com/api/getAllArts')
    .then(arts => { 
      this.$store.state.items = arts.data;
      this.information = arts.data[this.artId];
      this.relatedItems = this.sliceRelatedItems;
    })
    .catch(error => {
      throw new Error(`API ${error}`);
    });
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
          artsArray.push(this.$store.state.items[randomNumber])
        }
      }
      return this.relatedItems = artsArray
    }
  },
  watch: {
    '$route.params.artId': function(artId){
      this.information = this.$store.state.items[this.artId]
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
