<template>
    <div class="kanban-unit">
        <div class="unit-header">
            <!-- <Icon
                class="text-3xl"
                :name="unit.interface === 'tv' ? 'ic:baseline-tv' : 'ic:baseline-view-in-ar'"
            /> -->
            <h3 class="unit-title">{{ unit.unitName }}</h3>
            <div
                class="flex flex-row p-2 gap-2 items-center justify-center rounded-xl flex-shrink-0"
                :class="unit.interface === 'vr' ? 'green' : 'blue'"
            >
                <Icon :name="unit.interface === 'vr' ? 'ic:baseline-view-in-ar' : 'ic:baseline-tv'" />
                <h4 class="flex-shrink-0">
                    {{ unit.interface.toUpperCase() }}
                </h4>
            </div>
        </div>

        <div class="unit-content">
            <template
                v-for="(exercise, index) in unit.exercises"
                :key="getExerciseKey(exercise)"
            >
                <KanbanDropZone
                    v-if="shouldShowDropZone(index)"
                    :unit-name="unit.unitName"
                    :position="index"
                    @drop-exercise="handleDropAtPosition"
                />

                <KanbanExerciseCard
                    :exercise="exercise"
                    :unit-name="unit.unitName"
                    @edit-exercise="editExercise"
                    @remove="removeExercise"
                    @dragstart="handleDragStart"
                    @dragend="handleDragEnd"
                />
            </template>

            <KanbanDropZone
                v-if="shouldShowDropZone(unit.exercises.length)"
                :unit-name="unit.unitName"
                :position="unit.exercises.length"
                @drop-exercise="handleDropAtPosition"
            />

            <div
                v-if="unit.exercises.length === 0 && !showDropZone"
                class="empty-state"
            >
                <p class="empty-text">Unit ist leer.</p>
            </div>

            <div
                @click="showSidebarExercises"
                class="flex items-center gap-2 text-[--color-inactiveNormal] pl-4"
            >
                <Icon name="ic:add" />
                <h4>
                    Hinzufügen
                </h4>
            </div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    unit: Object
})

const emit = defineEmits(['add-exercise', 'remove-exercise', 'edit-exercise', 'move-exercise', 'show-sidebar-exercises'])

const showDropZone = ref(false)
const draggedItem = ref(null)

const getExerciseKey = (exercise) => {
    return exercise.instanceId || exercise.id
}

const shouldShowDropZone = (position) => {
    if (!showDropZone.value) return false

    if (draggedItem.value?.fromUnit === props.unit.unitName) {
        const draggedIndex = props.unit.exercises.findIndex(ex =>
            getExerciseKey(ex) === getExerciseKey(draggedItem.value.exercise)
        )

        if (draggedIndex >= 0) {
            return position !== draggedIndex && position !== draggedIndex + 1
        }
    }

    return true
}

const handleDropAtPosition = ({ exercise, fromUnit, position }) => {
    if (fromUnit && fromUnit !== props.unit.unitName) {

        emit('move-exercise', {
            fromUnit,
            toUnit: props.unit.unitName,
            exercise,
            toPosition: position
        })
    } else if (fromUnit === props.unit.unitName) {

        emit('move-exercise', {
            fromUnit,
            toUnit: props.unit.unitName,
            exercise,
            toPosition: position
        })
    } else if (!fromUnit) {
        emit('add-exercise', {
            unitName: props.unit.unitName,
            exercise,
            position
        })
    }
}

const showSidebarExercises = () => {
    emit('show-sidebar-exercises', {
        unitName: props.unit.unitName
    })
}

const editExercise = (exercise) => {
    emit('edit-exercise', {
        unitName: props.unit.unitName,
        exercise: exercise,
        instanceId: exercise.instanceId
    })
}

const removeExercise = (exercise) => {
    emit('remove-exercise', {
        unitName: props.unit.unitName,
        exerciseId: exercise.id,
    })
}

const handleDragStart = (exercise) => {
    showDropZone.value = true
    draggedItem.value = {
        exercise,
        fromUnit: props.unit.unitName
    }
}

const handleDragEnd = () => {
    showDropZone.value = false
    draggedItem.value = null
}

onMounted(() => {
    const handleGlobalDragOver = () => {
        showDropZone.value = true
    }

    const handleGlobalDragEnd = () => {
        showDropZone.value = false
        draggedItem.value = null
    }

    document.addEventListener('dragover', handleGlobalDragOver)
    document.addEventListener('dragend', handleGlobalDragEnd)
    document.addEventListener('drop', handleGlobalDragEnd)

    onUnmounted(() => {
        document.removeEventListener('dragover', handleGlobalDragOver)
        document.removeEventListener('dragend', handleGlobalDragEnd)
        document.removeEventListener('drop', handleGlobalDragEnd)
    })
})
</script>


<style
    scoped
    lang="scss"
>
.kanban-unit {
    min-width: 450px;
    max-width: 450px;
    background: #fff;
    height: fit-content;
    max-height: calc(100vh - 200px - 12rem);
    border-radius: 12px;
    padding: 16px;
    margin-right: 16px;
    box-shadow: var(--dropshadow-main);
    position: relative;
    display: flex;
    flex-direction: column;
}

.unit-header {
    display: flex;
    gap: 0.7rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 16px;
    padding-bottom: 8px;
    padding-top: 4px;
    flex-shrink: 0;

    h3 {
        line-height: 1.1;
    }
}



.exercise-count {
    background: #6c757d;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.green {
    background-color: var(--color-successLightActive);
}

.blue {
    background-color: var(--color-tertiaryLightActive);
}

.unit-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.empty-state {
    padding: 48px 16px;
    text-align: center;
    color: #6c757d;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    margin-top: 16px;
    background: #f8f9fa;
}

.empty-text {
    margin: 0;
    font-style: italic;
    font-size: 14px;
}
</style>