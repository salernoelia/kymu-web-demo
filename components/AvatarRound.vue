<template>
    <div
        class="avatar-container"
        :class="[variant, size]"
    >
        <h4>
            {{ letters }}
        </h4>
    </div>
</template>

<script setup lang="ts">
defineProps({
    letters: String,
    variant: {
        type: String,
        default: 'secondary',
        validator: (value: string) => ['secondary', 'tertiary'].includes(value)
    },
    size: {
        type: String,
        default: 'normal',
        validator: (value: string) => ['normal', 'small'].includes(value)
    }
})
</script>

<style scoped lang="scss">
.avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 9999px;
    min-width: 2.5rem;
    min-height: 2.5rem;

    h4 {
        font-size: 0.8rem;
    }

    &.small {
        min-width: 2rem;
        min-height: 2rem;
        padding: 0.25rem;

        h4 {
            font-size: 0.7rem;
        }
    }

    &.secondary {
        background-color: var(--color-secondaryLight);
        border: 1px solid var(--color-secondaryNormal);
        color: var(--color-secondaryNormal);
    }

    &.tertiary {
        background-color: var(--color-tertiaryLight);
        border: 1px solid var(--color-tertiaryDark);
        color: var(--color-tertiaryDarker);
    }
}
</style>