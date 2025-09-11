<template>
  <div class="relative w-full" ref="wrapper">
    <!-- Dropdown -->
    <div @click="toggleDropdown"
         class="w-full border text-sm text-gray-900 border-gray-300 rounded-lg p-2 cursor-pointer bg-white">
      Select Agents
      <FontAwesomeIcon :icon="faChevronDown"
                       :class="{ '-rotate-180': dropdownOpen }"
                       class="float-right mt-1 transition duration-200"/>
    </div>
    <ul
        v-if="dropdownOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li
          v-for="agent in agents"
          :key="agent.id"
          @click.stop="toggleAgent(agent)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white transition flex justify-between"
      >
        {{ agent.fields.agent_name }} {{ agent.fields.agent_surname }}
        <span v-if="isSelected(agent)">
        <FontAwesomeIcon :icon="faCheck" class="text-xs"/>
        </span>
      </li>
    </ul>

    <!-- Selected Agents -->
    <div v-if="selectedAgents.length" class="flex flex-wrap gap-2 mt-2">
      <span
          v-for="agent in selectedAgents"
          :key="agent.id"
          class="px-2 py-1 bg-primary text-white rounded-full text-sm flex items-center gap-1"
      >
        {{ agent.fields.agent_name }} {{ agent.fields.agent_surname }}
        <button @click="removeAgent(agent)" class="text-white font-bold cursor-pointer">
          <FontAwesomeIcon :icon="faTimes" class="text-xs"/>
        </button>
      </span>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from "vue"
import {useAgentsStore} from "@/stores/agents.js"
import {faCheck, faChevronDown, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const store = useAgentsStore()
const agents = store.agents

const selectedAgents = ref([])
const dropdownOpen = ref(false)
const wrapper = ref(null)
const emit = defineEmits(['update:selectedAgents'])

// Check if selected
const isSelected = (agent) => selectedAgents.value.some(a => a.id === agent.id)

// Toggle selection
const toggleAgent = (agent) => {
  if (isSelected(agent)) {
    selectedAgents.value = selectedAgents.value.filter(a => a.id !== agent.id)
  } else {
    selectedAgents.value.push(agent)
  }
}

// Remove from selected
const removeAgent = (agent) => {
  selectedAgents.value = selectedAgents.value.filter(a => a.id !== agent.id)
}

// Toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

watch(selectedAgents, (newVal) => {
  emit("update:selectedAgents", newVal.map(a => a.id))
}, {deep: true})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
