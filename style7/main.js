document.addEventListener('DOMContentLoaded', function() {
    // First try to load the data.json file directly
    loadResumeData();
    
    // Mobile menu toggle (if you have one)
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('#navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // PDF Download Button Event Listener
    const downloadPdfBtn = document.getElementById('downloadPdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', generatePdf);
    }
});

async function loadResumeData() {
    try {
        // First try to fetch the data.json file
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('File not found');
        
        const data = await response.json();
        populateResume(data);
        document.getElementById('main-content').style.display = 'flex'; // Show content after loading
    } catch (error) {
        console.log('Could not load data.json directly, trying alternative method:', error);
        
        // Fallback: Show file upload option
        showFileUploadOption();
    }
}

function showFileUploadOption() {
    const container = document.querySelector('.container') || document.body;
    
    const uploadContainer = document.createElement('div');
    uploadContainer.className = 'file-upload-container';
    uploadContainer.style.textAlign = 'center';
    uploadContainer.style.padding = '2rem';
    uploadContainer.style.margin = '2rem auto';
    uploadContainer.style.maxWidth = '600px';
    
    uploadContainer.innerHTML = `
        <h2>Load Your Resume Data</h2>
        <p>To view your resume, please upload your <code>data.json</code> file:</p>
        <input type="file" id="jsonFileUpload" accept=".json" style="display: none;">
        <button id="uploadBtn" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Select JSON File
        </button>
        <p style="margin-top: 1rem; font-size: 0.9rem;">Don't have a file? <a href="form.html">Create one first</a></p>
    `;
    
    container.prepend(uploadContainer);
    
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('jsonFileUpload');
    
    uploadBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                populateResume(data);
                uploadContainer.style.display = 'none';
                document.getElementById('main-content').style.display = 'flex'; // Show content after upload
            } catch (error) {
                alert('Error parsing JSON file. Please check the file format.');
                console.error('Error parsing JSON:', error);
            }
        };
        reader.onerror = function() {
            alert('Error reading file. Please try again.');
        };
        reader.readAsText(file);
    });
}

function populateResume(data) {
    // Basic Info
    if (data.profile_image) {
        document.getElementById('profileImage').src = data.profile_image;
        document.getElementById('profileImage').alt = `Profile photo of ${data.name}`;
    }
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about').textContent = data.about;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('email').textContent = data.email;
    document.getElementById('location').textContent = data.location;
    document.getElementById('summary').textContent = data.summary;

    // Languages
    const langList = document.getElementById('languages');
    if (langList && data.languages) {
        langList.innerHTML = data.languages.map(lang => `<li>${lang}</li>`).join('');
    }

    // Experience
    const expDiv = document.getElementById('experience');
    if (expDiv && data.experience) {
        expDiv.innerHTML = data.experience.map(job => `
            <div class="job">
                <h4>${job.role}</h4>
                <p class="company">${job.company}</p>
                <p class="period"><em>${job.period}</em></p>
                <p class="description">${job.description}</p>
            </div>
        `).join('');
    }

    // Education
    const eduDiv = document.getElementById('education');
    if (eduDiv && data.education) {
        eduDiv.innerHTML = data.education.map(edu => `
            <div class="education">
                <h4>${edu.institution}</h4>
                <p class="degree">${edu.degree}</p>
                <p class="year"><em>${edu.year}</em></p>
            </div>
        `).join('');
    }

    // Expertise
    const expList = document.getElementById('expertise');
    if (expList && data.expertise) {
        expList.innerHTML = data.expertise.map(skill => `<li>${skill}</li>`).join('');
    }

    // Skills
    const skillsDiv = document.getElementById('skills');
    if (skillsDiv && data.skills) {
        skillsDiv.innerHTML = data.skills.map(skill => `
            <div class="skill-bar">
                <span>${skill.name}</span>
                <div class="bar">
                    <div style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');
    }

    // Footer
    if (data.footer) {
        if (data.footer.copyright) {
            const copyrightText = data.footer.copyright
                .replace('[year]', new Date().getFullYear())
                .replace('[name]', data.name);
            document.getElementById('copyright-text').textContent = copyrightText;
        }

        const socialLinksContainer = document.getElementById('social-links');
        if (socialLinksContainer && data.footer.social_links) {
            socialLinksContainer.innerHTML = data.footer.social_links.map(link => `
                <a href="${link.url || '#'}" target="_blank" rel="noopener noreferrer" aria-label="${link.name || 'Social link'}">
                    <i class="${link.icon || 'fas fa-link'}"></i>
                </a>
            `).join('');
        }
    }
}

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

async function generatePdf() {
    const mainContent = document.getElementById('main-content'); // Or the specific container you want to print
    if (!mainContent) {
        alert('Resume content not found!');
        return;
    }

    // Temporarily hide elements that shouldn't appear in the PDF, e.g., the menu toggle or the download button itself
    const menuToggle = document.querySelector('.menu-toggle');
    const downloadBtn = document.getElementById('downloadPdf');
    if (menuToggle) menuToggle.style.display = 'none';
    if (downloadBtn) downloadBtn.style.display = 'none';

    try {
        const canvas = await html2canvas(mainContent, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // If you have images from other origins
            logging: true, // For debugging
            // You might need to adjust scrollY or windowWidth/windowHeight
            // depending on how your content is laid out.
            // For a single page resume, often just capturing the main content is enough.
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('resume.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
    } finally {
        // Restore hidden elements
        if (menuToggle) menuToggle.style.display = '';
        if (downloadBtn) downloadBtn.style.display = '';
    }
}