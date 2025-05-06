<template>
    <div class="c flex flex-col gap-2 p-4 h-full">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.c {
    background-color: white;
    border: 1px var(--color-outline_grayNormal) solid;
    border-radius: 0.75rem;
    height: 100%;
    width: 100%;
    min-height: 0;
    min-width: 0;
    flex: 1;
}
</style>