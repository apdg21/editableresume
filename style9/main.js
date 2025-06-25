document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.title = data.htmlTitle || 'Editable Resume';
            document.getElementById('header-title').textContent = data.header || '';
            document.getElementById('about-text').textContent = data.about || '';

            const experienceList = document.getElementById('experience-list');
            experienceList.innerHTML = '';
            data.experience.forEach(exp => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${exp.position}</h3><p>${exp.company} - ${exp.duration}</p><p>${exp.description}</p>`;
                experienceList.appendChild(div);
            });

            const educationList = document.getElementById('education-list');
            educationList.innerHTML = '';
            data.education.forEach(edu => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${edu.degree}</h3><p>${edu.institution} - ${edu.year}</p>`;
                educationList.appendChild(div);
            });

            const skillsList = document.getElementById('skills-list');
            skillsList.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            const languagesList = document.getElementById('languages-list');
            languagesList.innerHTML = '';
            data.languages.forEach(lang => {
                const li = document.createElement('li');
                li.textContent = lang;
                languagesList.appendChild(li);
            });

            const referencesList = document.getElementById('references-list');
            referencesList.innerHTML = '';
            data.references.forEach(ref => {
                const div = document.createElement('div');
                div.innerHTML = `<p>${ref.name} - ${ref.contact}</p>`;
                referencesList.appendChild(div);
            });

            document.getElementById('contact-info').textContent = data.contact || '';

            // Render social media icons in footer
            const socialContainer = document.getElementById('social-icons');
            socialContainer.innerHTML = ''; // clear existing

            if (data.socialLinks && data.socialLinks.length) {
                data.socialLinks.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.className = 'fa ' + link.icon;
                    a.setAttribute('aria-label', link.name);
                    socialContainer.appendChild(a);
                });
            }

            document.getElementById('footer-text').textContent = data.footer || '';
        })
        .catch(error => console.error('Error loading data.json:', error));
});
