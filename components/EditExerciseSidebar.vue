<template>
    <div class="sidebar-container">
        <div
            class="sidebar-backdrop"
            @click="$emit('close')"
        ></div>
        <div class="sidebar gap-4">
            <div class="flex justify-between items-center ">
                <h3>Übung bearbeiten</h3>
                <button
                    @click="$emit('close')"
                    class="text-2xl"
                >&times;</button>
            </div>
            <img
                src="../public/Frame 1169.png"
                class="w-full"
            />


            <div class="flex-1 min-h-0 overflow-hidden mt-4">
                <div class="h-full overflow-y-auto px-1 flex flex-row gap-4">
                    <Container type="gray">
                        <h3>{{ exercise.name }}</h3>
                    </Container>


                    <Container type="gray">
                        <div class="flex flex-row gap-4">


                            <Select v-model="selectedType">
                                <SelectTrigger class="w-[180px] bg-white">
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
                                <SelectTrigger class="w-[180px] bg-white">
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

                    </Container>




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
defineProps({
    exercise: {
        default: exercises.exercises.find(ex => ex.id === 'exercise_16')
    }
});

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
    height: 350px;
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