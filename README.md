# Real Estate Appointment Manager

A modern Vue 3 application for managing real estate appointments with agents and clients.

## 🚀 Features

- **Appointment Management**: Create, edit, and view real estate appointments
- **Agent Management**: Assign multiple agents to appointments
- **Contact Management**: Multi-select contact assignment
- **Advanced Filtering**: Filter by status, date range, and agents
- **Search Functionality**: Real-time search across appointments
- **Responsive Design**: Mobile-first responsive interface

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **FontAwesome** - Icon library

## 📋 Prerequisites

- Node.js (^20.19.0 || >=22.12.0)
- npm or yarn

## 🔧 Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update the `.env` file with your Airtable credentials:

```env
VITE_API_KEY=your_airtable_api_key
VITE_API_BASE_URL=https://api.airtable.com/v0/your_base_id
VITE_APPOINTMENTS_TABLE_ID=/YourAppointmentsTableName
VITE_AGENTS_TABLE_ID=/YourAgentsTableName
VITE_APP_NAME=Real Estate Appointment System
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier

## 🏗️ Project Structure

```
src/
├── api/                    # API layer
├── components/            # Feature-organized components
│   ├── agents/           # Agent-related components
│   ├── appointments/     # Appointment components
│   ├── filters/          # Filter components
│   ├── forms/            # Form components
│   ├── modals/           # Modal components
│   └── ui/               # Generic UI components
├── config/               # Application configuration
├── constants/            # Application constants
├── layouts/              # Layout components
├── stores/               # Pinia state management
├── utils/                # Utility functions
└── views/                # Page components
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
