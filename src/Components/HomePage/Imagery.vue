<template>
  <div id="image-container" class="image-stack">

    <img class="top-image img-fluid" src="@/assets/home.jpg" loading="lazy" alt="top homepage image" width="2400" height="1200">
    <img class="middle-image img-fluid" src="@/assets/home2.jpg" loading="lazy" alt="middle homepage image" width="2400" height="1200">
    <img class="bottom-image img-fluid" src="@/assets/homeLast.jpg" loading="lazy" alt="bottom homepage image" width="2400" height="1200">

    <div class="pimg1"></div>

    <section class="section section-light">
      <h2>List It</h2>
      <p>
        Market Place to List Your Arts For the Whole World to See
      </p>
    </section>

    <div class="pimg2"></div>

    <section class="section section-light">
      <h2>Find It</h2>
      <p>
        One Stop Shop to Find Everything You Need
      </p>
    </section>

    <div class="pimg3"></div>

    <section class="section section-light">
      <h2>Buy It</h2>
      <p>
        Quick and Easy Way to Buy the Art You &#9829;
      </p>
    </section>

    <div class="pimgLast"></div>
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

body, html{
    height:100%;
    margin:0;
    font-size:16px;
    font-family:"Lato", sans-serif;
    font-weight:400;
    line-height:1.8em;
    color:#666;
  }

  .pimg1, .pimg2, .pimg3, .pimgLast{
    position:relative;
    opacity:0.90;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    background-attachment:fixed;
  }

  .pimg1{
    background-image:url('../../assets/home.jpg');
    min-height:800px;
  }

  .pimg2{
    background-image:url('../../assets/home2.jpg');
    min-height:600px;
  }

  .pimg3{
    background-image:url('../../assets/home3.jpg');
    min-height:600px;
  }

  .pimgLast {
    background-image:url('../../assets/homeLast.jpg');
    min-height:600px;
  }

  .section{
    text-align:center;
    padding:50px 80px;
  }

  .section-light{
    background-color:#f4f4f4;
    color:#666;
  }

  .section-dark{
    background-color:#282e34;
    color:#ddd;
  }

  .ptext{
    position:absolute;
    top:50%;
    width:100%;
    text-align:center;
    color:#000;
    font-size:27px;
    letter-spacing:8px;
    text-transform:uppercase;
  }

  .ptext .border{
    background-color:#111;
    color:#fff;
    padding:20px;
  }

  .ptext .border.trans{
    background-color:transparent;
  }


</style>
