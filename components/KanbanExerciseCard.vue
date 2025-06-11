<template>
    <div
        class="exercise-card flex flex-row gap-2 items-start"
        draggable="true"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
    >
        <Icon
            name="ic:baseline-drag-handle"
            class="text-2xl"
        />
        <div class="flex flex-col w-full pt-0.5 pb-0.5">
            <div class="exercise-header">
                <h3 class="exercise-title">{{ exercise.name }}</h3>
                <!-- <button
                    class="remove-button"
                    @click="$emit('remove', exercise)"
                    type="button"
                >×</button> -->


                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Icon name="ic:baseline-more-vert" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Duplizieren</DropdownMenuItem>
                        <DropdownMenuItem @click="$emit('edit-exercise', exercise)">Bearbeiten</DropdownMenuItem>
                        <DropdownMenuItem
                            class="text-[--color-dangerNormal]"
                            @click="$emit('remove', exercise)"
                        >Löschen</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p class="label-small">{{ exercise.description }}</p>

            <!-- <div class="exercise-meta">
                <span class="meta-category">{{ exercise.category }}</span>
                <span class="meta-type">{{ exercise.type }}</span>
            </div> -->

            <!-- <div
                class="exercise-stats"
                v-if="hasStats"
            >
                <div
                    v-if="exercise.sets"
                    class="stat-item"
                >
                    <span>Sätze: {{ exercise.sets }}</span>
                </div>
                <div
                    v-if="exercise.repetitions_goal"
                    class="stat-item"
                >
                    <span>Wdh: {{ exercise.repetitions_goal }}</span>
                </div>
                <div
                    v-if="exercise.duration_seconds_goal"
                    class="stat-item"
                >
                    <span>{{ formatDuration(exercise.duration_seconds_goal) }}</span>
                </div>
            </div> -->
        </div>

    </div>
</template>

<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
    exercise: Object,
    unitName: String
})

const emit = defineEmits(['remove', 'edit', 'dragstart', 'dragend'])

const hasStats = computed(() => {
    return props.exercise.sets ||
        props.exercise.repetitions_goal ||
        props.exercise.duration_seconds_goal
})

const handleDragStart = (event) => {
    const dragData = {
        type: 'move-exercise',
        exercise: props.exercise,
        fromUnit: props.unitName
    }

    event.dataTransfer.setData('application/json', JSON.stringify(dragData))
    event.dataTransfer.effectAllowed = 'move'

    emit('dragstart', props.exercise)
}

const handleDragEnd = () => {
    emit('dragend')
}

const formatDuration = (seconds) => {
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return remainingSeconds === 0 ? `${minutes}min` : `${minutes}min ${remainingSeconds}s`
    }
    return `${seconds}s`
}
</script>

<style scoped>
.exercise-card {
    background: white;
    border: 1px solid var(--color-outline_grayNormal);
    border-radius: 8px;
    padding: 12px;
    cursor: none;
    transition: box-shadow 0.2s ease;
}

.exercise-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.exercise-card:active {
    cursor: none;
}

.exercise-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.exercise-title {
    font-family: Poppins;
    font-weight: 500;
    margin: 0;
    font-size: 14px;
    line-height: 1.3;
    color: #212529;
}

.remove-button {
    background: none;
    border: none;
    color: #dc3545;
    font-size: 18px;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.remove-button:hover {
    background-color: #f8d7da;
}

.exercise-description {
    margin: 0 0 8px 0;
    font-size: 13px;
    color: #6c757d;
    line-height: 1.4;
}

.exercise-meta {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.meta-category,
.meta-type {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 11px;
    color: #495057;
    font-weight: 500;
}

.exercise-stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.stat-item {
    font-size: 11px;
    color: #6c757d;
    background: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
    margin-bottom: 0.75rem;
}

.card-header h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    color: #212529;
}

.remove-btn {
    background: none;
    border: none;
    color: #dc3545;
    font-size: 1.25rem;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.remove-btn:hover {
    background-color: #f8d7da;
}

.exercise-description {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    color: #6c757d;
    line-height: 1.4;
}

.exercise-meta {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
}

.category,
.type {
    background: #e9ecef;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    color: #495057;
    font-weight: 500;
}

.exercise-details {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
}

.detail-item .label {
    color: #6c757d;
    font-weight: 500;
}

.detail-item .value {
    background: #f8f9fa;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-weight: 600;
    color: #495057;
}

.target-muscles {
    font-size: 0.75rem;
    color: #6c757d;
    line-height: 1.3;
}

.target-muscles small {
    display: block;
}
</style>