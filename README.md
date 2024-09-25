# msal-auth

Getting started to developing Microsoft Entra ID Authentication with Vue 3 in Vite.

## Project Setup
### Step 1
Clone the repository to your local and open the directory on VS Code (preferred)

### Step 2
Navigate to the root of the project in the terminal, and run the below command
```sh
npm install
```

### Step 3
Modify .env by adding actual ClientId and TenantId

### Step 4
From the root of the project, run the below command
```sh
npm run dev
```
### Step 5
Navigate to http://localhost:8080/ on your browser

## Expected Behaviour
### Step 1
Click on Log In. The browser will redirect you to Microsoft Login page.

### Step 2
Enter your Intelliware Login credentials and sign in. You will need to request access on your first sign in to the application. Once you get an approval, you will be able to login this time.

### Step 3
You should see your Name and Email Address (populated from the token received from Microsoft Entra ID).

### Step 4
Log Out
