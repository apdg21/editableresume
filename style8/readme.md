# Modern Editable Resume

A clean, modern, and fully responsive resume template where all content is loaded from a JSON file.

## Features

- Fully responsive design
- Hamburger menu for mobile view
- All content editable via `data.json`
- Modern styling with CSS variables
- Smooth scrolling navigation
- Interactive elements with hover effects
- Timeline layout for experience and education
- Easy to customize

## How to Use

1. Clone or download this repository
2. Edit the `data.json` file with your personal information
3. Replace `assets/profile.jpg` with your profile photo
4. Open `index.html` in your browser to view your resume

## Customization

All content is loaded from `data.json`. Here's what you can customize:

### Basic Information
- `pageTitle`: The title of the webpage
- `logoText`: Text for the logo in the header
- `navigation`: Menu items with text and links
- `hero`: Main headline section with title, subtitle, description, and profile photo
- `downloadCvLink`: Link for the download CV button

### Sections
- `about`: About me text and personal information
- `experience`: Work experience with dates, titles, and descriptions
- `education`: Education history
- `skills`: Technical skills with icons and proficiency levels
- `languages`: Languages you speak
- `references`: Professional references
- `contact`: Contact information and map embed
- `footer`: Social links and copyright text

### Styling
To change colors, fonts, or other design elements, edit the CSS variables at the top of `style.css`:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    --light-color: #ecf0f1;
    --dark-color: #2c3e50;
    --text-color: #333;
    --text-light: #7f8c8d;
    --white: #fff;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}