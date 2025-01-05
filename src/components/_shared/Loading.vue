<template>
  <div class="container">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
}
.loader {
  width: 120px;
  height: 20px;
  -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) left/20% 100%;
  mask: linear-gradient(90deg, #000 70%, #0000 0) left/20% 100%;
  background: linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat #ddd;
  animation: l7 1s infinite steps(6);
}
@keyframes l7 {
  100% {
    background-position: right -25% top 0;
  }
}
</style>
