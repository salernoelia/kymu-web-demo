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
                        class="text-xl"
                        name="ic:baseline-ios-share"
                    />
                    <p>Teilen</p>
                </Button>
                <Button
                    variant="outline"
                    class="h-8 flex bg-white border border-[--color-outline_grayNormal] items-center justify-start text-left font-normal"
                >
                    <Icon
                        class="text-xl"
                        name="ic:baseline-picture-as-pdf"
                    />

                    <p>Exportieren</p>
                </Button>
            </div>
        </div>

        <img
            src="/bericht.png"
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