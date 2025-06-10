<template>
  <div class="parent pl-8 pr-8 pt-6 pb-6 h-screen flex flex-col gap-6">
    <Navigation />
    <div class="h-full w-full flex flex-col">
      <NuxtPage class="flex-1 min-h-0" />
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

.parent {
  display: flex;
  background-color: transparent;
  position: absolute;
  inset: 0;
  justify-content: start;
  align-items: start;
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



.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>