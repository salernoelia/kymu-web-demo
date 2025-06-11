<template>
    <div
        class="flex flex-row bg-white rounded-xl h-20 p-4 gap-4 dropshadow overflow-x-auto overflow-y-hidden custom-scrollbar">
        <UnitLabel
            v-for="unit in units"
            :key="unit.unitName"
            :name="unit.unitName"
            :interface="unit.interface"
        />
    </div>
</template>

<script setup lang="ts">

type Interfaces = 'vr' | 'tv';

type Unit = {
    unitName: string;
    interface: Interfaces;
    exercises: string[];
};

type PhysioPlan = {
    physioPlan: Unit[];
};

type Units = Unit[];

defineProps<{
    units: Units,
}>()

</script>

<style scoped></style>