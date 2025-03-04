# Journey Builder React Coding Challenge

This project implements a form-based workflow visualization and configuration tool using React and TypeScript. It allows users to view a directed acyclic graph (DAG) of connected forms and configure how data flows between them through prefill mappings.

## Features

- Visualizes forms and their connections using React Flow
- Configures prefill mappings between form fields
- Supports multiple data sources for prefilling:
  - Direct form dependencies (immediate upstream forms)
  - Transitive form dependencies (indirect upstream forms)
  - Global data sources (Action Properties and Client Organization Properties)

## Project Structure

```
src/
├── api/                  # API service calls
│   └── blueprintApi.ts   # Blueprint graph API client
├── components/           # React components
│   ├── JourneyGraph/     # Graph visualization components
│   │   ├── FormNode.tsx  # Custom node for form rendering
│   │   └── JourneyGraph.tsx # Main graph component
│   └── PrefillMapping/   # Prefill configuration components
│       ├── PrefillField.tsx     # Individual field mapping UI
│       ├── PrefillMappingPanel.tsx # Panel for all mappings
│       └── PrefillModal.tsx     # Modal for selecting data sources
├── hooks/                # Custom React hooks
│   ├── useBlueprint.ts   # Hook for fetching blueprint data
│   └── usePrefillMapping.ts # Hook for managing prefill state
├── services/             # Business logic
│   ├── graphService.ts   # Graph traversal logic
│   └── prefillService.ts # Prefill mapping operations
├── types/                # TypeScript type definitions
│   └── index.ts          # API and application types
├── App.css               # Application styles
├── App.tsx               # Main application component
└── index.tsx             # Entry point
```

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Implementation Details

### Architecture

The application is built with a clear separation of concerns:

- **API Layer**: Handles communication with the backend API
- **Services Layer**: Contains core business logic for graph traversal and prefill configuration
- **Hooks Layer**: Manages application state using custom React hooks
- **Components Layer**: Presents UI and handles user interactions

### Key Design Decisions

1. **Separation of Data and UI Logic**

   - Business logic is extracted into service modules
   - State management is handled by custom hooks
   - UI components are primarily focused on rendering and user interaction

2. **Graph Traversal**

   - The application can identify both direct and transitive dependencies
   - Graph traversal logic is encapsulated in a dedicated service

3. **Extensible Data Sources**

   - The prefill modal supports multiple data source types
   - New data sources can be added without changing core logic
   - Data source providers use a consistent interface

4. **Component Composition**
   - Complex UI is broken down into smaller, focused components
   - Components are designed to be reusable and composable

## Extending with New Data Sources

To add new data sources for prefill mapping:

1. Add the new source to the `GLOBAL_DATA_SOURCES` array in `App.tsx` or implement a service to fetch them dynamically
2. If needed, create a new data source provider that implements the expected interface
3. Update the UI in `PrefillModal.tsx` to include a tab or section for the new data source
4. No changes are needed to the core prefill logic as it's designed to be source-agnostic

## About the Mock API Server

The coding challenge instructions mentioned a mock server with the action-blueprint-graph-get endpoint. Instead of requiring this external dependency, this implementation includes a built-in mock data solution:

Mock data is defined directly in the frontend code (src/mocks/mockData.ts)
This approach makes the application self-contained and easier to run
No need to set up and run a separate API server

If you want to use the actual mock server mentioned in the challenge instructions:

1. Navigate to https://github.com/mosaic-avantos/frontendchallengeserver
2. Clone the repository
3. Follow its setup instructions to start the mock server
4. Update the API_BASE_URL in src/api/blueprintApi.ts to point to the mock server
5. Uncomment the actual API call implementation in that file by modifying the fetchBlueprintGraph function

For most development and testing purposes, the included mock data is sufficient, so you only need to run npm start to see the application in action.
