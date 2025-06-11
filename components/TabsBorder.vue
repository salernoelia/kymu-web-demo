<template>
    <div class="tabs-container flex flex-row rounded-lg w-full">
        <button
            v-for="(tab, idx) in tabs"
            :key="tab.name"
            class="tab-item flex-1 flex flex-row items-center justify-center p-2 h-8 px-3 text-sm font-medium rounded-l-md"
            :class="{ 'active': activeTab === tab.name }"
            @click="$emit('update:active', tab.name)"
        >
            <p>{{ tab.name }}</p>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => []
    },
    active: {
        type: String,
        required: true
    }
});

const activeTab = computed(() => props.active);

defineEmits(['update:active']);
</script>

<style lang="scss" scoped>
.tabs-container {
    border: 1px var(--color-outline_grayNormal) solid;
    overflow: hidden;
    flex-wrap: nowrap;
    height: fit-content;
}

.tab-item {
    border-right: 1px var(--color-outline_grayNormal) solid;
    width: auto;
    transition: all 0.2s ease-in-out;
    position: relative;
    color: var(--color-inactiveNormal);

    height: fit-content;
    padding: 1rem;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--color-outline_grayLight);
    }

    &:last-child {
        border-right: none;
    }

    &:hover {
        background-color: var(--color-outline_grayLight);
    }

    &.active {
        background-color: white;
        color: #000;
    }
}

p {
    line-height: 0;
}
</style>