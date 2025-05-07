<template>
    <div class="editor h-full flex flex-col">
        <div class="overlay"></div>
        <h1 class="pb-4">Editor</h1>



    </div>
    <div class="flex flex-col sidebar gap-4">
        <h3>Einstellungen</h3>


        <div class="flex flex-row gap-4">

            <div class="relative w-full max-w-sm items-center">

                <Input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    class="pl-10"
                />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Search class="size-6 text-muted-foreground" />
                </span>
            </div>

            <Select>
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Hilfsmittel" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="apple">
                            Apple
                        </SelectItem>
                        <SelectItem value="banana">
                            Banana
                        </SelectItem>
                        <SelectItem value="blueberry">
                            Blueberry
                        </SelectItem>
                        <SelectItem value="grapes">
                            Grapes
                        </SelectItem>
                        <SelectItem value="pineapple">
                            Pineapple
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Art" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="apple">
                            Apple
                        </SelectItem>
                        <SelectItem value="banana">
                            Banana
                        </SelectItem>
                        <SelectItem value="blueberry">
                            Blueberry
                        </SelectItem>
                        <SelectItem value="grapes">
                            Grapes
                        </SelectItem>
                        <SelectItem value="pineapple">
                            Pineapple
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <div class="catalogue grid grid-cols-3 gap-4 overflow-auto">
            <div
                v-for="ex in exercises.exercises"
                :key="ex.id"
                class="flex flex-col bg-white card"
            >

                <img
                    v-if="ex.therapist_added_image_urls && ex.therapist_added_image_urls.length"
                    :src="ex.therapist_added_image_urls[0]"
                    alt=""
                >

                {{ ex.name }}
            </div>
        </div>


    </div>
</template>

<script setup>
import exercises from '~/assets/exercises_config.json'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'


const open = ref(false)





</script>

<style lang="scss" scoped>
.editor {
    position: relative;
}

.overlay {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    /* Dark overlay */
    backdrop-filter: blur(5px);
    /* Blur effect */
    z-index: -1;
    /* Place it behind the content */
}

.sidebar {
    width: 70vw;
    height: 100vh;
    padding: 1.5rem 2rem;
    border-radius: 1rem 0 0 1rem;
    background-color: white;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
}

.card {
    border: 1px var(--color-outline_grayNormal) solid;
    border-radius: 0.75rem;
    padding: 0.75rem;
}
</style>