<template>
  <div>
    <nav class="row justify-content-start" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item"><router-link to="/arts">Arts</router-link></li>
        <li class="breadcrumb-item">{{ information.authorName }}</li>
        <li class="breadcrumb-item active">{{ information.artName }}</li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['information'],
  name: 'InfoBreadcrumb'
}
</script>

<style scoped>
.breadcrumb{
  background: inherit;
}

.breadcrumb>li>a {
  text-decoration: none;
  color: #2c3539 !important;
  font-size: 16px;
}
.breadcrumb>li>a:hover {
  text-decoration: underline;
}

.breadcrumb-item.active {
  text-decoration: none !important;
  color: #c16666 !important;
}
</style>
