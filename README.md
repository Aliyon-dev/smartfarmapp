# Smart Farming Box

**Smart Farming Box** is a comprehensive solution that combines a Django-based web application with a React Native user application to revolutionize agricultural management through advanced monitoring, real-time data, and analytics. The platform enables seamless farm management for both crop and fish farming, with data-driven insights and remote control capabilities.

## Project Structure

- **Backend**: Django-based web application providing APIs and administrative dashboards.
- **Frontend (Admin)**: Web-based super admin dashboard built with HTML, CSS (Tailwind CSS), and JavaScript.
- **User Application**: A mobile application built with React Native, providing farmers with real-time monitoring and control at their fingertips.

## Features

### Backend (Django)

- **Unified Dashboard**: Monitor both crop and fish farming operations from a single interface.
- **Real-Time Monitoring**: Live data streams from sensors (soil moisture, pH levels, water temperature, etc.).
- **Data Analytics**: Machine learning-based predictive analytics to provide insights on crop and fish health.
- **Automated Alerts**: Immediate notifications for potential risks or issues via email/SMS.
- **Heat Maps**: Visualize farm conditions like soil moisture, temperature, and nutrient distribution.
- **Remote Control**: Remotely adjust irrigation schedules and environmental controls.
- **Weather Integration**: Real-time weather updates and forecasts integrated into the system.
- **Resource Management**: Track water usage, electricity consumption, and feed inventory.
- **Reporting**: Generate detailed performance reports (with PDF generation).
- **User Management**: Role-based multi-user access with audit logs.
- **Google Maps Integration**: View farm locations and status on an interactive map.

### User Application (React Native)

- **Mobile Dashboard**: View key farm data such as soil conditions, water levels, and temperature.
- **Real-Time Updates**: Get live sensor data directly on the mobile app, synced with the backend.
- **Alerts & Notifications**: Receive alerts for any anomalies or issues detected on the farm.
- **Remote Control**: Farmers can remotely manage irrigation, lighting, or other farm controls.
- **Weather Forecasts**: Integrated weather forecasts for planning farm activities.
- **Reporting**: View basic farm performance reports and stats in-app.
- **Multi-Language Support**: Offer app in different languages based on user preferences.
- **Offline Mode**: Basic offline functionality for continued access to key features when network is unavailable.

## Tech Stack

### Backend (Django)

- **Framework**: Django (Python)
- **Database**: PostgreSQL
- **Authentication**: Django Authentication System (with JWT tokens for the mobile app)
- **API**: Django Rest Framework (DRF) for RESTful API integration with the React Native app
- **Charts**: Recharts for data visualization on the web
- **Maps**: Google Maps API for geographic data
- **Permissions**: Role-based access control (RBAC) using Django's permission system

### User Application (React Native)

- **Framework**: React Native (with Expo)
- **State Management**: Redux or Context API (for managing global app state)
- **API Interaction**: Axios or Fetch for API calls to the Django backend
- **Navigation**: React Navigation for handling screens and routes
- **Notifications**: React Native Push Notifications for alert handling
- **Maps**: React Native Maps for integrating Google Maps functionality
- **Storage**: AsyncStorage for storing data locally (for offline mode)
- **Authentication**: JWT-based authentication with Django Rest Framework

## Project Status

The backend is feature-complete and provides full support for the admin dashboard and mobile app. The mobile user application is currently under active development, with core features already implemented. Future updates will focus on improving the user experience and adding more advanced analytics.

## Installation

### Backend (Django)

To install and run the backend locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-farming-box.git
