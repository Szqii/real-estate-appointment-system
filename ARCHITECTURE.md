# Architecture Documentation

This document outlines the architectural decisions and folder structure of the Real Estate Appointment Manager.

## Folder Structure

```
src/
├── api/                    # API layer - handles all external API communication
│   ├── client.js          # Axios instance with interceptors and configuration
│   ├── endpoints.js       # API endpoint constants and URL builders
│   └── services/          # Service classes for different entities
│       ├── appointment-service.js
│       ├── agent-service.js
│       └── index.js       # Barrel export
│
├── components/            # Reusable Vue components organized by feature
│   ├── agents/           # Agent-related components
│   │   ├── AgentAvatar.vue
│   │   ├── AgentSelect.vue
│   │   ├── AgentPopover.vue
│   │   └── index.js
│   ├── appointments/     # Appointment-related components
│   │   ├── AppointmentCard.vue
│   │   ├── AppointmentCardSkeleton.vue
│   │   ├── AppointmentsHeader.vue
│   │   ├── AppointmentsBody.vue
│   │   ├── AppointmentsFooter.vue
│   │   ├── StatusBadge.vue
│   │   └── index.js
│   ├── filters/          # Filter and search components
│   │   ├── StatusDropdown.vue
│   │   ├── DateFilterDropdown.vue
│   │   └── index.js
│   ├── forms/            # Form input components
│   │   ├── ContactMultiSelect.vue
│   │   ├── DateSelect.vue
│   │   └── index.js
│   ├── modals/           # Modal dialog components
│   │   ├── CreateAppointmentModal.vue
│   │   └── index.js
│   └── ui/               # Generic UI components
│       ├── LoadingSpinner.vue
│       ├── SearchInput.vue
│       └── index.js
│
├── composables/          # Vue 3 composables for reusable logic
│   └── usePagination.js
│
├── config/               # Application configuration
│   └── index.js          # Centralized config management
│
├── constants/            # Application constants
│   ├── appointment-status.js
│   └── index.js
│
├── layouts/              # Layout components
│   ├── AppLayout.vue
│   └── index.js
│
├── router/               # Vue Router configuration
│   └── index.js
│
├── stores/               # Pinia state management
│   ├── appointments.js   # Appointment state and actions
│   └── agents.js         # Agent state and actions
│
├── utils/                # Utility functions organized by purpose
│   ├── data/            # Data transformation utilities
│   │   └── normalize-appointment-data.js
│   ├── date/            # Date manipulation utilities
│   │   ├── format-date.js
│   │   └── compare-date-to-today.js
│   ├── format/          # Formatting utilities
│   │   └── format-phone-number.js
│   ├── text/            # Text processing utilities
│   │   └── highlight-text.js
│   └── index.js         # Barrel export for all utilities
│
├── views/                # Page-level components
│   └── AppointmentsView.vue
│
├── App.vue              # Root component
└── main.js              # Application entry point
```

## Architectural Principles

### 1. Feature-Based Organization

Components are organized by feature rather than by type, making it easier to locate and maintain related functionality.

### 2. Barrel Exports

Each folder contains an `index.js` file that exports all components/utilities from that folder, enabling clean imports:

```javascript
// Instead of multiple imports
import AgentAvatar from '@/components/agents/AgentAvatar.vue'
import AgentSelect from '@/components/agents/AgentSelect.vue'

// Use barrel exports
import { AgentAvatar, AgentSelect } from '@/components/agents'
```

### 3. Separation of Concerns

- **API Layer**: Handles all external communication
- **Components**: Reusable UI components
- **Stores**: Application state management
- **Utils**: Pure functions for data transformation
- **Views**: Page-level components that compose smaller components

### 4. Configuration Management

Centralized configuration in `src/config/index.js` for:

- API settings
- Application metadata
- Feature flags
- Environment-specific settings

### 5. Constants Management

Application constants are centralized and typed for better maintainability and IDE support.

## Component Architecture

### Component Naming Conventions

- **PascalCase** for component names
- **Descriptive names** that indicate purpose
- **Feature prefixes** for related components (e.g., `Agent*`, `Appointment*`)

### Component Structure

```vue
<template>
  <!-- Template with semantic HTML -->
</template>

<script setup>
// Imports
// Props with validation
// Emits definition
// Composables
// Reactive state
// Computed properties
// Methods
// Lifecycle hooks
</script>

<style scoped>
<!-- Component-specific styles -->
</style>
```

### Props Validation

All components use proper prop validation:

```javascript
const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
```

## State Management

### Pinia Stores

- **Composition API style** for better TypeScript support
- **Feature-based stores** (appointments, agents)
- **Computed properties** for derived state
- **Actions** for async operations and mutations

### Store Structure

```javascript
export const useAppointmentsStore = defineStore('appointments', () => {
  // State
  const appointments = ref([])

  // Getters (computed)
  const filteredAppointments = computed(() => {
    // filtering logic
  })

  // Actions
  const fetchAppointments = async () => {
    // async logic
  }

  return {
    // State
    appointments,
    // Getters
    filteredAppointments,
    // Actions
    fetchAppointments,
  }
})
```

## API Architecture

### Service Classes

API calls are organized into service classes for better organization and reusability:

```javascript
export class AppointmentService {
  static async getAppointments() {
    // implementation
  }

  static async createAppointment(data) {
    // implementation
  }
}
```

### HTTP Client

Centralized Axios configuration with:

- Request/response interceptors
- Error handling
- Authentication
- Request/response logging

## Utility Functions

### Organization

Utilities are organized by purpose:

- **data/**: Data transformation and normalization
- **date/**: Date manipulation and formatting
- **format/**: String and number formatting
- **text/**: Text processing and manipulation

### Pure Functions

All utility functions are pure functions that:

- Don't mutate input parameters
- Return consistent output for same input
- Have no side effects
- Are easily testable

## Styling Architecture

### Tailwind CSS

- **Utility-first** approach for rapid development
- **Responsive design** with mobile-first breakpoints
- **Component classes** for reusable patterns
- **Custom CSS** only when necessary

### Responsive Breakpoints

- `sm`: 640px and up (tablet)
- `md`: 768px and up (small desktop)
- `lg`: 1024px and up (desktop)
- `xl`: 1280px and up (large desktop)

## Performance Considerations

### Code Splitting

- **Route-based splitting** with Vue Router
- **Component lazy loading** for large components
- **Dynamic imports** for conditional features

### Optimization

- **Computed properties** for expensive calculations
- **v-memo** for static content
- **Component key optimization** for list rendering
- **Image optimization** and lazy loading

## Development Workflow

### Code Quality

- **Prettier** for code formatting
- **ESLint** for code quality (when configured)
- **Vue DevTools** for debugging
- **TypeScript-style** prop definitions

### Git Workflow

- **Feature branches** for new development
- **Conventional commits** for clear history
- **Pull request reviews** for code quality
- **Automated testing** (when implemented)

## Future Enhancements

### Planned Improvements

1. **TypeScript Migration**: Gradual migration to TypeScript
2. **Testing Suite**: Unit and integration tests
3. **Internationalization**: Multi-language support
4. **PWA Features**: Offline support and push notifications
5. **Performance Monitoring**: Real user monitoring
6. **Accessibility**: WCAG compliance improvements

### Scalability Considerations

- **Micro-frontend** architecture for large teams
- **Module federation** for shared components
- **State management** scaling with complex domains
- **API versioning** strategy
- **Component library** extraction
