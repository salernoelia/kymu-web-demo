<template>
    <div class="h-full flex flex-col">
        <h1 class="pb-4">Analyse</h1>

        <div class="flex flex-col gap-4 flex-grow w-full">
            <div class="flex flex-row gap-6 opacity-50">
                <h4>13.03.2024 - 18.04.2025</h4>
                <h4>Schmerzpunkte</h4>
            </div>

            <div class="flex flex-row gap-4 flex-grow w-full">
                <!-- left -->
                <div class="flex flex-col gap-4 h-full w-1/3">
                    <Container>
                        <h3>Filter</h3>

                    </Container>
                    <Container>
                        <h3>Zusammenfassung</h3>

                    </Container>
                </div>

                <!-- right -->
                <Container>
                    <h3>Zeitstrahl</h3>
                    <LineGraph />
                </Container>

            </div>
        </div>
    </div>
</template>

<script setup>
import LineGraph from '~/components/LineGraph.vue';


</script>

<style lang="scss" scoped></style>