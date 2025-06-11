<template>
    <div class="sidebar-container">
        <div
            class="sidebar-backdrop"
            @click="$emit('close')"
        ></div>
        <div class="sidebar">
            <div class="flex justify-between items-center mb-4">
                <h3>Übungs-Bibliothek</h3>
                <button
                    @click="$emit('close')"
                    class="text-2xl"
                >&times;</button>
            </div>

            <div class="flex flex-col gap-4">
                <div class="relative w-full max-w-sm items-center">
                    <Input
                        v-model="searchQuery"
                        id="search"
                        type="text"
                        placeholder="Übungen suchen..."
                        class="pl-10"
                    />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Search class="size-6 text-muted-foreground" />
                    </span>
                </div>

                <div class="flex flex-row gap-4">
                    <Select v-model="selectedType">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue :placeholder="selectedType === 'all' ? 'Alle Typen' : selectedType" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Übungstyp</SelectLabel>
                                <SelectItem value="all">Alle Typen</SelectItem>
                                <SelectItem
                                    v-for="type in exerciseTypes"
                                    :key="type"
                                    :value="type"
                                >
                                    {{ type }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select v-model="selectedCategory">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue
                                :placeholder="selectedCategory === 'all' ? 'Alle Kategorien' : selectedCategory"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Kategorien</SelectLabel>
                                <SelectItem value="all">Alle Kategorien</SelectItem>
                                <SelectItem
                                    v-for="category in exerciseCategories"
                                    :key="category"
                                    :value="category"
                                >
                                    {{ category.replace(/_/g, ' ') }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div class="text-sm text-muted-foreground">
                    {{ filteredExercises.length }} {{ filteredExercises.length === 1 ? 'Übung' : 'Übungen' }}
                    gefunden
                </div>
            </div>

            <div class="flex-1 min-h-0 overflow-hidden mt-4">
                <div class="h-full overflow-y-auto px-1">
                    <div
                        v-if="isLoading"
                        class="grid grid-cols-3 gap-4"
                    >
                        <div
                            v-for="n in 6"
                            :key="n"
                            class="flex flex-col gap-4 animate-pulse"
                        >
                            <div class="aspect-video bg-muted rounded-md"></div>
                            <div class="space-y-3">
                                <div class="h-4 bg-muted rounded"></div>
                                <div class="h-3 bg-muted rounded w-4/5"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="filteredExercises.length === 0"
                        class="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <FileSearch class="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 class="font-medium mb-1">Keine Übungen gefunden</h3>
                        <p class="text-sm text-muted-foreground">Versuchen Sie andere Suchbegriffe oder Filter</p>
                    </div>

                    <div
                        v-else
                        class="grid grid-cols-3 gap-4 ex-grid"
                    >
                        <div
                            v-for="ex in filteredExercises"
                            :key="ex.id"
                            class="flex flex-col bg-white card group hover:border-primary transition-colors cursor-pointer"
                        >
                            <div class="aspect-video relative overflow-hidden rounded-md mb-3">
                                <img
                                    v-if="ex.therapist_added_image_urls && ex.therapist_added_image_urls.length"
                                    :src="ex.therapist_added_image_urls[0]"
                                    alt=""
                                    class="absolute inset-0 object-cover w-full h-full"
                                >
                                <div
                                    v-else
                                    class="absolute inset-0 bg-muted flex items-center justify-center"
                                >
                                    <ImageIcon class="w-8 h-8 text-muted-foreground/50" />
                                </div>
                            </div>

                            <div class="flex flex-col flex-1 gap-2">
                                <div class="flex justify-between items-start gap-2">
                                    <h4 class="font-medium leading-none">{{ ex.name }}</h4>
                                    <div class="flex gap-1">
                                        <span
                                            class="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                                        >
                                            {{ ex.type }}
                                        </span>
                                    </div>
                                </div>

                                <p class="text-sm text-muted-foreground line-clamp-2">{{ ex.description }}</p>

                                <div class="flex items-center gap-2 mt-auto pt-2">
                                    <div
                                        v-if="ex.duration_seconds_goal"
                                        class="flex items-center text-xs text-muted-foreground"
                                    >
                                        <Clock class="w-3 h-3 mr-1" />
                                        {{ Math.floor(ex.duration_seconds_goal / 60) }}min
                                    </div>
                                    <div
                                        v-if="ex.repetitions_goal"
                                        class="flex items-center text-xs text-muted-foreground"
                                    >
                                        <Repeat class="w-3 h-3 mr-1" />
                                        {{ ex.repetitions_goal }} Wdh.
                                    </div>
                                    <div
                                        v-if="ex.sets"
                                        class="flex items-center text-xs text-muted-foreground"
                                    >
                                        <Layers class="w-3 h-3 mr-1" />
                                        {{ ex.sets }} Sätze
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import exercises from '~/assets/exercises_config.json'
import { Input } from '@/components/ui/input'
import { Search, Clock, Repeat, Layers, Image as ImageIcon, FileSearch } from 'lucide-vue-next'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ref, computed, onMounted } from 'vue'

defineEmits(['close', 'select-exercise'])

const searchQuery = ref('')
const selectedType = ref('all')
const selectedCategory = ref('all')
const isLoading = ref(true)

const exerciseTypes = computed(() => {
    return [...new Set(exercises.exercises.map(ex => ex.type))]
})

const exerciseCategories = computed(() => {
    return [...new Set(exercises.exercises.map(ex => ex.category))]
})

const filteredExercises = computed(() => {
    return exercises.exercises.filter(ex => {
        const searchTerms = searchQuery.value.toLowerCase().trim()

        const matchesSearch = searchQuery.value === '' ||
            ex.name.toLowerCase().includes(searchTerms) ||
            ex.description.toLowerCase().includes(searchTerms) ||
            (Array.isArray(ex.improves) && ex.improves.some(improvement =>
                improvement.toLowerCase().includes(searchTerms)
            ))

        const matchesType = selectedType.value === 'all' || ex.type === selectedType.value
        const matchesCategory = selectedCategory.value === 'all' || ex.category === selectedCategory.value

        return matchesSearch && matchesType && matchesCategory
    })
})



onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 500)
})
</script>

<style lang="scss" scoped>
.sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
}

.sidebar-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.sidebar {
    width: 70vw;
    height: 100vh;
    padding: 1.5rem 2rem;
    border-radius: 1rem 0 0 1rem;
    background-color: white;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dropshadow-main);
}

.card {
    border: 1px var(--color-outline_grayNormal) solid;
    border-radius: 0.75rem;
    padding: 0.75rem;
    height: fit-content;
}

.ex-grid {
    border: 1px solid var(--color-outline_grayNormal);
    background-color: #F9F7FA;
    padding: 1rem;
    border-radius: 0.75rem;
    overflow-y: auto;
    height: 100%;
}
</style>