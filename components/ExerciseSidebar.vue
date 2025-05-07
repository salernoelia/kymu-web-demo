<template>
    <div
        class="exercise-sidebar"
        :class="{ 'is-open': isOpen }"
    >
        <div class="sidebar-header">
            <h2 class="sidebar-title">Übung Bearbeiten</h2>
            <UiButton
                variant="ghost"
                size="icon"
                @click="$emit('close')"
            >
                <X class="h-4 w-4" />
            </UiButton>
        </div>

        <div class="sidebar-content">
            <div class="form-group">
                <UiLabel for="name">Name</UiLabel>
                <UiInput
                    id="name"
                    v-model="form.name"
                />
            </div>

            <div class="form-group">
                <UiLabel for="description">Beschreibung</UiLabel>
                <UiTextarea
                    id="description"
                    v-model="form.description"
                />
            </div>

            <div class="form-section">
                <h3 class="section-title">Übungsdetails</h3>

                <div class="form-row">
                    <div class="form-group">
                        <UiLabel for="category">Kategorie</UiLabel>
                        <UiSelect v-model="form.category">
                            <UiSelectTrigger>
                                <UiSelectValue placeholder="Kategorie wählen" />
                            </UiSelectTrigger>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="category in uniqueCategories"
                                        :key="category"
                                        :value="category"
                                    >
                                        {{ category }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </div>

                    <div class="form-group">
                        <UiLabel for="type">Übungstyp</UiLabel>
                        <UiSelect v-model="form.exercise_type">
                            <UiSelectTrigger>
                                <UiSelectValue placeholder="Typ wählen" />
                            </UiSelectTrigger>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem value="guided_exercise">Geführte Übung</UiSelectItem>
                                    <UiSelectItem value="assessment_screen">Bewertung</UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </div>
                </div>

                <div class="form-row">
                    <div
                        class="form-group"
                        v-if="form.repetitions_goal !== null"
                    >
                        <UiLabel>Wiederholungen</UiLabel>
                        <UiNumberField v-model="form.repetitions_goal">
                            <UiNumberFieldContent>
                                <UiNumberFieldDecrement />
                                <UiNumberFieldInput />
                                <UiNumberFieldIncrement />
                            </UiNumberFieldContent>
                        </UiNumberField>
                    </div>

                    <div
                        class="form-group"
                        v-if="form.duration_seconds_goal !== null"
                    >
                        <UiLabel>Dauer (Sekunden)</UiLabel>
                        <UiNumberField v-model="form.duration_seconds_goal">
                            <UiNumberFieldContent>
                                <UiNumberFieldDecrement />
                                <UiNumberFieldInput />
                                <UiNumberFieldIncrement />
                            </UiNumberFieldContent>
                        </UiNumberField>
                    </div>

                    <div class="form-group">
                        <UiLabel>Sets</UiLabel>
                        <UiNumberField v-model="form.sets">
                            <UiNumberFieldContent>
                                <UiNumberFieldDecrement />
                                <UiNumberFieldInput />
                                <UiNumberFieldIncrement />
                            </UiNumberFieldContent>
                        </UiNumberField>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3 class="section-title">Ausführung</h3>

                <div class="form-group">
                    <UiLabel>Startposition</UiLabel>
                    <UiTextarea v-model="form.starting_position_description" />
                </div>

                <div class="form-group">
                    <UiLabel>Ausführung</UiLabel>
                    <div
                        v-for="(instruction, index) in form.execution_instructions"
                        :key="index"
                        class="instruction-row"
                    >
                        <UiInput v-model="form.execution_instructions[index]" />
                        <UiButton
                            variant="ghost"
                            size="icon"
                            @click="removeInstruction(index)"
                        >
                            <Trash2 class="h-4 w-4" />
                        </UiButton>
                    </div>
                    <UiButton
                        variant="outline"
                        class="mt-2"
                        @click="addInstruction"
                    >
                        <Plus class="h-4 w-4 mr-2" />
                        Schritt hinzufügen
                    </UiButton>
                </div>
            </div>

            <div class="form-actions">
                <UiButton
                    variant="outline"
                    @click="$emit('close')"
                >Abbrechen</UiButton>
                <UiButton @click="save">Speichern</UiButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, Plus, Trash2 } from 'lucide-vue-next'

const props = defineProps({
    exercise: {
        type: Object,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'save'])

const form = ref({ ...props.exercise })

const uniqueCategories = computed(() => {
    // This should be populated from the exercises config
    return ['Beweglichkeit_der_Wirbelsäule', 'Rumpfstabilität', 'Gesäßmuskelkraft', 'Gleichgewicht']
})

const addInstruction = () => {
    form.value.execution_instructions.push('')
}

const removeInstruction = (index) => {
    form.value.execution_instructions.splice(index, 1)
}

const save = () => {
    emit('save', form.value)
    emit('close')
}
</script>

<style scoped>
.exercise-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 600px;
    height: 100vh;
    background-color: white;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 50;
}

.exercise-sidebar.is-open {
    transform: translateX(0);
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid hsl(var(--border));
}

.sidebar-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
}

.sidebar-content {
    height: calc(100vh - 64px);
    overflow-y: auto;
    padding: 1.5rem;
}

.form-section {
    margin-top: 2rem;
}

.section-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-primaryNormal);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.instruction-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--border));
}
</style>