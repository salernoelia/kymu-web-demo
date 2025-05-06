<template>
    <div class="h-full flex flex-col">
        <h1 class="pb-4">Analyse</h1>

        <div class="flex flex-col gap-4 flex-grow w-full">
            <div class="flex flex-row gap-6 opacity-50">
                <h4>{{ formattedStart }} - {{ formattedEnd }}</h4>
                <h4>Schmerzpunkte</h4>
            </div>

            <div class="flex flex-row gap-4 flex-grow w-full">
                <!-- left -->
                <div class="flex flex-col gap-4 h-full w-1/3">
                    <Container>
                        <h3>Filter</h3>
                        <Tabs
                            :tabs="tabs"
                            v-model:active="activeTab"
                        />

                        <RangeCalendar
                            v-model="value"
                            class="rounded-md border"
                        />


                    </Container>
                    <Container>
                        <h3>Zusammenfassung</h3>

                    </Container>
                </div>

                <!-- right -->
                <Container>
                    <h3>Zeitstrahl</h3>
                    <LineGraph
                        :data="filteredData"
                        :maxScale="maxScale"
                    />
                </Container>

            </div>
        </div>
    </div>
</template>

<script setup>
import { RangeCalendar } from '@/components/ui/range-calendar'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })

const formatDate = (date) => {
    return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`
}

const formattedStart = computed(() => formatDate(value.value.start))
const formattedEnd = computed(() => formatDate(value.value.end))

const value = ref({
    start,
    end,
});

const tabs = ref([
    { name: 'Messwert' },
    { name: 'Zeitraum' },
    { name: 'Ansicht' },
])

const activeTab = ref('Messwert')



const timeFrame = ref([
    { name: 'Custom' },
    { name: 'W' },
    { name: 'M' },
    { name: '3M' },
    { name: '6M' },
])

const activeTimeFrame = ref('W')


const data = ref([
    { date: '2025-05-6', value: 30, painDegrees: [5, 7] },
    { date: '2025-05-7', value: 60, painDegrees: [4, 8, 9] },
    { date: '2025-05-8', value: 43, painDegrees: [3, 6] },
    { date: '2025-05-9', value: 85, painDegrees: [30, 60] },
    { date: '2025-05-10', value: 53, painDegrees: [7, 8] },
    { date: '2025-05-11', value: 28, painDegrees: [5, 9] }
])

const filteredData = computed(() => {
    return data.value.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = new Date(value.value.start.year, value.value.start.month - 1, value.value.start.day);
        const endDate = new Date(value.value.end.year, value.value.end.month - 1, value.value.end.day);
        return itemDate >= startDate && itemDate <= endDate;
    });
});

const maxScale = computed(() => {
    return Math.max(...data.value.map(item => Math.max(item.value + item.value / 10)));
});


</script>

<style lang="scss" scoped></style>