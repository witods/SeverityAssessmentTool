# Severity Assessment Tool

## Installation
1. Clone the project from Github and open in VSCode

2. Open the project folder in the integrated terminal and type this command to install all packages: `npm i`

3. This step is optional as the build has already been done. But if you would have to rebuild, type this command in the terminal: `npm run build`

4. Set up the email account you will use to send emails from for the contact form
    - Go to the `server.js` file in the `/server` folder
    - Line 45: Fill in the email address of the Gmail account where the mail should be sent from
    - Line 46: Fill in the app password of the Gmail account

5. Start the Express server, type this command: `node server/server.js`

6. Open your browser and go to [http://127.0.0.1:5500/](http://127.0.0.1:5500/)
