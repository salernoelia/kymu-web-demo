<template>
    <div class="h-full flex flex-col">
        <h1 class="pb-4">Editor</h1>

        <div class="flex flex-row w-full">
            <TabsBorder :tabs="[{ name: 'Aktiv' }, { name: 'Inaktiv' }]" />
            <UiButton variant="outline">Feedback</UiButton>

        </div>
        <div class="flex flex-col gap-4 flex-grow w-full">
            <div class="flex flex-row gap-6 w-full">
            </div>

            <div class="flex flex-row gap-4 flex-grow w-full">


            </div>
        </div>
    </div>
</template>

<script setup>



</script>

<style lang="scss" scoped></style>