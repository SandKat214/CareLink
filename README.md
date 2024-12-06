# CareLink
## Patient Management Application for Counseling Professionals
This is a patient management application designed specifically for counseling professionals to securely store and manage patient information, appointments, and history from previous sessions. The application integrates multiple microservices to enhance modularity, scalability, and maintainability, making it a comprehensive solution for managing patient interactions.

## Features
- **Secure Patient Information Storage:** Store detailed patient profiles, including personal information, and session history.
- **Appointment Management:** Schedule, and track patient appointments with ease.
- **History Tracking:** Keep track of past sessions to monitor patient progress and follow-up requirements.
- **Microservices Architecture:** The application utilizes several independent microservices to handle different functionalities, ensuring modular development and easy scalability.
    * **Login Authentication:** Secure login and authentication mechanisms to ensure data privacy and patient confidentiality.  
    * **Event Management:** Efficiently store, delete, and retrieve events within a date range. 
    * **Email Notifications:** Send automated email notifications.  
    * **Image Storage:** Safely store and manage patient-related images.  

## Project Structure
This project is organized into multiple microservices, each responsible for a specific set of functionalities. Here’s a high-level overview:

1. **Authentication Microservice:** Handles secure user login, authentication, and user data protection.  
[Auth Microservice Repo](https://github.com/SandKat214/Auth_Microservice)

3. **Event Microservice:** Manages appointments.
   
5. **Notification Microservice:** Sends email reminder related to appointments.  
[Notification Microservice Repo](https://github.com/SandKat214/Notification_Microservice)

7. **Image Microservice:** Stores and retrieves patient-related images, ensuring they are securely managed.  
[Image Microservice Repo](https://github.com/SandKat214/Image_Microservice)

## Development & Collaboration
This project was developed in collaboration with a teammate during which they built one of the microservices for this project and I built one for their project. We followed agile practices to ensure effective communication and development. I built and optimized the Main UI frontend and backend (this repo), as well as the Authentication, Notification, and Image microservices (links provided above), while my teammate built the Event microservice.

### Technologies Used
- **Backend:** Node.js, Express
- **Frontend:** JavaScript, React, Vite, Chakra UI
- **Database:** MongoDB (for storing patients, session data, appointments, and users)
- **Authentication:** JWT (JSON Web Token)
- **Email Notifications:** EmailJS
- **Image Storage:** Cloudinary
- **Version Control:** Git (GitHub)


## Preview
https://github.com/user-attachments/assets/e61f3711-b941-46dc-84fd-320bd71f3fc9

