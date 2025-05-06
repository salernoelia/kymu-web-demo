<template>
  <div class="parent p-4 h-screen flex flex-row gap-6 overflow-hidden">
    <NavigationLeft />
    <div class="h-full w-full flex flex-col overflow-hidden">
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
  overflow: hidden;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  word-break: break-word;
  background: linear-gradient(118deg, #f0f8ff 30%, #f5f5f5 60%, #f0f8ff 90%);
  background-size: 150% 150%;
  height: 100vh;
  animation: gradientAnimation 30s ease infinite;
  font-family: Poppins;
}

h1 {
  font-size: 32pt;
  font-weight: 300;
  margin: 0;
  padding: 0;
}

h2 {
  font-weight: 300;
  margin: 0;
  padding: 0;
  font-size: 24pt;
}

h3 {
  font-weight: 500;
  margin: 0;
  padding: 0;
  font-size: 16pt;
}

h4 {
  margin: 0;
  padding: 0;
  font-weight: 500;
  margin: 0;
  padding: 0;
  font-size: 12pt;
}

h4 {
  margin: 0;
  padding: 0;
  font-weight: 300;
  margin: 0;
  padding: 0;
  font-size: 11pt;
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