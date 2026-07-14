# Polished Pokémon App

A modern React application that lets you explore, search, and compare Pokémon with an intuitive and responsive interface.

## Features

- **Search Pokémon** - Find any Pokémon by name in real-time
- **Filter by Type** - Browse Pokémon by their type (grass, fire, water, bug, electric, etc.)
- **Favorite System** - Bookmark your favorite Pokémon for quick access
- **Sort Options** - Organize Pokémon by different criteria
- **Detailed View** - View comprehensive stats, abilities, and information for each Pokémon
- **Evolution Chains** - Explore how Pokémon evolve through their stages
- **Compare Pokémon** - Side-by-side comparison of stats and weights
- **Pagination** - Browse Pokémon in organized pages
- **Dark/Light Theme** - Toggle between dark and light modes (persists with localStorage)
- **Type-based Coloring** - Each Pokémon type is color-coded for easy identification

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and development server
- **PokéAPI** - Data source for Pokémon information
- **CSS** - Custom styling with theme support
- **Context API** - State management for theme

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install

Running the Project
Development mode:
    npm run dev

The app will be available at http://localhost:5173

Build for production:
    npm run build

Preview production build:
    npm run preview

Lint code:
    npm lint

Project Structure:
    src/
    ├── App.jsx               # Main application component
    ├── main.jsx              # React entry point
    ├── index.css             # Global styles
    ├── PokemonCard.jsx       # Individual Pokémon card display
    ├── PokemonDetail.jsx     # Detailed Pokémon information view
    ├── ComparePokemon.jsx    # Pokémon comparison modal
    ├── EvolutionModal.jsx    # Evolution chain display
    └── ThemeContext.jsx      # Theme management (light/dark mode)

Key Features Explained:

1) Search & Filter
    Filter the Pokémon list by name or type. Results update in real-time as you type.

2) Favorites
    Click the heart icon to save your favorite Pokémon. Your favorites are displayed with a highlighted indicator.

3) Pokémon Details
    Click any Pokémon card to view:

        Full stats (HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed)
        Weight and height
        Abilities
        Base experience
        
4) Evolution Chain
    View the complete evolution line of any Pokémon from its basic form to final evolution.  

5) Comparison
    Select two Pokémon to compare their stats side-by-side, making it easy to see differences.

6) Theme
    Toggle between light and dark modes using the theme button. Your preference is saved automatically.

7) Color Type System
    Each Pokémon type has a distinct color:

        Grass: Green | Fire: Orange | Water: Blue | Electric: Yellow
        Bug: Lime | Fairy: Pink | Normal: Gray | Ground: Brown
        Poison: Purple | Fighting: Red | Psychic: Magenta | Rock: Slate
        Ghost: Indigo | Dragon: Slate Blue | Ice: Cyan | Dark: Charcoal
        Steel: Teal | Flying: Sky Blue

8) Data Source
    This app uses the free PokéAPI for all Pokémon data.  

9) Performance
    Pagination (8 Pokémon per page) for smooth browsing
    Lazy loading of detailed information
    Optimized filtering and sorting
    Theme preference caching

10) Browser Support
        Modern browsers with ES6+ support:
            Chrome
            Firefox
            Safari
            Edge

11) Future Enhancements
        Add ability to catch/collect Pokémon
        Team building feature
        Advanced filtering options
        Pokédex completion tracker
        Move list and details

12) License
        Open source - feel free to modify and use as needed.

