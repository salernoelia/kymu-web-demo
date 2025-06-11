<template>
    <nav class="nav-container">
        <div class="flex flex-row items-center pb-2 pt-2 gap-6">
            <img
                src="/public/logo.svg"
                alt="logo"
                class="logo"
            >
            <div class="flex flex-row gap-4 items-center">
                <Icon
                    name="ic:outline-home"
                    class="text-3xl text-[--color-inactiveNormal]"
                />
                <Icon
                    name="ic:outline-language"
                    class="text-2xl text-[--color-inactiveNormal]"
                />
            </div>
        </div>
        <div class="flex flex-row gap-4">
            <NuxtLink
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
                <h4 class="nav-label">
                    {{ route.label }}
                </h4>
            </NuxtLink>
        </div>
        <div class="flex flex-row gap-4 items-center">
            <Icon
                name="ic:outline-settings"
                class="text-2xl text-[--color-inactiveNormal]"
            />
            <Icon
                name="ic:outline-mail"
                class="text-2xl text-[--color-inactiveNormal]"
            />

            <AvatarRound
                letters="MM"
                variant="secondary"
            />
        </div>

    </nav>
</template>

<script setup>
const routes = [
    {
        path: '/',
        icon: 'ic:person',
        label: 'Details'
    },
    {
        path: '/editor',
        icon: 'ic:baseline-edit',
        label: 'Editor'
    },
    {
        path: '/analyse',
        icon: 'ic:baseline-bar-chart',
        label: 'Analyse'
    },
    {
        path: '/bericht',
        icon: 'ic:baseline-picture-as-pdf',
        label: 'Bericht'
    },
    {
        path: '/kommunikation',
        icon: 'ic:baseline-screen-rotation-alt',
        label: 'Miete'
    }
]
</script>

<style lang="scss" scoped>
.nav-container {
    padding: 0.25rem 1rem;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0.5rem;
    gap: 0.25rem;
    border: 1px var(--color-outline_grayLightActive) solid;
    transition: width 0.3s ease;
    background-color: white;
    align-items: center;
    box-shadow: var(--dropshadow-main);
}

.nav-el {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    opacity: 0.5;
    width: fit-content;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    border: 1px transparent solid; // Always have a border
    transition: all 0.3s ease;
    overflow: hidden;
    height: fit-content;
    min-height: unset;

    &:hover {
        opacity: 1;
    }

    &.router-link-active {
        border-color: var(--color-primaryLightActive);
        background-color: var(--color-primaryLight);
        opacity: 1;
        color: var(--color-primaryNormal);
    }
}

.nav-label {
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.2;
    font-weight: normal;
}
</style>