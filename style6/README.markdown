Editable Resume Page
This project provides a modern, clean, and easily editable resume webpage.

🚀 What's Included
index.html: The main HTML file defining the structure and layout of the resume.

style.css: Contains all the CSS for styling, ensuring a modern and minimalist design.

main.js: A JavaScript file responsible for loading the resume content from data.json and populating the HTML page.

data.json: A JSON file where all your resume information (name, experience, skills, etc.) is stored. This is the primary file you'll edit to customize your resume.

assets/profile.jpg: A placeholder image for your profile photo. Replace this with your own image.

README.md: This file, providing clear instructions for editing and deployment.
✍️ How to Edit Your Resume
All the content of your resume is stored in data.json. Follow these steps to customize it:

Open data.json: Use a text editor or code editor (like VS Code) to open the data.json file.

Edit Content:

Personal Information: Change name, title, and aboutMe.

Contact Information: Update phone, email, and address within the contact object.

Skills & Languages: Modify the arrays skills and languages by adding or removing strings.

Education: Each object in the education array represents an educational entry. Update years, degree, university, and grade. Add or remove objects as needed.

Experience: Each object in the experience array represents a work experience entry. Update years, title, company, and the responsibilities array. Add or remove objects or responsibilities as needed.

Replace Profile Photo:

Navigate to the assets folder.

Replace profile.jpg with your own profile picture. Make sure the new image is also named profile.jpg or update the src in index.html if you use a different name. For best results, use a square image.

🌐 How to Use and Deploy
Local Viewing:

Simply open the index.html file in your web browser. All the data from data.json will be automatically loaded by main.js.

Deployment (e.g., GitHub Pages, Netlify):

Upload all the files (index.html, style.css, main.js, data.json, assets folder) to a web hosting service.

If using GitHub Pages, push your code to a GitHub repository, then enable GitHub Pages in your repository settings.

✨ Modern Design Features
Clean Layout: A two-column layout inspired by modern resume templates.

Typography: Uses the 'Inter' font for clear readability.

Responsive Design: Adapts well to different screen sizes (mobile, tablet, desktop).

Icons: Utilizes Font Awesome for professional and intuitive icons.

Easy Customization: All content driven by a simple JSON file.

Feel free to customize the style.css if you wish to change colors, fonts, or other visual aspects further!