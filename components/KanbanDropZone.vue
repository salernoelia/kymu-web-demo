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

<style scoped lang="scss">
.drop-zone {
    background-color: var(--color-primaryLight);
    border: 2px dashed var(--color-primaryNormal);
    border-radius: 8px;
    min-height: 40px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: 0.5;

    &:hover {
        opacity: 1;
        background-color: var(--color-primarLightActive);
    }
}


.drop-text {
    font-size: 12px;
    color: var(--color-primaryNormal);
    font-weight: 500;
    pointer-events: none;
}
</style>