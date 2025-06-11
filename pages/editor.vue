<template>
    <div class="h-full pb-8">
        <Transition name="fade">
            <div
                class="overlay"
                v-if="showSidebar"
            />
        </Transition>

        <div class="editor h-full flex flex-col">
            <div class="flex flex-col">
                <div class="flex gap-4 pb-4 items-center flex-shrink-0 justify-between">
                    <div class="flex flex-row gap-2 items-center">
                        <h1 class="">Phillipp Köbel</h1>
                        <div class="divider"></div>
                        <TabsBorder
                            :tabs="tabs"
                            v-model:active="activeTab"
                            class="h-8 min-w-[220px]"
                        />
                        <Button
                            variant="outline"
                            class="h-8 flex items-center justify-start text-left font-normal"
                            :class="!value ? 'text-muted-foreground' : ''"
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

                <div class="kanban-board">
                    <KanbanUnit
                        v-for="unit in units"
                        :key="unit.unitName"
                        :unit="unit"
                        class="dropshadow"
                        @add-exercise="addExerciseToUnit"
                        @remove-exercise="removeExerciseFromUnit"
                        @move-exercise="moveExercise"
                    />
                </div>
            </div>

            <div class="flex flex-row bg-white rounded-xl w-full h-20 p-4 gap-4 dropshadow">
                <UnitLabel
                    v-for="unit in units"
                    :key="unit.unitName"
                    :name="unit.unitName"
                    :interface="unit.interface"
                />
            </div>
        </div>

        <Transition name="slide-fade">
            <ExerciseSidebar
                v-if="showSidebar"
                @close="showSidebar = false"
            />
        </Transition>
    </div>

</template>

<script setup>
import unitsConfig from '../assets/units_config.json'
import exercisesConfig from '../assets/exercises_config.json'

import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

const showSidebar = ref(false)

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

const getExerciseById = (exerciseId) => {
    return exercisesConfig.exercises.find(ex => ex.id === exerciseId)
}

const addExerciseToUnit = ({ unitName, exercise, position = -1 }) => {
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

const removeExerciseFromUnit = ({ unitName, exerciseId, instanceId }) => {
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

<style lang="scss" scoped>
.editor {
    height: 100%;
    position: relative;
    justify-content: space-between;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
}

.kanban-board {
    display: flex;
    overflow: auto;
    gap: 0.5rem;
    flex: 1;
    padding-bottom: 1rem;
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