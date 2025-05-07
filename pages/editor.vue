<template>
    <div class="h-full flex flex-col">
        <div class="flex justify-between items-center pb-4">
            <h1 class="text-2xl font-semibold">Übungseditor</h1>
            <UiButton @click="createNewExercise">
                <Plus class="h-4 w-4 mr-2" />
                Neue Übung
            </UiButton>
        </div>


        <div class="filters mb-6">
            <div class="search-bar mb-4">
                <div class="relative">
                    <UiInput
                        v-model="searchQuery"
                        placeholder="Suche nach Name oder Beschreibung..."
                        class="pl-10"
                    />
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
            </div>

            <div class="filter-controls flex gap-4">
                <UiSelect v-model="selectedCategory">
                    <UiSelectTrigger class="w-[200px]">
                        <UiSelectValue placeholder="Kategorie" />
                    </UiSelectTrigger>
                    <UiSelectContent>
                        <UiSelectGroup>
                            <UiSelectItem value="all">Alle Kategorien</UiSelectItem>
                            <UiSelectItem
                                v-for="category in uniqueCategories"
                                :key="category"
                                :value="category"
                            >
                                {{ formatCategory(category) }}
                            </UiSelectItem>
                        </UiSelectGroup>
                    </UiSelectContent>
                </UiSelect>

                <UiSelect v-model="selectedType">
                    <UiSelectTrigger class="w-[200px]">
                        <UiSelectValue placeholder="Übungstyp" />
                    </UiSelectTrigger>
                    <UiSelectContent>
                        <UiSelectGroup>
                            <UiSelectItem value="all">Alle Typen</UiSelectItem>
                            <UiSelectItem value="guided_exercise">Geführte Übung</UiSelectItem>
                            <UiSelectItem value="assessment_screen">Bewertung</UiSelectItem>
                        </UiSelectGroup>
                    </UiSelectContent>
                </UiSelect>
            </div>
        </div>

        <div class="exercises-grid">
            <ExerciseCard
                v-for="exercise in filteredExercises"
                :key="exercise.id"
                :exercise="exercise"
                @select="openExerciseSidebar"
            />
        </div>

        <ExerciseSidebar
            v-if="selectedExercise"
            :exercise="selectedExercise"
            :is-open="isSidebarOpen"
            @close="closeSidebar"
            @save="saveExercise"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus } from 'lucide-vue-next'
import exercises from '~/assets/exercises_config.json'

const activeTab = ref('Aktiv')
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedType = ref('all')
const selectedExercise = ref(null)
const isSidebarOpen = ref(false)

const uniqueCategories = computed(() => {
    return [...new Set(exercises.exercises.map(ex => ex.category))]
})

const formatCategory = (category) => {
    return category.replace(/_/g, ' ')
}

const filteredExercises = computed(() => {
    return exercises.exercises.filter(exercise => {
        const matchesSearch = searchQuery.value === '' ||
            exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesCategory = selectedCategory.value === 'all' ||
            exercise.category === selectedCategory.value

        const matchesType = selectedType.value === 'all' ||
            exercise.exercise_type === selectedType.value

        return matchesSearch && matchesCategory && matchesType
    })
})

const openExerciseSidebar = (exercise) => {
    selectedExercise.value = exercise
    isSidebarOpen.value = true
}

const closeSidebar = () => {
    isSidebarOpen.value = false
    selectedExercise.value = null
}

const saveExercise = (updatedExercise) => {
    // Here you would implement the logic to save the updated exercise
    console.log('Saving exercise:', updatedExercise)
}

const createNewExercise = () => {
    const newExercise = {
        id: `exercise_${Date.now()}`,
        name: '',
        description: '',
        category: '',
        exercise_type: 'guided_exercise',
        goal_type: 'repetitions_goal',
        repetitions_goal: 10,
        duration_seconds_goal: null,
        sets: 3,
        rest_between_sets_seconds: 60,
        execution_instructions: [],
        starting_position_description: '',
        // Add other required fields with default values
    }
    openExerciseSidebar(newExercise)
}
</script>

<style scoped>
.exercises-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem 0;
}

.filters {
    background-color: white;
    border-radius: var(--radius);
    padding: 1rem;
    border: 1px solid hsl(var(--border));
}
</style>