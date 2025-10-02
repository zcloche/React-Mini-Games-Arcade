
# React Mini-Games Arcade

This is a web application featuring a collection of classic mini-games, built with React, TypeScript, and styled with Tailwind CSS. It serves as a central hub or "arcade" where users can select and play different games within a single-page application.

## Features

- **Homepage / Arcade Hub:** A beautiful, responsive grid layout showcasing the available games.
- **Multiple Games:** Includes implementations of:
  - Tic-Tac-Toe
  - Snake
  - Memory Game
  - Hangman
- **Seamless Navigation:** Switch between the homepage and games without page reloads.
- **Modern Tech Stack:** Built with React 18, TypeScript, and Tailwind CSS for a fast, type-safe, and aesthetically pleasing experience.
- **Easy to Extend:** The component-based architecture makes it simple to add new games.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (which comes with Node.js) installed on your machine.

### Installation

1.  **Clone the repository (or download the source code):**
    ```bash
    git clone <repository-url>
    cd react-mini-games-arcade
    ```

2.  **Install dependencies:**
    Run the following command in the project root to install all the necessary packages.
    ```bash
    npm install
    ```

### Running the Development Server

To start the application in development mode, run:

```bash
npm start
```

This will run the app in development mode and open it in your default web browser at [http://localhost:3000](http://localhost:3000). The page will reload if you make edits.

## Building for Production

To create an optimized production build of the application, run:

```bash
npm run build
```

This command bundles the app into static files for production and outputs them to the `build/` (or `dist/`) directory.

## Deployment

This project is a single-page application and can be deployed to any static site hosting service. Here's how to deploy it using Netlify, which is a fast and easy option.

### Deploying to Netlify (Drag and Drop)

1.  **Build the project:**
    Run `npm run build` locally as described above. This will create a `build` (or `dist`) folder in your project directory.

2.  **Log in to Netlify:**
    Go to [app.netlify.com](https://app.netlify.com/) and log in with your account.

3.  **Drag and Drop:**
    On your Netlify "Sites" page, simply drag the `build` (or `dist`) folder from your local machine and drop it onto the deployment area in the Netlify UI.

4.  **Done!**
    Netlify will automatically upload your files, assign a random URL to your site, and deploy it. You can customize the site name and domain in the Netlify site settings.
