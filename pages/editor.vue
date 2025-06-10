<template>
    <div>
        <Transition name="fade">
            <div
                class="overlay"
                v-if="showSidebar"
            />
        </Transition>

        <div class="editor h-full flex flex-col">
            <div class="editor-header">
                <div class="flex flex-row gap-4 items-center">
                    <h1 class="pb-4">Phillipp Köbel</h1>

                    <Tabs
                        :tabs="tabs"
                        v-model:active="activeTab"
                    />
                </div>
                <button
                    @click="showSidebar = true"
                    class="px-4 py-2 bg-primary text-white rounded"
                >
                    Übungs-Bibliothek öffnen
                </button>
            </div>

            <div class="kanban-board">
                <KanbanUnit
                    v-for="unit in units"
                    :key="unit.unitName"
                    :unit="unit"
                    @add-exercise="addExerciseToUnit"
                    @remove-exercise="removeExerciseFromUnit"
                    @move-exercise="moveExercise"
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
    position: relative;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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