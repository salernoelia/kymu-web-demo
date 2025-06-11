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

            <div class="flex-1 min-h-0 overflow-y-auto mt-4">
                <div class="px-1 flex flex-col lg:flex-row gap-4">
                    <Container type="gray">
                        <h3>Vorlage {{ exercise.name }}</h3>
                        <div class="flex flex-col gap-2">
                            <h4 class="mt-4">Name</h4>
                            <Input
                                type="text"
                                class="bg-white rounded-xl border-[--color-outline_grayNormal]"
                                :placeholder="exercise.name"
                                v-model="exerciseName"
                            />
                            <h4 class="mt-4">Beschreibung</h4>
                            <Textarea
                                class="bg-white h-200 rounded-xl border-[--color-outline_grayNormal] "
                                :placeholder="exercise.description"
                                v-model="exerciseDescription"
                            />
                        </div>
                    </Container>

                    <Container
                        type="gray"
                        class="justify-between"
                    >
                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Unitzuordnung</h4>
                            <Select v-model="selectedExerciseType">
                                <SelectTrigger class="w-[200px] bg-white">
                                    <SelectValue
                                        :placeholder="selectedExerciseType === 'all' ? 'Alle Typen' : selectedExerciseType"
                                    />
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
                        </div>

                        <div class="divider-v"></div>

                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Erklärvideo</h4>
                            <Select v-model="selectedVideoUrl">
                                <SelectTrigger class="w-[200px] bg-white">
                                    <SelectValue placeholder="Video auswählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Verfügbare Videos</SelectLabel>
                                        <SelectItem
                                            v-for="video in availableVideos"
                                            :key="video.value"
                                            :value="video.value"
                                        >
                                            {{ video.label }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class="divider-v"></div>

                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Ausführungen</h4>
                            <Select v-model="currentSets">
                                <SelectTrigger class="w-[200px] bg-white">
                                    <SelectValue placeholder="Anzahl Sätze" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sätze</SelectLabel>
                                        <SelectItem
                                            v-for="setCount in availableSets"
                                            :key="setCount"
                                            :value="setCount"
                                        >
                                            {{ setCount }} Sätze
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class="divider-v"></div>

                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Pause zw. Ausführungen</h4>
                            <Select v-model="currentRestSeconds">
                                <SelectTrigger class="min-w-[200px] w-auto bg-white">
                                    <!-- Adjusted width to auto for longer text -->
                                    <SelectValue placeholder="Pause auswählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pausenzeit</SelectLabel>
                                        <SelectItem
                                            v-for="timeOpt in availableRestTimes"
                                            :key="timeOpt.value"
                                            :value="timeOpt.value"
                                        >
                                            {{ timeOpt.label }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class="divider-v"></div>

                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Kann übersprungen werden</h4>
                            <Switch v-model:checked="canBeSkipped" />
                        </div>

                        <div class="divider-v"></div>

                        <div class="flex flex-row gap-4 items-center justify-between">
                            <h4>Als Vorlage speichern</h4>
                            <Switch v-model:checked="saveAsTemplate" />
                        </div>
                    </Container>
                </div>
            </div>
            <!-- Buttons moved outside the scrollable area, as a direct child of .sidebar -->
            <div class="flex justify-between mt-auto pt-4 px-1">
                <Button
                    @click="$emit('close')"
                    class="bg-white text-black border-[--color-outline_grayNormal] border shadow-none"
                >Zurück</Button>
                <Button
                    class="bg-[--color-primaryNormal] z-20"
                    @click="$emit('close')"
                >Erstellen</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import exercises from '~/assets/exercises_config.json'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const editedExercise = computed(() => ({
    ...props.exercise,
    name: exerciseName.value || props.exercise.name,
    description: exerciseDescription.value || props.exercise.description,
    type: selectedExerciseType.value !== 'all' ? selectedExerciseType.value : props.exercise.type,
    therapist_added_video_urls: selectedVideoUrl.value ? [selectedVideoUrl.value] : (props.exercise.therapist_added_video_urls || []),
    sets: currentSets.value,
    rest_between_sets_seconds: currentRestSeconds.value === 0 ? null : currentRestSeconds.value,
    can_be_skipped: canBeSkipped.value,
    save_as_template: saveAsTemplate.value
}));

defineEmits(['close', 'select-exercise', 'update-exercise'])

const props = defineProps({
    exercise: {
        type: Object,
        default: () => exercises.exercises.find(ex => ex.id === 'exercise_16')
    }
});

const exerciseName = ref('');
const exerciseDescription = ref('');

const selectedExerciseType = ref('all');
const exerciseTypes = computed(() => {
    return [...new Set(exercises.exercises.map(ex => ex.type))];
});

const selectedVideoUrl = ref('');
const availableVideos = computed(() => {
    const videoUrls = props.exercise?.therapist_added_video_urls || [];
    if (videoUrls.length === 0) {
        return [{ value: 'no-video', label: 'Kein Video verfügbar' }];
    }
    return videoUrls.map(url => ({ value: url, label: url.split('/').pop() || url }));
});
const currentSets = ref(1);
const availableSets = computed(() => Array.from({ length: 10 }, (_, i) => i + 1));

const currentRestSeconds = ref(0);
const availableRestTimes = computed(() => [
    { value: 0, label: 'Keine Pause' },
    { value: 15, label: '15 Sekunden' },
    { value: 30, label: '30 Sekunden' },
    { value: 45, label: '45 Sekunden' },
    { value: 60, label: '60 Sekunden' },
    { value: 90, label: '90 Sekunden' },
    { value: 120, label: '2 Minuten' }
]);

const canBeSkipped = ref(false);
const saveAsTemplate = ref(false);

watch(() => props.exercise, (newExercise) => {
    if (newExercise) {
        exerciseName.value = newExercise.name || '';
        exerciseDescription.value = newExercise.description || '';
        selectedExerciseType.value = newExercise.type || 'all';

        const videoUrls = newExercise.therapist_added_video_urls || [];
        selectedVideoUrl.value = videoUrls.length > 0 ? videoUrls[0] : '';

        currentSets.value = newExercise.sets || 1;
        currentRestSeconds.value = newExercise.rest_between_sets_seconds === null ? 0 : (newExercise.rest_between_sets_seconds || 0);

        canBeSkipped.value = newExercise.can_be_skipped || false;
        saveAsTemplate.value = newExercise.save_as_template || false;
    }
}, { immediate: true, deep: true });


const searchQuery = ref('')
const selectedType = ref('all')
const selectedCategory = ref('all')
const isLoading = ref(true)


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
    width: 60vw;
    height: 100vh;
    padding: 1.5rem 2rem;
    border-radius: 0.5rem 0 0 0.5rem;
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
</style>