# Fundable Backend API

This server is built on **TypeScript**, **Node.js**, **Express**, **PostgreSQL**, and **TypeORM**. It contains a clean, organized structure, while incorporating best practices such as type safety, database integration, and robust configurations.

## Technologies Used

-   Built with **TypeScript** for type safety and better developer experience.
-   **Express** as the web framework.
-   **PostgreSQL** database integration via **TypeORM**.
-   Environment-based configurations.
-   Scalable folder structure.
-   Middleware for request validation and error handling.
-   Support for database migrations.
-   Lightweight and ready for production deployment.

---

## Before You Begin

Ensure you have the following installed on your system:

-   **Node.js** (v20.x or above)
-   **pnpm** (for dependency management)
-   **PostgreSQL** (v14.x or above)
-   **Git** (optional, for version control)
-   **ESLint**: Linting for maintaining code quality.
-   **Jest**: Unit testing framework.

---

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Fundable-Protocol/Backend.git
    cd (folder path)
    ```

2. Install dependencies:

    ```bash
    pnpm install

    ```

---

## Configuration

```bash
cp .env.example .env
```

Run this command to copy .env `cp .env.example .env` file in the project root and populate it with your environment-specific variables. Use the example below as a reference:

# Server

PORT=8002
NODE_ENV=one of these: local_dev | dev | staging | prod
Database=check credentials in env, and setup local db accordingly

> Ensure sensitive keys are not committed to version control.

---

## Running the Application

1. Start the development server:

    ```bash
    pnpm dev (This will start the API server with hot reloading enabled.)
    ```

2. To build and run for production: pnpm build && pnpm start

---

## Folder Structure

```plaintext
src/
├── __tests__/                         # Test files
├── appMiddlewares/                    # Main app files
├── components/                        # Folder containing version folder
    ├── v1/                            # Version 1
        ├── features/                  # Feature files
            ├── featureMiddleware/     # middlewares pertaining to feature
            ├── featureController/     # controllers pertaining to feature
            ├── featureRoutes/         # routes pertaining to feature
            ├── featureServices/       # Business logic and services pertaining to feature
            ├── featureValidation/     # Validation pertaining to feature
        └── routes.v1.ts               # V1 routes file

├── config/                            # Configuration files
├── migrations/                        # Database migration files
├── scripts/                           # App Scripts files
├── services/                          # App Services files
├── types/                             # Configuration files
├── utils/                             # Utility functions
├── .env.example                       # environment file to duplicate
└── index.ts                           # Application entry point

```

---

## TypeORM and Database Setup

1. Update the database configuration in `.env`.

2. Run migrations to set up the database schema:

    ```bash
    pnpm run-migration
    ```

3. If you need to create a new migration:

    ```bash
    pnpm generate-migration <MigrationName>
    ```

---

## Adding a New Entity and Controller

1. Create a new entity in `src/components/v1/feature/feature.entities.ts`:

    ```typescript
    // src/components/v1/feature/feature.entities.ts
    import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

    @Entity('feature')
    export class (FeatureName) {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column()
        email: string;
    }
    ```

2. Generate and run the migration for the new entity:

    ```bash
    pnpm generate-migration <MigrationName>
    pnpm run-migration
    ```

---

## Testing

To run tests, use the following command:

```bash
pnpm test
```

Tests are located in the `__tests__` folder and use a library like **Jest** for unit and integration tests.

---

### Any challenges? Reach out!
