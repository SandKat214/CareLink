# CareLink
### A Patient Management Application for Counseling Professionals
This is a patient management application designed specifically for counseling professionals to securely store and manage patient information, appointments, and history from previous sessions. The application follows an MVC architecture, ensuring a clear separation of concerns for better organization, scalability, and maintainability. It provides a comprehensive solution for managing patient interactions in a secure and user-friendly manner.

## Features
- **Secure Patient Information Storage:** Store detailed patient profiles, including personal information, and session history.
- **Appointment Management:** Schedule, track, and cancel patient appointments with ease.
- **History Tracking:** Keep track of past sessions to monitor patient progress and follow-up requirements.
- **Login Authentication:** Secure login and authentication mechanisms to ensure data privacy and patient confidentiality.  
- **Email Notifications:** Send appointment reminder notifications to patients.  
- **Image Storage:** Safely store and manage patient-related images.  

## Project Structure
The project follows the MVC structure, with separate components responsible for managing different aspects of the application. Here’s a breakdown:

1. **Authentication:** Handles secure user login, authentication, and user data protection.  
```Auth Controller``` manages user data and authentication logic.

3. **Event Management:** Manages event creation, event deletion, and retrieval of stored events.  
```Event Controller``` handles the logic for managing patient events, including customizable date range filtering.
   
5. **Notification:** Sends email notifications.  
```Notification Controller``` facilitates email customizations such as the subject, message, and recipient.

7. **Image Management:** Stores and retrieves images via protected URL.  
```Image Controller``` manages image uploads, retrievals, and ensures secure management of patient-related images.

### Technologies Used
- **Backend:** Node.js, Express
- **Frontend:** JavaScript, React, Chakra UI, CSS
- **Database:** MongoDB (for storing patients, session data, appointments, and users)
- **Authentication:** JWT (JSON Web Token)
- **Email Notifications:** EmailJS
- **Image Storage:** Cloudinary
- **Version Control:** Git (GitHub)

## Planned Improvements
The website is not yet fully optimized for mobile and tablet devices. Work is ongoing to improve responsiveness for these layouts in upcoming releases.

## Demo
**Deployment:** [carelink.ksandeen.com](https://carelink.ksandeen.com)
