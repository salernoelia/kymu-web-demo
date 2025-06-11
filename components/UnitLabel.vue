<template>
    <div
        class="flex items-center justify-center p-2 pt-6 pb-6  rounded-xl gap-2 border-[--color-outline_grayNormal] border flex-shrink-0 ">

        <h4 class="flex-shrink-0">
            {{ name }}
        </h4>

        <div
            class="flex flex-row p-2 gap-2 items-center justify-center rounded-xl flex-shrink-0"
            :class="interface === 'vr' ? 'green' : 'blue'"
        >
            <Icon :name="interface === 'vr' ? 'ic:baseline-view-in-ar' : 'ic:baseline-tv'" />
            <h4 class="flex-shrink-0">
                {{ interface.toUpperCase() }}
            </h4>
        </div>
    </div>
</template>

<script setup lang="ts">
type Interfaces = 'vr' | 'tv';

defineProps<{
    name: string;
    interface: Interfaces;
}>()
</script>

<style scoped>
.green {
    background-color: var(--color-successLightActive);
}

.blue {
    background-color: var(--color-tertiaryLightActive);
}
</style>