<template>
  <div class="relative w-full" ref="wrapper">
    <!-- Search Input -->
    <input
        type="text"
        v-model="query"
        placeholder="Search contacts..."
        class="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary"
    />

    <!-- Selected Contacts -->
    <div class="flex flex-wrap gap-2 mt-2" v-if="selectedContacts.length">
      <span
          v-for="contact in selectedContacts"
          :key="contact.id"
          class="px-2 py-1 bg-primary text-white rounded-full text-sm flex items-center gap-1"
      >
        {{ contact.name }}
        <button @click="removeContact(contact)" class="text-white font-bold cursor-pointer">
          <FontAwesomeIcon :icon="faTimes" class="text-xs"/>
        </button>
      </span>
    </div>

    <!-- Results Dropdown -->
    <ul
        v-if="query && filteredContacts.length && dropdownOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li
          v-for="contact in filteredContacts"
          :key="contact.id"
          @click="toggleContact(contact)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white transition flex justify-between"
      >
        {{ contact.name }}
        <span v-if="isSelected(contact)">
          <FontAwesomeIcon :icon="faCheck" class="text-xs"/>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useAppointmentsStore} from "@/stores/appointments.js"
import {computed, ref, onMounted, onBeforeUnmount, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  initialSelected: {
    type: Array,
    default: () => []
  }
});

const store = useAppointmentsStore()
const uniqueContacts = store.uniqueContacts
const query = ref("")
const selectedContacts = ref([])
const emit = defineEmits(['update:selectedContacts'])

// Initialize selected contacts
watch(() => props.initialSelected, (newInitialSelected) => {
  if (newInitialSelected && newInitialSelected.length > 0) {
    selectedContacts.value = uniqueContacts.filter(contact => 
      newInitialSelected.includes(contact.id)
    );
  }
}, { immediate: true });

// Dropdown open state
const dropdownOpen = ref(false)
const wrapper = ref(null)

const filteredContacts = computed(() => {
  if (!query.value) return []
  return uniqueContacts.filter(contact =>
      `${contact.name}`.includes(query.value)
  )
})

// Check if selected
const isSelected = (contact) => selectedContacts.value.some(c => c.id === contact.id)

// Toggle selection
const toggleContact = (contact) => {
  if (isSelected(contact)) {
    selectedContacts.value = selectedContacts.value.filter(c => c.id !== contact.id)
  } else {
    selectedContacts.value.push(contact)
  }
}

// Remove contact
const removeContact = (contact) => {
  selectedContacts.value = selectedContacts.value.filter(c => c.id !== contact.id)
}

// Open dropdown when typing
watch(query, (val) => {
  dropdownOpen.value = !!val && filteredContacts.value.length > 0
})

// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    dropdownOpen.value = false
    query.value = ""
  }
}

watch(selectedContacts, (newVal) => {
  emit("update:selectedContacts", newVal.map(c => c.id))
}, {deep: true})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
