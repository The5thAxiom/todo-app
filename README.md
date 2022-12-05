# todo-app

A basic todo app made using the MERN Stack.

# API

-   `/api/login`:
    -   `202`: logged in successfully
    -   `200`: incorrect email or password
    -   `500`: server error
-   `/api/signup`:
    -   `201`: account created successfully
    -   `200`: invalid inputs
    -   `500`: server error

# Development environment

## `npm`

-   `npm install` needs to be run 3 times:
    -   in the root folder
    -   in the _backend_ folder
    -   in the _frontend_ folder

## `backend/.env` file:

```
PORT=8000
DB_URL=...
JWT_SECRET_KEY=...
```

-   The `PORT` can be changed if needed

## Scripts:

-   Root level:

    -   `npm run dev`:
        -   Runs both the frontend and backend development servers.
        -   Vite runs with HMR on `http://localhost:5173`
        -   Node runs with live reloads (idk if it can be called HMR, but the server reruns whenever a file is saved) on `http://localhost:8000` (the port given in `backend/.env`)
    -   `npm run dev-served`:
        -   Runs both the frontend and the backend.
        -   Vite is built on every save.
        -   Node is built on every save.
        -   The app can be accessed on `http://localhost:8000` (the frontend is served at `/`)
    -   `npm run build`:
        -   Builds both the frontend and the backend.
        -   Doesn't start any servers.

-   `backend` folder:
-   `frontend` folder:

