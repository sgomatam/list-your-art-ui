<template>
  <div id="image-container" class="image-stack">
    <img class="top-image img-fluid" src="@/assets/home.jpg" loading="lazy" alt="top homepage image" width="2400" height="1200">
    <img class="middle-image img-fluid" src="@/assets/home2.jpg" loading="lazy" alt="middle homepage image" width="2400" height="1200">
    <img class="bottom-image img-fluid" src="@/assets/home3.jpg" loading="lazy" alt="bottom homepage image" width="2400" height="1200">
  </div>
</template>

<script>
export default {
  name: 'Imagery'
}
</script>

<style scoped>
.top-image, .middle-image {
  margin-bottom: 5px;
}

ol.carousel-indicators li {
  background-color: white;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  border: 0.6px solid black;
}

ol.carousel-indicators li.active {
  background: #dbf0fa;
}
</style>
