<template>
  <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
    <!-- Icon -->
    <div class="mb-6">
      <div
        class="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
        :class="iconBackgroundClass"
      >
        <FontAwesomeIcon :icon="iconName" :class="iconClass" />
      </div>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-gray-600 mb-6 max-w-md">
      {{ description }}
    </p>

    <!-- Action Button -->
    <button
      v-if="showAction"
      @click="$emit('action')"
      class="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
    >
      <FontAwesomeIcon v-if="actionIcon" :icon="actionIcon" class="text-sm" />
      {{ actionText }}
    </button>

    <!-- Secondary Action -->
    <button
      v-if="showSecondaryAction"
      @click="$emit('secondary-action')"
      class="mt-3 text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
    >
      {{ secondaryActionText }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCalendarXmark,
  faUsers,
  faUserTie,
  faSearch,
  faCalendarPlus,
  faUserPlus,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) =>
      ['appointments', 'contacts', 'agents', 'search', 'filter'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  actionText: {
    type: String,
    default: '',
  },
  actionIcon: {
    type: Object,
    default: null,
  },
  showAction: {
    type: Boolean,
    default: true,
  },
  secondaryActionText: {
    type: String,
    default: '',
  },
  showSecondaryAction: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['action', 'secondary-action'])

const emptyStateConfig = {
  appointments: {
    icon: faCalendarXmark,
    title: 'No appointments yet',
    description:
      'Get started by creating your first appointment. You can schedule meetings with clients and manage your calendar efficiently.',
    actionText: 'Create Appointment',
    actionIcon: faCalendarPlus,
    iconClass: 'text-blue-600 text-2xl',
    iconBg: 'bg-blue-100',
  },
  contacts: {
    icon: faUsers,
    title: 'No contacts found',
    description:
      'Start building your network by adding contacts. Keep track of clients, leads, and important connections.',
    actionText: 'Add Contact',
    actionIcon: faUserPlus,
    iconClass: 'text-green-600 text-2xl',
    iconBg: 'bg-green-100',
  },
  agents: {
    icon: faUserTie,
    title: 'No agents available',
    description:
      'Add team members to collaborate on appointments and manage client relationships together.',
    actionText: 'Add Agent',
    actionIcon: faUserPlus,
    iconClass: 'text-purple-600 text-2xl',
    iconBg: 'bg-purple-100',
  },
  search: {
    icon: faSearch,
    title: 'No results found',
    description:
      "We couldn't find anything matching your search. Try adjusting your search terms or browse all items.",
    actionText: 'Clear Search',
    actionIcon: null,
    iconClass: 'text-gray-600 text-2xl',
    iconBg: 'bg-gray-100',
  },
  filter: {
    icon: faFilter,
    title: 'No matches found',
    description:
      'No items match your current filters. Try adjusting your filter criteria or clear all filters.',
    actionText: 'Clear Filters',
    actionIcon: null,
    iconClass: 'text-orange-600 text-2xl',
    iconBg: 'bg-orange-100',
  },
}

const config = computed(() => emptyStateConfig[props.type])

const iconName = computed(() => props.icon || config.value.icon)
const title = computed(() => props.title || config.value.title)
const description = computed(() => props.description || config.value.description)
const actionText = computed(() => props.actionText || config.value.actionText)
const actionIcon = computed(() => props.actionIcon || config.value.actionIcon)
const iconClass = computed(() => config.value.iconClass)
const iconBackgroundClass = computed(() => config.value.iconBg)
</script>
