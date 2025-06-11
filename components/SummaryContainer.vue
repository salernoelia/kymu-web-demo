<template>
    <div :class="['c flex flex-col gap-0 py-2 px-4', outline]">
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    outline: {
        default: 'gray'
    }
})
</script>

<style lang="scss" scoped>
.c {
    border: 1px var(--color-outline_grayNormal) solid;
    background-color: #F9F6F8;
    border-radius: 0.6rem;
    width: 100%;
    min-height: 0;
    min-width: 0;

    .gray {
        border: 1px var(--color-outline_grayNormal) solid;
        background-color: #F9F6F8;
    }
}
</style>