<template>
    <div
        class="drop-zone"
        :class="{ 'drop-zone--hover': isHovering }"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragOver"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
    >
    </div>
</template>

<script setup>
const props = defineProps({
    unitName: String,
    position: Number
})

const emit = defineEmits(['drop-exercise'])

const isHovering = ref(false)

const handleDrop = (event) => {
    event.preventDefault()
    isHovering.value = false

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

const handleDragOver = (event) => {
    event.preventDefault()
}

const handleDragEnter = (event) => {
    event.preventDefault()
    isHovering.value = true
}

const handleDragLeave = (event) => {
    event.preventDefault()
    // Only set to false if we're actually leaving the drop zone
    if (!event.currentTarget.contains(event.relatedTarget)) {
        isHovering.value = false
    }
}
</script>

<style scoped lang="scss">
.drop-zone {
    background-color: var(--color-primaryLight);
    border: 2px dashed var(--color-primaryNormal);
    border-radius: 8px;
    min-height: 0;
    height: 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    opacity: 0;
    overflow: hidden;
    animation: dropZoneAppear 0.3s ease forwards;

    &--hover {
        opacity: 1;
        background-color: var(--color-primaryLightActive);
        border-color: var(--color-primaryDark);
        animation: dropZoneHover 0.3s ease forwards;
    }
}

@keyframes dropZoneAppear {
    from {
        height: 0;
        min-height: 0;
        opacity: 0;
    }

    to {
        height: 15px;
        min-height: 15px;
        opacity: 0.7;
    }
}

@keyframes dropZoneHover {
    from {
        height: 15px;
        min-height: 15px;
        opacity: 0.7;
    }

    to {
        height: 30px;
        min-height: 30px;
        opacity: 1;
    }
}

.drop-text {
    font-size: 12px;
    color: var(--color-primaryNormal);
    font-weight: 500;
    pointer-events: none;
    white-space: nowrap;
}
</style>