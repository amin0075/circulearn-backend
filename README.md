# CircuLearn Backend

This is the backend of the CircuLearn project, built using Express.js and TypeScript. The backend interacts with a PostgreSQL database through Prisma ORM and provides RESTful API services for the frontend of the CircuLearn project.

## Project Structure

- `src/`: Contains the source code of the application.
  - `config/`: Configuration files.
  - `lib/`: Utility libraries.
  - `modules/`: Main logic modules for handling different features.
  - `router.ts`: Defines API routes for quizzes, feedback, and server health check.
  - `server.ts`: Initializes the Express server and middleware configuration.
  - `db.ts`: Handles database connections using Prisma ORM.
- `prisma/`: Prisma ORM setup and schema definitions.
  - `migrations/`: Migration files for database changes.
  - `schema.prisma`: Prisma schema defining the database structure.
- `Dockerfile`, `docker-compose.yml`: Files to containerize the application.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) (for running the application in a container)
- [PostgreSQL](https://www.postgresql.org/) (for database)
- [Prisma CLI](https://www.prisma.io/docs/getting-started) (installed with the project)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amin0075/circulearn-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd circulearn-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables. Create a `.env` file in the project root. **For credentials and sensitive environment variables, please contact the project author**.

5. Push the Prisma schema to the database:

   ```bash
   npm run pushdb
   ```

6. Run database migrations (if any):

   ```bash
   npm run migrate
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

### Production Mode

1. Build the TypeScript code:

   ```bash
   npm run build
   ```

2. Start the application:

   ```bash
   npm start
   ```

### Running with Docker

You can run the application in a Docker container by following these steps:

1. Build the Docker image:

   ```bash
   docker-compose build
   ```

2. Start the containers:

   ```bash
   docker-compose up
   ```

This will run both the backend service and a PostgreSQL container.

## API Documentation

The API endpoints are defined in the `src/router.ts` file.

### Example Endpoints

- `GET /`: Health check route to ensure the server is running.
- `GET /quiz`: Fetches all quiz results from the database.
- `POST /quiz`: Submits a user's quiz answers and calculates their score.
- `GET /feedback`: Retrieves all feedback entries.
- `POST /feedback`: Submits user feedback to the database.

Each request that modifies data (e.g., quiz submission or feedback submission) requires a valid session. Sessions are stored in cookies that are secured with the settings defined in `server.ts`.

## License

This project is licensed under the ISC License.

## Author

[Amin Keshavarzi](https://github.com/amin0075)
