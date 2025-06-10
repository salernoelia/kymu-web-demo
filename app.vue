<template>
  <div class="parent">
    <Navigation />
    <div class="page-container">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

body {
  margin: 0;
  padding: 0;
  word-break: break-word;
  background: linear-gradient(118deg, #f0f8ff 30%, #f5f5f5 60%, #f0f8ff 90%);
  background-size: 150% 150%;
  animation: gradientAnimation 30s ease infinite;
  font-family: Poppins;
}

.parent {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.page-container {
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow-y: visible;
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>