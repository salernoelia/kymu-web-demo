<template>
    <div
        class="drop-zone"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @dragenter.prevent
    >
        <span class="drop-text">Hier ablegen</span>
    </div>
</template>

<script setup>
const props = defineProps({
    unitName: String,
    position: Number
})

const emit = defineEmits(['drop-exercise'])

const handleDrop = (event) => {
    event.preventDefault()

    try {
        const data = JSON.parse(event.dataTransfer.getData('application/json'))

        if (data.type === 'new-exercise') {
            emit('drop-exercise', {
                exercise: data.exercise,
                position: props.position
            })
        } else if (data.type === 'move-exercise') {
            emit('drop-exercise', {
                exercise: data.exercise,
                fromUnit: data.fromUnit,
                position: props.position
            })
        }
    } catch (error) {
        console.error('Drop error:', error)
    }
}
</script>

<style scoped>
.drop-zone {
    background-color: #e3f2fd;
    border: 2px dashed #2196f3;
    border-radius: 8px;
    height: 40px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: 0.8;
}

.drop-zone:hover {
    opacity: 1;
    background-color: #bbdefb;
}

.drop-text {
    font-size: 12px;
    color: #1976d2;
    font-weight: 500;
    pointer-events: none;
}
</style>