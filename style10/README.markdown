# Editable Resume Page

This is a modern, responsive resume page built with HTML, CSS (Tailwind), and JavaScript. All content is editable via the `data.json` file.

## Files
- `index.html`: Main HTML structure with sections for profile, about, experience, education, skills, languages, references, and contact.
- `style.css`: Custom CSS to enhance Tailwind styling.
- `main.js`: JavaScript to load content from `data.json` and handle hamburger menu functionality.
- `data.json`: JSON file containing all editable content (title, header, profile, etc.).
- `assets/profile.jpg`: Placeholder for the profile picture (replace with your own image).

## How to Edit
1. **Update Content**: Open `data.json` and modify the fields (e.g., name, experience, contact details). Ensure the JSON structure remains valid.
2. **Replace Profile Picture**: Replace `assets/profile.jpg` with your own image (recommended size: 128x128 pixels).
3. **Customize Styling**: Modify `style.css` for additional styling or update Tailwind classes in `index.html`.
4. **Change Page Title**: Update the `title` field in `data.json`.

## Deployment
- Host the files on any static web server (e.g., GitHub Pages, Netlify, Vercel).
- Ensure all files (`index.html`, `style.css`, `main.js`, `data.json`, and `assets/profile.jpg`) are in the correct directory structure.
- Test the site in a browser to verify content loads correctly.

## Notes
- The resume is responsive with a hamburger menu for mobile devices.
- Navigation links are anchored to sections for smooth scrolling.
- No backend is required as all content is loaded from `data.json`.
- Uses Tailwind CSS via CDN for modern, clean design.