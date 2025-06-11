<template>
    <div>
        <div class="flex flex-row justify-between gap-3 items-center">
            <h1 class="whitespace-nowrap">Phillipp Köbel</h1>

            <div class="flex gap-4 items-center">

                <Button
                    variant="outline"
                    class="h-8 flex bg-white border border-[--color-outline_grayNormal] items-center justify-start text-left font-normal"
                >
                    <Icon
                        name="ic:add"
                        class="text-xl"
                    />
                    <p>Hinzufügen</p>
                </Button>
                <Button
                    variant="outline"
                    class="h-8 flex bg-white border border-[--color-outline_grayNormal] items-center justify-start text-left font-normal"
                >
                    <Icon
                        name="ic:baseline-format-list-bulleted"
                        class="text-xl"
                    />
                    <p>Liste</p>

                </Button>
            </div>
        </div>

        <img
            src="/miete.png"
            class="img p-0"
        />
    </div>
</template>

<script setup>
import { Button } from '~/components/ui/button';
import { Calendar as CalendarIcon, SidebarOpen } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
.img {
    width: 100%
}
</style>