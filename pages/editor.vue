<template>
    <div class="h-full pb-8">
        <Transition name="fade">
            <div
                class="overlay"
                v-if="sidebar.open !== 'no'"
            />
        </Transition>

        <div
            class="editor h-full flex flex-col"
            @mouseenter="onKanban = true"
            @mouseleave="onKanban = false"
        >
            <div class="flex flex-col">
                <div class="flex gap-4 pb-4 items-center flex-shrink-0 justify-between">
                    <div class="flex flex-row gap-3 items-center">
                        <h1 class="whitespace-nowrap">Phillipp Köbel</h1>
                        <div class="divider"></div>
                        <TabsBorder
                            :tabs="tabs"
                            v-model:active="activeTab"
                            class="h-8 min-w-[220px]"
                        />
                        <Button
                            variant="outline"
                            class="h-8 flex items-center justify-start text-left font-normal"
                        >
                            <CalendarIcon class="mr-2 h-4 w-4" />
                            <p>Feedback</p>
                        </Button>
                    </div>
                    <div class="flex flex-row gap-6 items-center">
                        <div class="flex flex-row gap-2 items-center">
                            <AvatarRound
                                letters="MM"
                                variant="secondary"
                                size="small"
                            />
                            <AvatarRound
                                letters="DS"
                                variant="tertiary"
                                size="small"
                            />
                            <Icon
                                name="ic:add"
                                class="text-[--color-inactiveNormal]"
                            />
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <Icon
                                name="ic:baseline-history"
                                class="text-2xl text-[--color-inactiveDarker]"
                            />
                            <Icon
                                name="ic:baseline-more-vert"
                                class="text-2xl text-[--color-inactiveDarker]"
                            />
                        </div>
                    </div>
                </div>

                <div class="kanban-board custom-scrollbar-big">
                    <div
                        v-for="(therapistGroup, index) in groupedUnits"
                        :key="therapistGroup.therapist"
                        class="therapist-section"
                    >
                        <div class="therapist-header flex flex-row gap-4 items-center">
                            <AvatarRound
                                size="small"
                                :letters="therapistGroup.therapist == 'Mathias Melz (Sie)' ? 'MM' : 'DS'"
                                :variant="therapistGroup.therapist == 'Mathias Melz (Sie)' ? 'secondary' : 'tertiary'"
                            />
                            <h3 class="therapist-name">{{ therapistGroup.therapist }}</h3>
                            <p class="therapist-type">{{ therapistGroup.therapist_type }}</p>
                        </div>
                        <div class="therapist-units">
                            <KanbanUnit
                                v-for="unit in therapistGroup.units"
                                :key="unit.unitName"
                                :unit="unit"
                                class="dropshadow"
                                @add-exercise="addExerciseToUnit"
                                @edit-exercise="editExercise"
                                @remove-exercise="removeExerciseFromUnit"
                                @move-exercise="moveExercise"
                                @show-sidebar-exercises="(data) => {
                                    sidebar.open = 'add';
                                    sidebar.unitName = data.unitName;
                                }"
                            />
                            <div
                                class="flex gap-2 w-fit h-fit whitespace-nowrap items-center text-[--color-inactiveNormal] mr-4">
                                <Icon name="ic:add" />
                                <h4>
                                    Hinzufügen
                                </h4>
                            </div>

                            <div
                                v-if="index < 1"
                                class="divider-full mr-8"
                            ></div>
                        </div>
                    </div>

                </div>
            </div>

            <div
                class="cursor_blue cursor pointer-events-none"
                :style="{
                    transform: `translate(${x}px, ${y}px)`,
                    position: 'fixed',
                    zIndex: 9999
                }"
                v-if="onKanban"
            >
                <img src="../public/cursor_blue.svg" />
            </div>

            <UnitBar
                v-if="units"
                :units="units"
            />
        </div>

        <Transition name="slide-fade">
            <ExerciseSidebar
                v-if="sidebar.open === 'add'"
                @close="sidebar.open = 'no'"
                @select-exercise="(data) => {
                    addExerciseToUnit({
                        unitName: sidebar.unitName,
                        exercise: data.selectedExercise
                    });

                    sidebar.open = 'edit';
                }"
            />
        </Transition>
        <Transition name="slide-fade">
            <EditExerciseSidebar
                v-if="sidebar.open === 'edit'"
                @close="sidebar.open = 'no'"
                @update-exercise="editExercise"
                :exercise="sidebar.exercise"
                @select-exercise="(data) => {
                    addExerciseToUnit({
                        unitName: sidebar.unitName,
                        exercise: data.selectedExercise
                    });
                    sidebar.open = 'no';
                }"
            />
        </Transition>
    </div>
</template>

<script setup>
import unitsConfig from '../assets/units_config.json'
import exercisesConfig from '../assets/exercises_config.json'

import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, SidebarOpen } from 'lucide-vue-next'
import {
    useMouse
} from '@vueuse/core'

const { x
    , y
    , sourceType
} = useMouse
        ()

const sidebar = ref({
    open: 'no',
    unitName: '',
    exercise: exercisesConfig.exercises.find(ex => ex.id === 'exercise_16')
})
const onKanban = ref(false)

const tabs = ref([
    { name: 'Messwert' },
    { name: 'Archiviert' },
])

const activeTab = ref('Messwert')

const units = ref(unitsConfig.physioPlan.map(unit => ({
    ...unit,
    exercises: unit.exercises.map(exerciseId =>
        exercisesConfig.exercises.find(ex => ex.id === exerciseId)
    ).filter(Boolean)
})))

const groupedUnits = computed(() => {
    const grouped = {}

    units.value.forEach(unit => {
        const therapistKey = unit.therapist
        if (!grouped[therapistKey]) {
            grouped[therapistKey] = {
                therapist: unit.therapist,
                therapist_type: unit.therapist_type,
                units: []
            }
        }
        grouped[therapistKey].units.push(unit)
    })

    return Object.values(grouped)
})


const getExerciseById = (exerciseId) => {
    return exercisesConfig.exercises.find(ex => ex.id === exerciseId)
}

const addExerciseToUnit = ({ unitName, exercise, position = -1 }) => {
    console.log("adding", unitName, exercise, position)
    const unit = units.value.find(u => u.unitName === unitName)
    if (unit) {
        const exerciseWithInstance = { ...exercise, instanceId: Date.now() + Math.random() }

        if (position >= 0 && position < unit.exercises.length) {
            unit.exercises.splice(position, 0, exerciseWithInstance)
        } else {
            unit.exercises.push(exerciseWithInstance)
        }
    }
}

const editExercise = ({ unitName, exercise, instanceId }) => {
    console.log("editing", { unitName, exercise, instanceId });
    const unit = units.value.find(u => u.unitName === unitName);
    if (unit) {
        sidebar.value.exercise = exercise;
        sidebar.value.open = 'edit';
        const index = unit.exercises.findIndex(ex =>
            (instanceId && ex.instanceId === instanceId) || ex.id === exercise.id
        );
        if (index > -1) {
            const existingInstanceId = unit.exercises[index].instanceId;
            const updatedExercise = {
                ...exercise,
                instanceId: existingInstanceId || Date.now() + Math.random()
            };
            unit.exercises.splice(index, 1, updatedExercise);
        }
    }
}


const removeExerciseFromUnit = ({ unitName, exerciseId, instanceId }) => {
    console.log({ unitName, exerciseId, instanceId });
    const unit = units.value.find(u => u.unitName === unitName)
    if (unit) {
        const index = unit.exercises.findIndex(ex =>
            (instanceId && ex.instanceId === instanceId) || ex.id === exerciseId
        )
        if (index > -1) {
            unit.exercises.splice(index, 1)
        }
    }
}

const moveExercise = ({ fromUnit, toUnit, exercise, toPosition = -1 }) => {
    removeExerciseFromUnit({
        unitName: fromUnit,
        exerciseId: exercise.id,
        instanceId: exercise.instanceId
    })

    addExerciseToUnit({
        unitName: toUnit,
        exercise: exercise,
        position: toPosition
    })
}
</script>

<style
    lang="scss"
    scoped
>
.editor {
    height: 100%;
    position: relative;
    justify-content: space-between;
    cursor: none;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
}

.kanban-board {
    display: flex;
    flex-direction: row;
    overflow: auto;
    gap: 0;
    flex: 1;
    padding-bottom: 1rem;
}

.therapist-section {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.therapist-header {
    padding: 1rem 0 0.5rem 0;
    margin-bottom: 1rem;
}

.therapist-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-text-primary, #1a1a1a);
}

.therapist-type {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #6b7280);
    margin: 0.25rem 0 0 0;
}

.therapist-units {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
}

.therapist-divider {
    height: 1px;
    background-color: var(--color-border, #e2e8f0);
    margin: 1.5rem 0;
    width: 100%;
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