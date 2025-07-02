document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Add event listener to each nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Close the hamburger menu if it's open
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Function to check if we're running locally
    function isLocalHost() {
        return window.location.hostname === "localhost" ||
               window.location.hostname === "127.0.0.1" ||
               window.location.protocol === "file:";
    }

    let fileSelectBtn; // Declare button variable in a higher scope

    // Only set up file selector for local development
    if (isLocalHost()) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileSelectBtn = document.createElement('button'); // Assign to the higher-scoped variable
        fileSelectBtn.textContent = 'Load Custom Resume Data';
        fileSelectBtn.className = 'file-select-btn';
        // Add a Font Awesome icon to the button
        const fileIcon = document.createElement('i');
        fileIcon.className = 'fas fa-upload'; // Font Awesome upload icon
        fileSelectBtn.prepend(fileIcon); // Add icon before text

        fileSelectBtn.addEventListener('click', () => fileInput.click());

        // Add button to header
        const header = document.querySelector('header .header-content');
        if (header) {
            const navElement = header.querySelector('nav');
            if (navElement) {
                header.insertBefore(fileSelectBtn, navElement);
            } else {
                header.appendChild(fileSelectBtn);
            }
        }

        fileInput.addEventListener('change', handleFileSelect);

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    updateResumeContent(data);
                    // Hide the button after a custom file is successfully loaded
                    if (fileSelectBtn) {
                        fileSelectBtn.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                    alert('Invalid JSON file. Please select a valid resume data file.');
                }
            };
            reader.readAsText(file);
        }
    }

    // Load default data.json
    loadResumeData('data.json');

    function loadResumeData(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateResumeContent(data);
                // Hide the button after default data is successfully loaded
                if (fileSelectBtn) {
                    fileSelectBtn.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error loading resume data:', error);
                if (isLocalHost()) {
                    alert('Failed to load data.json. You can load a custom file using the button.');
                    // If default fails, ensure the button is visible for manual load
                    if (fileSelectBtn) {
                        // Check for 'inline-flex' or 'block' based on your button's default display
                        fileSelectBtn.style.display = 'inline-flex';
                    }
                }
            });
    }

    function updateResumeContent(data) {
        if (!data) return;

        // Update basic info
        document.title = data.htmlTitle || 'Editable Resume';
        if (document.getElementById('header-title')) {
            document.getElementById('header-title').textContent = data.header || '';
        }
        if (document.getElementById('about-text')) {
            document.getElementById('about-text').textContent = data.about || '';
        }
        if (document.getElementById('contact-info')) {
            document.getElementById('contact-info').textContent = data.contact || '';
        }
        // Update profile photo
        const profilePhoto = document.getElementById('profile-photo');
        if (profilePhoto && data.profilePhoto) {
            profilePhoto.src = data.profilePhoto;
        }


        // Update experience section
        const experienceList = document.getElementById('experience-list');
        if (experienceList) {
            experienceList.innerHTML = '';
            if (data.experience && data.experience.length) {
                data.experience.forEach(exp => {
                    const div = document.createElement('div');
                    div.className = 'experience-item';
                    div.innerHTML = `
                        <h3>${exp.position || ''}</h3>
                        <p class="company">${exp.company || ''} - <span class="duration">${exp.duration || ''}</span></p>
                        <p class="description">${exp.description || ''}</p>
                    `;
                    experienceList.appendChild(div);
                });
            }
        }

        // Update education section
        const educationList = document.getElementById('education-list');
        if (educationList) {
            educationList.innerHTML = '';
            if (data.education && data.education.length) {
                data.education.forEach(edu => {
                    const div = document.createElement('div');
                    div.className = 'education-item';
                    div.innerHTML = `
                        <h3>${edu.degree || ''}</h3>
                        <p class="institution">${edu.institution || ''} - <span class="year">${edu.year || ''}</span></p>
                    `;
                    educationList.appendChild(div);
                });
            }
        }

        // Update skills section
        const skillsList = document.getElementById('skills-list');
        if (skillsList) {
            skillsList.innerHTML = '';
            if (data.skills && data.skills.length) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }
        }

        // Update languages section
        const languagesList = document.getElementById('languages-list');
        if (languagesList) {
            languagesList.innerHTML = '';
            if (data.languages && data.languages.length) {
                data.languages.forEach(lang => {
                    const li = document.createElement('li');
                    li.textContent = lang;
                    languagesList.appendChild(li);
                });
            }
        }

        // Update references section
        const referencesList = document.getElementById('references-list');
        if (referencesList) {
            referencesList.innerHTML = '';
            if (data.references && data.references.length) {
                data.references.forEach(ref => {
                    const div = document.createElement('div');
                    div.className = 'reference-item';
                    div.innerHTML = `
                        <p><strong>${ref.name || ''}</strong> - ${ref.contact || ''}</p>
                        ${ref.relationship ? `<p>${ref.relationship}</p>` : ''}
                    `;
                    referencesList.appendChild(div);
                });
            }
        }

        // Social media links
        const socialContainer = document.getElementById('social-icons');
        if (socialContainer) {
            socialContainer.innerHTML = ''; // Clear existing icons
            if (data.socialLinks && data.socialLinks.length) {
                data.socialLinks.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url || '#';
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.setAttribute('aria-label', link.name || 'Social link');

                    let faIconClass = '';
                    let bgColorClass = '';

                    switch (link.name.toLowerCase()) {
                        case 'facebook':
                            faIconClass = 'fab fa-facebook-f';
                            bgColorClass = 'bg-facebook';
                            break;
                        case 'twitter':
                            faIconClass = 'fab fa-x-twitter'; // For the 'X' icon
                            bgColorClass = 'bg-twitter';
                            break;
                        case 'linkedin':
                            faIconClass = 'fab fa-linkedin-in';
                            bgColorClass = 'bg-linkedin';
                            break;
                        case 'instagram':
                            faIconClass = 'fab fa-instagram';
                            bgColorClass = 'bg-instagram';
                            break;
                        case 'github':
                            faIconClass = 'fab fa-github';
                            bgColorClass = 'bg-github';
                            break;
                        case 'email': // Added email for completeness
                            faIconClass = 'fas fa-envelope';
                            bgColorClass = 'bg-email'; // You might need to define this in CSS
                            break;
                        default:
                            faIconClass = 'fas fa-link';
                            bgColorClass = '';
                    }

                    if (bgColorClass) {
                        a.classList.add(bgColorClass);
                    }

                    const icon = document.createElement('i');
                    icon.className = faIconClass;

                    a.appendChild(icon);
                    socialContainer.appendChild(a);
                });
            }
        }

        // Update footer
        if (document.getElementById('footer-text')) {
            document.getElementById('footer-text').textContent = data.footer || '';
        }
    }
});