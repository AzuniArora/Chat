#  Chat App

A simple chat application built with Node.js for the backend and React Native (Expo) for the frontend.

---

##  Setup Instructions

### Clone the Repository

bash
git clone https://github.com/AzuniArora/Chat.git
cd Chat


---

## Running the App

### Backend (Node.js)

1. Open a terminal and navigate to the backend folder:

    bash
    cd backend
    

2. Start the backend server:

    bash
    node index.js
    

---

###  Frontend (React Native using Expo)

1. Open another terminal and navigate to the frontend folder:

    bash
    cd frontend
    

2. Start the Expo server:

    bash
    npx expo start
    

3. Press a to launch the Android Emulator (or connect your Android device).

---

## Important Configuration

###  Update IP Address

In frontend/utils/socket.js, replace the IP address with your local machine's IP address.

You can find your IP address by running the following command in CMD:

bash
ipconfig


Use the IPv4 Address shown under your active network connection.

Example:
js
const socket = io("http://192.168.1.5:3000");


---

##  Running on Android

To run on an Android emulator:

1. Make sure Android Studio and an emulator are installed.
2. In the frontend terminal, press a when prompted.
3. The app will open in your emulator or connected device automatically.

---

##  Requirements

- Node.js
- Expo CLI (npm install -g expo-cli)
- Android Studio or a physical Android device

---
