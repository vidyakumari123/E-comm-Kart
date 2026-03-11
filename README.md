# React E-Commerce Project (ShopKart)

A full-featured e-commerce frontend web application built with React, Redux Toolkit, React Router, and Tailwind CSS. The project uses a local mock backend powered by `json-server`.

## Tech Stack

- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Heroicons
- **Forms**: React Hook Form
- **Mock Backend Server**: json-server

## Project Setup

### Prerequisites

Make sure you have Node.js and npm installed on your local machine.

### Installation

Clone the repository, then navigate to your project root folder and run:

```bash
npm install
```

## Running the Application Locally

Since this project relies on a mock backend for data (products, users, orders, cart items), you need to run **two separate servers concurrently**.

### 1. Start the json-server (Mock Backend Database)

Open your terminal in the project root folder and run:

```bash
npx json-server --watch src/app/data.json --port 8000
```
*(Make sure this server stays running in the background as it simulates live API responses at `http://localhost:8000`).*

### 2. Start the Vite Frontend Server

Open a **new terminal tab/window** in the project root folder and run:

```bash
npm run dev
```

Your Vite frontend server will now connect to the JSON server endpoints that allow for functionalities like fetching product data, creating accounts, authenticating users, and managing Cartesian operations.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Lints the codebase with ESLint.

## Development Environment Variables

The Vite app relies on a `.env` file to locate your mock backend server API. Check that your local `.env` has the following config:

```env
VITE_API_URL=http://localhost:8000
```
