# Hotel Talavera Reservas

## Project Description
Hotel Talavera Reservas is an application that allows users to easily manage hotel reservations. The application provides a user-friendly interface for guests to book rooms and for administrators to manage the bookings.

## Features
- User authentication and role-based access
- Room booking management
- Admin panel for managing reservations
- User-friendly UI/UX design
- Integration with various payment gateways

## Technologies
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Testing:** Deno
- **CI/CD:** GitHub Actions

## Project Structure
```
|
|-- src/
|   |-- components/          # React components
|   |-- pages/               # Application pages
|   |-- routes/              # API routes
|   |-- styles/              # Stylesheets
|-- tests/                   # Deno tests
|-- .github/                 # GitHub workflows
|-- package.json             # Dependency management
|-- README.md                # Project documentation
```  

## Installation Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/Eduardomvp/hotel-talavera-reservas.git
   cd hotel-talavera-reservas
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Development Guide
- Use `npm run dev` to start the development server.
- Follow code structure as outlined above for adding new features.

## Testing with Deno
- To run tests with Deno, follow these steps:
   1. Ensure Deno is installed on your machine.
   2. Run tests:
   ```bash
   deno test
   ```

## CI/CD Workflow
- Utilize GitHub Actions to automate the testing and deployment process. Check the `.github/workflows` folder for detailed workflow files.

## Deployment Options
- The application can be deployed on services like Heroku, Vercel, or AWS. Refer to specific service documentation for deployment instructions.

## Contribution Guidelines
- Feel free to submit a pull request for any changes or improvements. Make sure to follow the coding standards and include tests for new features.