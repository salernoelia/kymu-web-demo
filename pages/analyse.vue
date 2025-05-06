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
                    <Container class="h-full">
                        <h3>Filter</h3>
                        <!-- <Tabs
                            :tabs="tabs"
                            v-model:active="activeTab"
                        /> -->

                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    :class="'w-full justify-start text-left font-normal',
                                        !value && 'text-muted-foreground'"
                                >
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    <template v-if="value.start">
                                        <template v-if="value.end">
                                            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                                df.format(value.end.toDate(getLocalTimeZone())) }}
                                        </template>

                                        <template v-else>
                                            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                                        </template>
                                    </template>
                                    <template v-else>
                                        Pick a date
                                    </template>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <RangeCalendar
                                    v-model="value"
                                    initial-focus
                                    :number-of-months="2"
                                    @update:start-value="(startDate) => value.start = startDate"
                                />
                            </PopoverContent>
                        </Popover>

                        <div class="flex flex-row gap-2">
                            <Select>
                                <SelectTrigger class="w-[180px]">
                                    <SelectValue placeholder="Datensatz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Datensätze</SelectLabel>
                                        <SelectItem value="apple">
                                            ROM
                                        </SelectItem>
                                        <SelectItem value="banana">
                                            Balance
                                        </SelectItem>
                                        <SelectItem value="blueberry">
                                            Stärke
                                        </SelectItem>
                                        <SelectItem value="grapes">
                                            Motorik
                                        </SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger class="w-[180px]">
                                    <SelectValue placeholder="Körperteil" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Körperteile</SelectLabel>
                                        <SelectItem value="shoulders">
                                            Schultern
                                        </SelectItem>
                                        <SelectItem value="elbows">
                                            Ellenbogen
                                        </SelectItem>
                                        <SelectItem value="wrists">
                                            Handgelenke
                                        </SelectItem>
                                        <SelectItem value="hips">
                                            Hüften
                                        </SelectItem>
                                        <SelectItem value="knees">
                                            Knie
                                        </SelectItem>
                                        <SelectItem value="ankles">
                                            Fussgelenke
                                        </SelectItem>
                                        <SelectItem value="spine">
                                            Wirbelsäule
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class="divider" />
                        <h4>Test AROM 1</h4>
                        <TestContainer :active="true">
                            Schulter Flexion/Extension
                        </TestContainer>
                        <TestContainer :active="false">
                            Schulter Abduktion/Adduktion
                        </TestContainer>


                        <div class="divider" />
                        <h4>Balance Test </h4>

                        <div class="divider" />
                        <h4>Battery Assessment 01</h4>



                    </Container>
                    <Container class="h-full">
                        <div class="flex flex-row gap-4 justify-between">
                            <h3>Zusammenfassung</h3>
                            <UiButton variant="outline">
                                Analyse
                            </UiButton>
                        </div>
                        <p>Durchschnittlicher AROM</p>
                        <div class="flex flex-row gap-2">
                            <Container>
                                <p>Links</p>
                                <div class="flex flex-row items-center justify-between">
                                    <h3>13</h3>
                                    <div class="flex flex-row items-center bg-gray-100 p-2 rounded-md">
                                        <p>-0.4%</p>
                                    </div>
                                </div>
                            </Container>
                            <Container>
                                <p>Rechts</p>
                                <div class="flex flex-row items-center justify-between">
                                    <h3>13</h3>
                                    <div class="flex flex-row items-center bg-gray-100 p-2 rounded-md">
                                        <p>-0.4%</p>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <p>Schmerzpunkte</p>
                        <div class="flex flex-row gap-2">
                            <Container>
                                <p>Links</p>
                                <div class="flex flex-row items-center justify-between">
                                    <h3>13</h3>
                                    <div class="flex flex-row items-center bg-gray-100 p-2 rounded-md">
                                        <p>-0.4%</p>
                                    </div>
                                </div>
                            </Container>
                            <Container>
                                <p>Links</p>
                                <div class="flex flex-row items-center justify-between">
                                    <h3>13</h3>
                                    <div class="flex flex-row items-center bg-gray-100 p-2 rounded-md">
                                        <p>-0.4%</p>
                                    </div>
                                </div>
                            </Container>
                        </div>


                    </Container>
                </div>

                <!-- right -->
                <Container class="h-full">
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

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    today
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import TestContainer from '~/components/TestContainer.vue'
import { UiButton } from '#components'

const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
})

const value = ref({
    start: new CalendarDate(2025, 5, 6),
    end: new CalendarDate(2025, 5, 20).add({ days: 20 }),
});

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })

const formatDate = (date) => {
    return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`
}

const formattedStart = computed(() => formatDate(value.value.start))
const formattedEnd = computed(() => formatDate(value.value.end))


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