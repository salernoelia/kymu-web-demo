<template>
    <nav
        class="nav-container "
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div class="flex flex-row items-center pb-4 pt-2">
            <img
                src="/public/logo.svg"
                alt="logo"
                class="logo"
            >
        </div>
        <RouterLink
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="nav-el"
            :class="{ 'router-link-active': $route.path === route.path }"
        >
            <Icon
                class="icon-reg"
                :name="route.icon"
            />
            <Transition name="slide">
                <h4
                    v-if="isHovered"
                    class="nav-label"
                >
                    {{ route.label }}
                </h4>
            </Transition>
        </RouterLink>
    </nav>
</template>

<script setup>

const isHovered = ref(false)

const routes = [
    {
        path: '/',
        icon: 'ic:baseline-person-2',
        label: 'Patient'
    },
    {
        path: '/editor',
        icon: 'ic:baseline-edit',
        label: 'Editor'
    },
    {
        path: '/analyse',
        icon: 'ic:baseline-query-stats',
        label: 'Analyse'
    },
    {
        path: '/bericht',
        icon: 'ic:baseline-picture-as-pdf',
        label: 'Bericht PDF'
    },
    {
        path: '/kommunikation',
        icon: 'ic:outline-chat',
        label: 'Kommunikation'
    }
]
</script>

<style lang="scss" scoped>
.nav-container {
    width: fit-content;
    padding: 0.8rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    gap: 1rem;
    border: 1px var(--color-outline_grayNormal) solid;
    transition: width 0.3s ease;
    background-color: white;
}

.nav-el {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    opacity: 0.5;
    width: fit-content;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    overflow: hidden;
    width: 100%;

    &:hover {
        opacity: 1;
    }

    &.router-link-active {
        border: 1px var(--color-primaryLightActive) solid;
        background-color: var(--color-primaryLight);
        opacity: 1;
    }
}

.nav-label {
    white-space: nowrap;
    margin: 0;
}


.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>