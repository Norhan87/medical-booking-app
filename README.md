# Medical Booking App

A React-based medical booking application that allows users to browse doctors, view doctor details, book appointments, and manage their appointments.

## Features

- Browse doctors from a REST API
- Search doctors by name
- Filter doctors by specialty
- View doctor details
- Add and remove favorite doctors
- Book medical appointments
- View all appointments
- Edit appointments
- Cancel appointments
- Form validation using React Hook Form
- Loading, error, empty, and success states
- Reusable React components
- 404 Not Found page
- Profile and favorite doctors section

## Technologies

- React
- React Router
- Zustand
- Axios
- React Hook Form
- REST API
- JSON Server
- CSS
- Vite

## Project Structure

````text
src/
├── components/
│   ├── Navbar.jsx
│   ├── DoctorCard.jsx
│   ├── AppointmentCard.jsx
│   └── Toast.jsx
│
├── pages/
│   ├── DoctorsPage.jsx
│   ├── DoctorDetailsPage.jsx
│   ├── BookAppointmentPage.jsx
│   ├── AppointmentsPage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
│
├── services/
│   └── api.js
│
├── stores/
│   └── doctorStore.js
│
├── routes/
│   └── router.jsx
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css

## Installation

Clone the repository and install the dependencies:

```bash
npm install
````

## Run the Project

The project requires two terminals.

### Terminal 1 — Start React

```bash
npm run dev
```

The application will run on the Vite development server, usually:

```text
http://localhost:5173
```

### Terminal 2 — Start JSON Server

```bash
npx json-server db.json --port 3000
```

The API will run on:

```text
http://localhost:3000
```

## REST API

The application uses JSON Server for the REST API.

### Doctors

```text
GET /doctors
GET /doctors/:id
```

### Appointments

```text
GET /appointments
POST /appointments
PUT /appointments/:id
DELETE /appointments/:id
```

## Main Pages

- `/` — Doctors
- `/doctors/:id` — Doctor Details
- `/book` — Book Appointment
- `/appointments` — My Appointments
- `/profile` — Profile
- `*` — 404 Not Found

## Form Validation

Appointment forms validate:

- Patient name
- Email format
- Appointment date
- Appointment time

Validation errors are displayed directly in the form.

## State Management

Zustand is used to manage favorite doctors across the application.

## Author

Medical Booking App — React Training Project
