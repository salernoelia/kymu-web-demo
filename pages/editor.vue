<template>
    <Transition name="fade">
        <div
            class="overlay"
            v-if="showSidebar"
        />
    </Transition>

    <div class="editor h-full flex flex-col">
        <h1 class="pb-4">Philipp Köbel</h1>
        <button
            @click="showSidebar = true"
            class="px-4 py-2 bg-primary text-white rounded"
        >
            Open Exercises
        </button>
    </div>

    <Transition name="slide-fade">
        <ExerciseSidebar
            v-if="showSidebar"
            @close="showSidebar = false"
        />
    </Transition>
</template>

<script setup>

const showSidebar = ref(false)
</script>

<style lang="scss" scoped>
.editor {
    position: relative;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.2);
}


.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>