<template>
  <footer class="footer">
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

.footer {
  padding: 30px 10px 20px;
  position: relative;
  z-index: 1;
  background-color: #dbf0fa;
}

</style>
