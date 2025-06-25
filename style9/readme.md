# Modern Editable Resume

A clean, modern, and fully editable resume template built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Clean, professional layout
- Editable content via JSON file
- Interactive elements with smooth animations
- Print-friendly styling

## How to Use

1. Clone or download this repository
2. Edit the `data.json` file with your personal information
3. Replace `assets/profile.jpg` with your profile photo
4. Open `index.html` in your browser to view your resume

### Editing Your Resume

All content is stored in `data.json`. Edit these sections:

- `personalInfo`: Your name, contact details, etc.
- `about`: Your professional summary
- `skills`: List of skills with proficiency levels (0-100)
- `experience`: Your work history
- `education`: Your academic background
- `languages`: Languages you speak
- `projects`: Notable projects you've worked on
- `socialLinks`: Your professional social media profiles

### Customizing the Design

Edit `style.css` to change colors, fonts, spacing, or any other visual aspects.

### Advanced Editing

For more advanced editing:

1. The JavaScript in `main.js` handles loading the data and the edit functionality
2. The edit modal allows for in-browser editing (currently just a demo)
3. To implement actual saving, you would need to:
   - Add server-side code to handle saving the JSON
   - Or use browser storage for temporary edits

## Deployment

To deploy your resume:

1. Upload all files to any web hosting service
2. For GitHub Pages:
   - Create a GitHub repository
   - Push your files
   - Enable GitHub Pages in repository settings

## License

This project is open source and available under the MIT License.