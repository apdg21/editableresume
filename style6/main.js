// main.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update profile section
            document.getElementById('user-name').textContent = data.name;
            document.getElementById('user-title').textContent = data.title;

            // Update About Me section
            document.getElementById('about-me-text').textContent = data.aboutMe;

            // Update Contact section
            document.getElementById('contact-phone').textContent = data.contact.phone;
            document.getElementById('contact-email').textContent = data.contact.email;
            document.getElementById('contact-address').textContent = data.contact.address;

            // Update Skills section
            const skillsList = document.getElementById('skills-list');
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            // Update Language section
            const languageList = document.getElementById('language-list');
            data.languages.forEach(language => {
                const li = document.createElement('li');
                li.textContent = language;
                languageList.appendChild(li);
            });

            // Update Education section
            const educationItems = document.getElementById('education-items');
            data.education.forEach((edu, index) => {
                const div = document.createElement('div');
                div.classList.add('education-item');
                div.innerHTML = `
                    <div class="timeline-dot"></div>
                    ${index < data.education.length - 1 ? '<div class="timeline-line"></div>' : ''}
                    <p class="text-sm text-gray-500">(${edu.years})</p>
                    <h3>${edu.degree}</h3>
                    <p>${edu.university}</p>
                    <p>${edu.grade}</p>
                `;
                educationItems.appendChild(div);
            });

            // Update Experience section
            const experienceItems = document.getElementById('experience-items');
            data.experience.forEach((exp, index) => {
                const div = document.createElement('div');
                div.classList.add('experience-item');
                const responsibilitiesHtml = exp.responsibilities.map(resp => `<li>${resp}</li>`).join('');
                div.innerHTML = `
                    <div class="timeline-dot"></div>
                    ${index < data.experience.length - 1 ? '<div class="timeline-line"></div>' : ''}
                    <p class="text-sm text-gray-500">(${exp.years})</p>
                    <h3>${exp.title}</h3>
                    <p>${exp.company}</p>
                    <ul>${responsibilitiesHtml}</ul>
                `;
                experienceItems.appendChild(div);
            });

        })
        .catch(error => console.error('Error loading resume data:', error));
});
