<template>
  <footer id="footer">
    <div class="container">
      <div class="row justify-content-between">

        <!-- Newsletter Text -->
        <div class="copyright">
          <h6>&copy;List Your Art</h6>
        </div>

        <!-- Newsletter Form -->
        <div class="contact-us">
          <h6><router-link to="/contact">Contact Us</router-link></h6>
        </div>

      </div>
    </div>    
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

#footer {
  padding: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem; 
  background-color: #dbdbdc;
}

</style>
