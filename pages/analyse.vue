<template>
    <div class="h-full flex flex-col overflow-hidden pb-6">
        <div class="flex gap-4 pb-4 items-center flex-shrink-0">
            <div class="flex justify-between w-full">
                <div class="flex flex-row gap-6 items-center">
                    <h1 class="">Phillipp Köbel</h1>




                </div>
                <div class="flex flex-row gap-2 items-center">
                    <Button
                        variant="outline"
                        class="h-8 flex items-center justify-start text-left font-normal border border-[--color-outline_grayNormal]"
                        :class="!value ? 'text-muted-foreground' : ''"
                    >
                        <PencilIcon class="mr-2 h-4 w-4" />
                        <p>Markieren</p>
                    </Button>
                    <Button
                        variant="outline"
                        class="h-8 flex items-center justify-start text-left font-normal border border-[--color-outline_grayNormal]"
                        :class="!value ? 'text-muted-foreground' : ''"
                    >

                        <p>Ansicht</p>
                        <ChevronDown class="mr-2 h-4 w-4" />
                    </Button>
                    <div class="flex flex-row gap-2 items-center">

                        <TabsBorder
                            :tabs="changeView"
                            v-model:active="activeView"
                            class="max-h-8 w-full"
                        />
                    </div>
                </div>

            </div>
        </div>

        <div class="flex flex-col gap-4 flex-1 min-h-0">


            <div class="flex flex-row gap-4 flex-1 min-h-0 w-full">
                <!-- left -->
                <div class="flex flex-col gap-4 w-1/3 min-h-0">
                    <Container class=" gap-3 min-h-0 overflow-auto custom-scrollbar">
                        <h3>Filter</h3>
                        <!-- <Tabs
                            :tabs="tabs"
                            v-model:active="activeTab"
                        /> -->

                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    :class="'w-full justify-start text-left font-normal min-h-10',
                                        !value && 'text-muted-foreground'"
                                >
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    <template v-if="value.start">
                                        <template v-if="value.end">
                                            <h4>
                                                {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                                    df.format(value.end.toDate(getLocalTimeZone())) }}
                                            </h4>
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
                            <Select
                                v-model="activeDataset"
                                class="w-full"
                            >
                                <SelectTrigger class="w-full">
                                    <SelectValue :placeholder="datasetTypes[activeDataset].name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Datensätze</SelectLabel>
                                        <SelectItem
                                            v-for="(dataset, key) in datasetTypes"
                                            :key="key"
                                            :value="key"
                                        >
                                            {{ dataset.name }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select v-model="activeBodyPart">
                                <SelectTrigger class="w-full">
                                    <SelectValue :placeholder="bodyParts[activeBodyPart].name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Körperteile</SelectLabel>
                                        <SelectItem
                                            v-for="(part, key) in bodyParts"
                                            :key="key"
                                            :value="key"
                                        >
                                            {{ part.name }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>



                        <div class="divider-v"></div>

                        <h3>Datensets</h3>

                        <div
                            v-for="test in bodyParts[activeBodyPart].tests"
                            :key="test"
                        >
                            <TestContainer
                                :active="activeTest === test"
                                @click="activeTest = test"
                            >
                                {{ bodyParts[activeBodyPart].name }} {{ test }}
                            </TestContainer>
                        </div>


                    </Container>
                    <Container class="flex-1 min-h-0 overflow-auto 0 custom-scrollbar">
                        <div class="flex flex-row gap-2 justify-between mb-2 ">
                            <h3>Zusammenfassung</h3>
                            <Button
                                variant="outline"
                                class="h-8 flex items-center justify-start text-left font-normal"
                                :class="!value ? 'text-muted-foreground' : ''"
                            >
                                <SparkleIcon class="mr-2 h-4 w-4" />
                                <p>Analyse</p>
                            </Button>
                        </div>

                        <div class="flex flex-col gap-0">
                            <div class="flex gap-2 items-center align-center justify-start">
                                <p class="text-sm text-gray-600 mb-2">{{ datasetTypes[activeDataset].name }}
                                    Durchschnitt</p>
                                <InfoIcon class="mr-2 h-4 w-4" />
                            </div>
                            <div class="flex flex-row gap-2">
                                <SummaryContainer class="flex-1">
                                    <p class="text-sm font-medium mb-1 opacity-50">Links</p>
                                    <div class="flex flex-row items-center justify-between">
                                        <h3>{{ leftSideSummary.average }}{{ datasetTypes[activeDataset].unit }}</h3>
                                        <div :class="[
                                            'flex flex-row items-center px-3 py-1 rounded-lg text-sm font-medium',
                                            leftSideSummary.change > 0 ? 'bg-successLight text-successNormal' :
                                                leftSideSummary.change < 0 ? 'bg-dangerLight text-dangerNormal' :
                                                    'bg-gray-200'
                                        ]">
                                            <p>{{ leftSideSummary.change > 0 ? '+' : '' }}{{ leftSideSummary.change }}%
                                            </p>
                                        </div>
                                    </div>
                                </SummaryContainer>
                                <SummaryContainer class="flex-1">
                                    <p class="text-sm font-medium mb-1 opacity-50">Rechts</p>
                                    <div class="flex flex-row items-center justify-between">
                                        <h3>{{ rightSideSummary.average }}{{ datasetTypes[activeDataset].unit }}</h3>
                                        <div :class="[
                                            'flex flex-row items-center px-3 py-1 rounded-lg text-sm font-medium',
                                            rightSideSummary.change > 0 ? 'bg-successLight text-successNormal' :
                                                rightSideSummary.change < 0 ? 'bg-dangerLight text-dangerNormal' :
                                                    'bg-gray-300 text-red-600'
                                        ]">
                                            <p>{{ rightSideSummary.change > 0 ? '+' : '' }}{{ rightSideSummary.change
                                                }}%
                                            </p>
                                        </div>
                                    </div>
                                </SummaryContainer>
                            </div>
                        </div>

                        <div class="flex flex-col gap-0">
                            <div class="flex gap-2 items-center align-center justify-start">
                                <p class="text-sm text-gray-600  mb-2">Schmerzpunkte</p>
                                <InfoIcon class="mr-2 h-4 w-4" />
                            </div>
                            <div class="flex flex-row gap-2">
                                <SummaryContainer class="flex-1">
                                    <p class="text-sm font-medium mb-1 opacity-50">Links</p>
                                    <div class="flex flex-row items-center justify-between">
                                        <h3>{{ painPointsSummary.left.count }}</h3>
                                        <div :class="[
                                            'flex flex-row items-center px-3 py-1 rounded-lg text-sm font-medium',
                                            painPointsSummary.left.change < 0 ? 'bg-successLight text-successNormal' :
                                                painPointsSummary.left.change > 0 ? 'bg-dangerLight text-dangerNormal' :
                                                    'bg-gray-200'
                                        ]">
                                            <p>{{ painPointsSummary.left.change > 0 ? '+' : '' }}{{
                                                Math.round(painPointsSummary.left.change) }}%
                                            </p>
                                        </div>
                                    </div>
                                </SummaryContainer>
                                <SummaryContainer class="flex-1">
                                    <p class="text-sm font-medium mb-1 opacity-50">Rechts</p>
                                    <div class="flex flex-row items-center justify-between">
                                        <h3>{{ painPointsSummary.right.count }}</h3>
                                        <div :class="[
                                            'flex flex-row items-center px-3 py-1 rounded-lg text-sm font-medium',
                                            painPointsSummary.right.change < 0 ? 'bg-successLight text-successNormal' :
                                                painPointsSummary.right.change > 0 ? 'bg-dangerLight text-dangerNormal' :
                                                    'bg-gray-200'
                                        ]">
                                            <p>{{ painPointsSummary.right.change > 0 ? '+' : '' }}{{
                                                Math.round(painPointsSummary.right.change)
                                                }}%</p>
                                        </div>
                                    </div>
                                </SummaryContainer>
                            </div>
                        </div>

                        <div class="flex flex-col gap-0">
                            <div class="flex gap-2 items-center align-center justify-start">
                                <p class="text-sm text-gray-600 mb-2">Biometriedaten</p>
                                <InfoIcon class="mr-2 h-4 w-4" />
                            </div>
                            <div class="flex flex-row gap-2">
                                <SummaryContainer class="flex-1 flex-col gap-1">

                                    <div class="flex flex-row items-center ">
                                        <HeartPulse class="mr-2 h-4 w-4" />
                                        <div class="flex items-end gap-2">
                                            <h3>{{ randomBpm }}</h3>
                                            <p style="font-size: 8;">bpm</p>

                                        </div>
                                    </div>
                                    <p
                                        class="text-sm font-medium mb-1 bg-gray-300 p-1 rounded-lg opacity-50 text-center">
                                        Normal</p>
                                </SummaryContainer>

                                <SummaryContainer class="flex-1 flex-col gap-1">

                                    <div class="flex flex-row items-center w-full">
                                        <Droplet class="mr-2 h-4 w-4" />
                                        <div class="flex items-end gap-2">
                                            <h3>{{ randomSpO2 }}</h3>
                                            <p style="font-size: 8;">spO2</p>

                                        </div>
                                    </div>
                                    <p
                                        class="text-sm font-medium mb-1 bg-gray-300 p-1 rounded-lg opacity-50 text-center">
                                        Normal</p>
                                </SummaryContainer>


                            </div>

                        </div>
                    </Container>
                </div>

                <!-- right -->
                <div class="flex flex-col gap-4 w-full">
                    <Container class="flex-1 min-h-0 overflow-hidden flex flex-col">
                        <div class="flex justify-between items-center">
                            <h3 class="flex-shrink-0">Zeitstrahl</h3>
                            <TabsBorder
                                :tabs="[{ name: 'Links' },
                                { name: 'Rechts' }, { name: 'Beide' }
                                ]"
                                v-model:active="activeSide"
                                class="h-8 max-w-[320px]"
                            />
                        </div>

                        <div class="flex flex-col gap-2 flex-1 min-h-0">


                            <div class="flex-1 min-h-0 flex flex-col">
                                <div class="flex-1 min-h-0">
                                    <LineGraph
                                        :data="filteredData"
                                        :maxScale="maxScale"
                                        :unit="datasetTypes[activeDataset].unit"
                                    />
                                </div>
                                <div
                                    v-if="activeSide === 'Beide'"
                                    class="flex-1 min-h-0"
                                >
                                    <LineGraph
                                        :data="filteredRightData"
                                        :maxScale="maxScale"
                                        :unit="datasetTypes[activeDataset].unit"
                                    />
                                </div>

                                <div class="flex p-2 gap-4 bg-gray-100 w-fit self-end rounded-xl items-center">
                                    <p class="text-xs text-[--color-inactiveNormal]">Legende:</p>
                                    <div class="flex gap-2 items-center">
                                        <div class="bg-[--color-secondaryNormal] w-2 h-2 rounded-sm"></div>
                                        <h4>Schmerzpunkt</h4>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <div class="bg-[--color-primaryNormal] w-2 h-2 rounded-sm"></div>
                                        <h4>{{ activeTestSplit[0] }}</h4>
                                    </div>
                                    <div
                                        class="flex gap-2 items-center"
                                        v-if="activeTestSplit[1]"
                                    >
                                        <div class="bg-[--color-tertiaryNormal] w-2 h-2 rounded-sm"></div>
                                        <h4>{{ activeTestSplit[1] }}</h4>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </Container>

                    <UnitBar
                        v-if="units"
                        :units="units"
                    />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import unitsConfig from '../assets/units_config.json'
import exercisesConfig from '../assets/exercises_config.json'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    today
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Smile as SmileIcon } from 'lucide-vue-next'
import { Sparkles as SparkleIcon } from 'lucide-vue-next'
import { Pencil as PencilIcon } from 'lucide-vue-next'
import { ChevronDown as ChevronDown } from 'lucide-vue-next'
import { ChartLine as ChartLine } from 'lucide-vue-next'
import { ChartArea as ChartArea } from 'lucide-vue-next'
import { Info as InfoIcon } from 'lucide-vue-next'
import { HeartPulse as HeartPulse } from 'lucide-vue-next'
import { Thermometer as Thermometer } from 'lucide-vue-next'
import { Droplet as Droplet } from 'lucide-vue-next'

definePageMeta({
    keepalive: true
})
const units = ref(unitsConfig.physioPlan.map(unit => ({
    ...unit,
    exercises: unit.exercises.map(exerciseId =>
        exercisesConfig.exercises.find(ex => ex.id === exerciseId)
    ).filter(Boolean)
})))

const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
})

const value = ref(process.client ? {
    start: new CalendarDate(2025, 5, 6),
    end: new CalendarDate(2025, 5, 20).add({ days: 20 }),
} : {
    start: null,
    end: null
});

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })

const formatDate = (date) => {
    return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`
}

const formattedStart = computed(() => formatDate(value.value.start))
const formattedEnd = computed(() => formatDate(value.value.end))


const tabs = ref([
    { name: 'Aktiv' },
    { name: 'Archiviert' }
])

const activeTab = ref(tabs.value[0].name)
const activeSide = ref('Links')

const changeView = ref([
    { name: "Chart", icon: ChartLine },
    { name: "Diagramm", icon: ChartArea }
])

const activeView = ref(changeView.value[0].name)

const timeFrame = ref([
    { name: 'Custom' },
    { name: 'W' },
    { name: 'M' },
    { name: '3M' },
    { name: '6M' },
])

const activeTimeFrame = ref('W')


const datasetTypes = {
    ROM: { name: 'ROM', unit: '°', range: [0, 180] },
    BALANCE: { name: 'Balance', unit: ' score', range: [0, 100] },
    STRENGTH: { name: 'Stärke', unit: 'kg', range: [0, 100] },
    MOTOR: { name: 'Motorik', unit: ' score', range: [0, 10] }
}

const bodyParts = {
    shoulders: { name: 'Schultern', tests: ['Flexion/Extension', 'Abduktion/Adduktion', 'Rotation'] },
    elbows: { name: 'Ellenbogen', tests: ['Flexion/Extension', 'Pronation/Supination'] },
    wrists: { name: 'Handgelenke', tests: ['Flexion/Extension', 'Radial/Ulnar'] },
    hips: { name: 'Hüften', tests: ['Flexion/Extension', 'Abduktion/Adduktion', 'Rotation'] },
    knees: { name: 'Knie', tests: ['Flexion/Extension'] },
    ankles: { name: 'Fussgelenke', tests: ['Dorsal/Plantar', 'Inversion/Eversion'] },
    spine: { name: 'Wirbelsäule', tests: ['Flexion/Extension', 'Lateral Flexion', 'Rotation'] }
}

const activeDataset = ref('ROM')
const activeBodyPart = ref('shoulders')
const activeTest = ref('Flexion/Extension')
const activeTestSplit = computed(() => activeTest.value.split('/'))

const datasets = ref({
    ROM: {},
    BALANCE: {},
    STRENGTH: {},
    MOTOR: {}
})

const generateDataForRange = (startDate, endDate, datasetType, side = 'left') => {
    const dates = []
    const { range } = datasetTypes[datasetType]
    const min = range[0]
    const max = range[1]

    const currentDate = new Date(startDate)
    const end = new Date(endDate)

    let value = min + (max - min) * (0.4 + Math.random() * 0.2)
    if (side === 'right') {
        value *= (0.85 + Math.random() * 0.3)
    }

    while (currentDate <= end) {
        const change = (Math.random() - 0.4) * (max - min) * 0.09
        value = Math.max(min, Math.min(max, value + change))

        const painDegrees = Math.random() > 0.7
            ? Array.from({ length: Math.floor(Math.random() * 3) + 1 },
                () => Math.floor(Math.random() * (value * 0.8)))
            : []

        dates.push({
            date: currentDate.toISOString().split('T')[0],
            value: Math.round(value * 10) / 10,
            painDegrees
        })

        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}

const calculateSummary = (data) => {
    if (!data || data.length === 0) return { average: 0, change: 0 }

    const values = data.map(d => d.value)
    const average = values.reduce((a, b) => a + b, 0) / values.length

    const firstValue = values[0]
    const lastValue = values[values.length - 1]
    const change = ((lastValue - firstValue) / firstValue) * 100

    return {
        average: Math.round(average * 10) / 10,
        change: Math.round(change * 10) / 10
    }
}

const leftSideSummary = computed(() => {
    return calculateSummary(filteredData.value)
})

const randomBpm = computed(() => {
    return Math.floor(Math.random() * (90 - 60)) + 60
})
const randomSpO2 = computed(() => {
    return Math.floor(Math.random() * (95 - 90 + 1)) + 90
})
const randomTemperature = computed(() => {
    return (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1)
})

const painPointsSummary = computed(() => {
    const leftPainCount = filteredData.value.reduce((count, d) => count + (d.painDegrees?.length || 0), 0)
    const rightPainCount = Math.floor(leftPainCount * (Math.random() * 0.4 + 0.8))

    const daysInPeriod = filteredData.value.length
    const previousPeriodPainCount = Math.floor(leftPainCount * (Math.random() * 0.4 + 0.8))
    const rightPreviousPeriodPainCount = Math.floor(rightPainCount * (Math.random() * 0.4 + 0.8))

    return {
        left: {
            count: leftPainCount,
            change: ((leftPainCount - previousPeriodPainCount) / previousPeriodPainCount) * 100
        },
        right: {
            count: rightPainCount,
            change: ((rightPainCount - rightPreviousPeriodPainCount) / rightPreviousPeriodPainCount) * 100
        }
    }
})


const initializeDatasets = () => {
    if (!value.value.start || !value.value.end) return;

    const startDate = new Date(value.value.start.year, value.value.start.month - 1, value.value.start.day)
    const endDate = new Date(value.value.end.year, value.value.end.month - 1, value.value.end.day)

    Object.keys(datasetTypes).forEach(type => {
        if (!datasets.value[type]) {
            datasets.value[type] = {}
        }
        Object.keys(bodyParts).forEach(part => {
            if (!datasets.value[type][part]) {
                datasets.value[type][part] = {}
            }
            bodyParts[part].tests.forEach(test => {
                // Generate both left and right datasets
                datasets.value[type][part][test] = {
                    left: generateDataForRange(startDate, endDate, type, 'left'),
                    right: generateDataForRange(startDate, endDate, type, 'right')
                }
            })
        })
    })
}
const activeData = computed(() => {
    const data = datasets.value[activeDataset.value]?.[activeBodyPart.value]?.[activeTest.value]
    if (!data) return []

    if (activeSide.value === 'Links') return data.left || []
    if (activeSide.value === 'Rechts') return data.right || []
    if (activeSide.value === 'Beide') {
        // Combine both datasets for "Beide" view
        return data.left?.map((leftItem, index) => ({
            ...leftItem,
            rightValue: data.right?.[index]?.value || 0
        })) || []
    }
    return []
})

const rightSideSummary = computed(() => {
    const rightData = datasets.value[activeDataset.value]?.[activeBodyPart.value]?.[activeTest.value]?.right || []
    return calculateSummary(rightData)
})

watch([() => value.value.start, () => value.value.end], () => {
    initializeDatasets()
})



const filteredData = computed(() => {
    return activeData.value.filter(item => {
        const itemDate = new Date(item.date)
        const startDate = new Date(value.value.start.year, value.value.start.month - 1, value.value.start.day)
        const endDate = new Date(value.value.end.year, value.value.end.month - 1, value.value.end.day)
        return itemDate >= startDate && itemDate <= endDate
    })
})

const maxScale = computed(() => {
    const dataset = datasetTypes[activeDataset.value]
    return dataset.range[1]
})

const filteredRightData = computed(() => {
    const rightData = datasets.value[activeDataset.value]?.[activeBodyPart.value]?.[activeTest.value]?.right || []
    return rightData.filter(item => {
        const itemDate = new Date(item.date)
        const startDate = new Date(value.value.start.year, value.value.start.month - 1, value.value.start.day)
        const endDate = new Date(value.value.end.year, value.value.end.month - 1, value.value.end.day)
        return itemDate >= startDate && itemDate <= endDate
    })
})

onMounted(async () => {
    await nextTick()
    if (process.client && value.value.start && value.value.end) {
        initializeDatasets()
    }
})

watch(() => value.value, (newValue) => {
    if (process.client && newValue.start && newValue.end) {
        initializeDatasets()
    }
}, { immediate: true })
</script>

<style
    lang="scss"
    scoped
></style>