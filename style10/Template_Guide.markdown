# Modern Resume Template Guide

Create a sleek, professional resume with this modern, one-page scrolling template. This guide walks you through the process of customizing your resume using the provided template files, from editing your data to previewing and deploying your resume.

## 💡 Features
- **Modern Design**: Clean, one-page scrolling layout with a professional look.
- **Fully Responsive**: Adapts seamlessly to desktops, tablets, and mobile devices using HTML and CSS.
- **Data-Driven**: All content is loaded dynamically from a `data.json` file.
- **Easy Deployment**: Host your resume on platforms like Netlify or GitHub Pages with minimal setup.
- **Editable**: Use the included `form.html` to easily input and update your resume data.

## 🛠 How to Create Your Resume
Follow these steps to build and customize your resume using the template:

1. **Receive and Organize Files**:
   - Upon receiving the template, unzip the folder if necessary. You’ll find files including `index.html`, `form.html`, `data.json`, `style.css`, `main.js`, and an `assets` folder with `profile.jpg`.
   - Create a dedicated folder on your computer to store these files (e.g., `MyResume`).

2. **Backup the Original `data.json`**:
   - Before making changes, create a backup of the `data.json` file to preserve the sample data as a reference.
   - Copy `data.json` and save it as `data-backup.json` in the same folder or another safe location.

3. **Open the Resume Builder Form**:
   - Open `form.html` in a web browser (e.g., Chrome, Firefox). This file provides a user-friendly interface to input your resume data.
   - The form includes sections for personal information, skills, experience, education, languages, projects, and social links.

4. **Load Existing `data.json` as a Guide**:
   - In the form, click the **"Load Existing Data"** button at the bottom.
   - Select the original `data.json` file from the template folder. This loads the sample data into the form, serving as a guide for the expected format.
   - Review the sample data to understand how to structure your information.

5. **Input Your Data**:
   - Replace the sample data with your own information in each section of the form:
     - **Personal Information**: Enter your name, job title, email, phone, and location.
     - **About You**: Write a brief professional summary.
     - **Skills**: Add skills and set proficiency levels using the sliders.
     - **Work Experience**: Include job positions, companies, dates, and responsibilities.
     - **Education**: List degrees, institutions, locations, and years.
     - **Languages**: Add languages and proficiency levels.
     - **Projects**: Describe projects with names, descriptions, and optional URLs.
     - **Social Links**: Select platforms (GitHub, LinkedIn, Facebook, Twitter, Instagram) and add profile URLs.
   - Use the **"Add"** buttons to include additional entries for skills, experience, etc., and the **"Remove"** buttons to delete unwanted entries.
   - Ensure all required fields (marked with `required`) are filled to avoid errors when saving.

6. **Save Your Data**:
   - Once you’ve entered all your information, click the **"Generate Resume"** button at the bottom of the form.
   - The form will validate your input and prompt you to download a new `data.json` file.
   - Save this file in the template folder, replacing the original `data.json` (your backup ensures the sample data is safe).
   - If you encounter validation errors (e.g., missing required fields or no skills added), correct them and try again.

7. **Preview Your Resume**:
   - Open `index.html` in a web browser to view your resume.
   - You’ll be prompted to select a `data.json` file. Choose the `data.json` you just saved from the form.
   - The resume will load with your data, styled according to the template’s modern design. Verify that all information displays correctly.
   - Replace `assets/profile.jpg` with your own photo (keep the filename as `profile.jpg`) to personalize the resume further.

8. **Edit Your Resume (Optional)**:
   - If you need to make changes, reopen `form.html` in your browser.
   - Click **"Load Existing Data"** and select your saved `data.json` file to load your current resume data.
   - Update the necessary fields, then click **"Generate Resume"** to save a new `data.json`.
   - Repeat the preview process by opening `index.html` and selecting the updated `data.json`.

## 🚀 Deployment Tips
Share your resume online by hosting it on a web platform:
- **Netlify**:
  - Sign up at [Netlify](https://www.netlify.com/).
  - Use the "Netlify Drop" feature to drag and drop your template folder, or connect your GitHub repository.
  - Netlify will provide a public URL (e.g., `your-resume.netlify.app`) to share your resume.
- **GitHub Pages**:
  - Create a GitHub repository and push your template folder to it.
  - Enable GitHub Pages in the repository settings, selecting the main branch and the root folder.
  - Access your resume at `https://yourusername.github.io/your-repo-name`.
- **Other Hosting**:
  - Upload the entire folder to any web host supporting static files (e.g., Vercel, Firebase Hosting).
  - Ensure `index.html` is set as the default entry point.

## 🧠 Customization Notes
- **Styling**: Modify `style.css` to tweak colors, fonts, or layout. For example, change the `--primary-color` variable to alter the theme.
- **Content**: The `main.js` file controls how `data.json` data is loaded into `index.html`. Advanced users can edit `main.js` to adjust the display logic.
- **Profile Photo**: Ensure your `profile.jpg` is optimized (e.g., 200x200 pixels, <500KB) for fast loading.
- **Browser Compatibility**: Test `index.html` and `form.html` in multiple browsers (Chrome, Firefox, Safari) to ensure consistency.
- **Data Format**: The `data.json` file must match the structure expected by the template. Use `form.html` to generate it to avoid errors.

## 🔧 Troubleshooting
- **Resume Not Loading**: Ensure you selected the correct `data.json` file in `index.html`. Verify the JSON structure by loading it in `form.html`.
- **Form Validation Errors**: Check that all required fields are filled and at least one skill is added before generating `data.json`.
- **Display Issues**: Clear your browser cache or try a different browser if the resume doesn’t render correctly.
- **Deployment Errors**: Confirm all files, including the `assets` folder, are uploaded to your hosting platform.

## 📦 Files Overview
- `index.html`: The main resume page that loads `data.json` for preview.
- `form.html`: The resume builder form for editing and generating `data.json`.
- `data.json`: Stores your resume data in JSON format.
- `style.css`: Controls the visual styling of the resume and form.
- `main.js`: Handles the logic for loading `data.json` into `index.html`.
- `form.js`: Manages the resume builder form functionality.
- `assets/profile.jpg`: Placeholder for your profile photo.

## 🌟 Additional Tips
- **Keep Data Concise**: Use short, impactful descriptions to fit the one-page design.
- **Regular Backups**: Save versions of `data.json` (e.g., `data-2025-07-10.json`) before major edits.
- **Shareable Links**: After deploying, share your resume URL on job applications or social media.
- **Print Version**: Open `index.html`, select your `data.json`, and use the browser’s print function (Ctrl+P) to save as a PDF for physical copies.

This template makes it easy to create, edit, and share a professional resume. Enjoy building your standout resume!