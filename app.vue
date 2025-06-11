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
  font-family: Poppins, sans-serif;
}

.parent {
  /* 
  flex-direction: column;


  box-sizing: border-box;
  overflow: hidden; */
  background: linear-gradient(118deg, #f0f8ff 30%, #f5f5f5 60%, #f0f8ff 90%);
  display: flex;
  flex-direction: column;
  position: absolute;
  inset: 0;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem 0 2rem;
}

.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>