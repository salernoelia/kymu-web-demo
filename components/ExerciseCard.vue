<template>
    <div
        class="exercise-card"
        @click="$emit('select', exercise)"
    >
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">{{ exercise.name }}</h3>
                <div
                    class="exercise-type"
                    :class="exercise.exercise_type"
                >
                    {{ formatExerciseType(exercise.exercise_type) }}
                </div>
            </div>
            <p class="card-description">{{ exercise.description }}</p>
            <div class="card-meta">
                <div class="meta-item">
                    <span class="meta-label">Kategorie:</span>
                    <span>{{ exercise.category }}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Dauer:</span>
                    <span>{{ formatDuration(exercise) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    exercise: {
        type: Object,
        required: true
    }
})

const formatExerciseType = (type) => {
    const types = {
        'guided_exercise': 'Geführte Übung',
        'assessment_screen': 'Bewertung'
    }
    return types[type] || type
}

const formatDuration = (exercise) => {
    if (exercise.duration_seconds_goal) {
        return `${exercise.duration_seconds_goal} Sekunden`
    }
    if (exercise.repetitions_goal) {
        return `${exercise.repetitions_goal} Wiederholungen`
    }
    return 'Keine Angabe'
}
</script>

<style scoped>
.exercise-card {
    background-color: white;
    border-radius: var(--radius);
    border: 1px solid hsl(var(--border));
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.exercise-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0;
}

.exercise-type {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    background-color: var(--color-primaryLight);
    color: var(--color-primaryNormal);
}

.exercise-type.assessment_screen {
    background-color: var(--color-warningLight);
    color: var(--color-warningNormal);
}

.card-description {
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
    margin: 0;
}

.card-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.meta-label {
    font-weight: 500;
}
</style>