// filepath: /Users/eliasalerno/GitHub/kymu-usertest/components/KanbanUnit.vue
<template>
    <div class="kanban-unit">
        <div class="unit-header">
            <h3 class="unit-title">{{ unit.unitName }}</h3>
            <span class="exercise-count">{{ unit.exercises.length }} Übungen</span>
        </div>

        <div class="unit-content">
            <template
                v-for="(exercise, index) in unit.exercises"
                :key="getExerciseKey(exercise)"
            >
                <KanbanDropZone
                    v-if="showDropZone"
                    :unit-name="unit.unitName"
                    :position="index"
                    @drop-exercise="handleDropAtPosition"
                />

                <KanbanExerciseCard
                    :exercise="exercise"
                    :unit-name="unit.unitName"
                    @remove="removeExercise"
                    @dragstart="handleDragStart"
                    @dragend="handleDragEnd"
                />
            </template>

            <KanbanDropZone
                v-if="showDropZone"
                :unit-name="unit.unitName"
                :position="unit.exercises.length"
                @drop-exercise="handleDropAtPosition"
            />

            <div
                v-if="unit.exercises.length === 0"
                class="empty-state"
            >
                <p class="empty-text">Übungen hierher ziehen</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    unit: Object
})

const emit = defineEmits(['add-exercise', 'remove-exercise', 'move-exercise'])

const showDropZone = ref(false)

const getExerciseKey = (exercise) => {
    return exercise.instanceId || exercise.id
}

const handleDropAtPosition = ({ exercise, fromUnit, position }) => {
    if (fromUnit && fromUnit !== props.unit.unitName) {
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

const removeExercise = (exercise) => {
    emit('remove-exercise', {
        unitName: props.unit.unitName,
        exerciseId: exercise.id,
        instanceId: exercise.instanceId
    })
}

const handleDragStart = () => {
    showDropZone.value = true
}

const handleDragEnd = () => {
    showDropZone.value = false
}

onMounted(() => {
    const handleGlobalDragOver = () => {
        showDropZone.value = true
    }

    const handleGlobalDragEnd = () => {
        showDropZone.value = false
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

<style scoped>
.kanban-unit {
    min-width: 350px;
    max-width: 400px;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 16px;
    margin-right: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.unit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
}

.unit-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #495057;
    line-height: 1.3;
}

.exercise-count {
    background: #6c757d;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.unit-content {
    min-height: 500px;
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