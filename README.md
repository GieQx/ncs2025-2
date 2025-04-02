# National Convention on Statistics 2025

## Description
The National Convention on Statistics 2025 is a web application designed to provide a platform for managing events related to statistics and data science. It offers users the ability to access resources, view event agendas, and connect with exhibitors and speakers.

## Features
- **About Section**: Provides insights into the event and its goals, emphasizing data-driven decision-making.
- **Resources & Downloads**: Access to research papers, datasets, and other valuable materials.
- **Event Agenda**: Detailed schedule of the convention's sessions, including keynote speakers and workshop information.
- **Exhibitor List**: A directory of exhibitors, organized by tiers (Platinum, Gold, etc.) with options to connect.
- **Data Visualization Tools**: Interactive simulations and displays to explore different statistical methodologies.
- **Speaker Information**: Profiles of industry leaders and experts participating in the convention, including their sessions.
- **Networking Opportunities**: Facilitates connections and discussions among attendees, speakers, and exhibitors.

## Prerequisites
- Replit account
- Basic knowledge of JavaScript and web development

## Step-by-Step Deployment on Replit

### Step 1: Create a Repl
Go to Replit and create a new Repl using the Node.js template.

### Step 2: Clone the Repository
If you have a repository, clone it into your new Repl using the Shell with:
   ```bash
   git clone <your-repo-url>
```
### Step 3: Install Dependencies
In the Shell, navigate to your project directory and install necessary dependencies:
npm install

### Step 4: Set Up Environment Variables
If your application requires any environment variables, set them in the Replit Secrets or directly in your code.

### Step 5: Start the Application
Click on the Run button in the Replit IDE to start the application.
Your application will run on 0.0.0.0:5000, and you can access it at:
https://<your-username>.<your-repl-name>.replit.app

### Step 6: Deployment
After verifying everything works correctly in development, you can deploy the application using Replit's deployment tools.
Click the Deploy button at the top right of the workspace.
Follow prompts to configure your deployment:
Public Directory: Set to ./ to serve all your frontend files.
Build Command: Set to npm run build if you are using a build process.
Click Deploy to complete the deployment.

### Step 7: Verify Deployment
After deployment, navigate to your provided URL to verify that the application is accessible.
How to Push Changes to GitHub
Open the Shell in Replit.
Run the following commands:
git init  # Initialize a git repository if not already done
git add .  # Stage all changes
git commit -m "Initial commit"  # Commit changes
git remote add origin <your-repo-url>  # Link to your GitHub repository
git push -u origin main  # Push to GitHub
Additional Information
For detailed usage instructions and further setup, refer to the inline comments within the codebase.

This `README.md` provides a detailed overview of the application and its features, as well as guides for deployment and version control. Adjust the `<your-repo-url>` and Replit URLs as necessary for your project details!
