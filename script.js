// --- 1. NAVBAR SCROLL EFFECT ---
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. MOBILE HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// --- 3. SCROLL SPY ACTIVE STATE ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 4. PROJECT DATA & MODALS ---
const projectModal = document.getElementById('project-modal');
const closeProjectModal = document.querySelector('.close-modal');
const projectBtns = document.querySelectorAll('.view-project-btn');

const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLinksContainer = document.getElementById('modal-links-container');

const imageModal = document.getElementById('image-modal');
const closeImageModal = document.querySelector('.close-image-modal');
const galleryContainer = document.getElementById('image-gallery-container');

// Project Data Registry
const projectData = {
    '1': {
        title: 'Retail Sales Analysis & Dashboard',
        desc: 'End-to-end retail sales analytics tracking 375K+ transactions and 90K+ customers using Python and Power BI to analyze revenue and profitability metrics.',
        buttons: [
            { text: 'GitHub Repo', icon: 'fab fa-github', href: 'https://github.com/NIKHIL-07/Retail-Sales-Analysis', target: true },
            { text: 'Project Overview', icon: 'fas fa-file-alt', images: ['Project overview RS.png'] },
            { text: 'Dashboards', icon: 'fas fa-chart-pie', images: ['Executive Dashboard.png', 'Customer Analytics Dashboard.png'] },
            { text: 'Python Visuals', icon: 'fab fa-python', images: ['RSV1.png', 'RSV2.png', 'RSV3.png', 'RSV4.png'] }
        ]
    },
    '2': {
        title: 'Employee Attrition Prediction (ML)',
        desc: 'Comprehensive ML framework evaluating employee turnover across 5 classification algorithms (best: XGBoost) with a live deployed Tableau dashboard and Streamlit app.',
        buttons: [
            { text: 'GitHub Repo', icon: 'fab fa-github', href: 'https://github.com/NIKHIL-07/employee-attrition-app', target: true },
            { text: 'Dashboard', icon: 'fas fa-chart-pie', href: 'https://public.tableau.com/app/profile/nikhil.j1424/viz/Employee_Attrition_Dashboard_17834928133760/HRANALYTICSDASHBOARD', target: true },
            { text: 'Streamlit App', icon: 'fas fa-rocket', href: 'https://employee-attrition-app-v2wuy9kzwtuxeq3tybjh7b.streamlit.app/', target: true },
            { text: 'Project Overview', icon: 'fas fa-file-alt', images: ['EA Project Overview.png'] },
            { text: 'Python Visuals', icon: 'fab fa-python', images: ['EAV6.png', 'EAV1.png', 'EAV2.png', 'EAV3.png', 'EAV4.png', 'EAV5.png'] }
        ]
    },
    '3': {
        title: 'Blinkit Retail Sales Analytics Dashboard',
        desc: 'Interactive Power BI intelligence suite tracking $1.20M in grocery sales, 8.5K outlets, and 1.5K items across granular delivery channels.',
        buttons: [
            { text: 'GitHub Repo', icon: 'fab fa-github', href: 'https://github.com/NIKHIL-07/Blinkit-Sales-Analytics-Dashboard/tree/main', target: true },
            { text: 'Project Overview', icon: 'fas fa-file-alt', images: ['Blinkit Project Overview.png'] },
            { text: 'Power BI Dashboard', icon: 'fas fa-chart-line', images: ['Blinkit Dashboard Image.png'] }
        ]
    }
};

// Open Project Details Modal
projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-id');
        const data = projectData[projectId];

        modalTitle.innerText = data.title;
        modalDesc.innerText = data.desc;
        modalLinksContainer.innerHTML = '';

        // Generate buttons dynamically
        data.buttons.forEach(btnConfig => {
            const a = document.createElement('a');
            a.className = 'modal-btn';
            a.innerHTML = `<i class="${btnConfig.icon}"></i> ${btnConfig.text}`;

            if (btnConfig.href) {
                a.href = btnConfig.href;
                if (btnConfig.target) a.target = '_blank';
            } else if (btnConfig.images) {
                a.href = 'javascript:void(0)';
                a.addEventListener('click', () => {
                    openImageGallery(btnConfig.images);
                });
            }

            modalLinksContainer.appendChild(a);
        });

        projectModal.classList.add('active');
    });
});

closeProjectModal.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

// Image Gallery Modal (for Project Visuals & Certificates)
function openImageGallery(images) {
    galleryContainer.innerHTML = '';
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        galleryContainer.appendChild(img);
    });
    imageModal.classList.add('active');
}

// Certificate Lightbox Handler for "Open Certificate" buttons
document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = btn.getAttribute('data-img');
        if (imgSrc) {
            openImageGallery([imgSrc]);
        }
    });
});

closeImageModal.addEventListener('click', () => {
    imageModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('active');
    if (e.target === imageModal) imageModal.classList.remove('active');
});

// --- 5. CONTACT FORM (FORMSPREE) ---
const contactForm = document.getElementById('contact-form');
const formSuccessMessage = document.getElementById('form-success-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.style.display = 'none';
                formSuccessMessage.style.display = 'flex';
                formSuccessMessage.style.flexDirection = 'column';
                formSuccessMessage.style.justifyContent = 'center';
                formSuccessMessage.style.alignItems = 'center';
            } else {
                alert('Something went wrong. Please try again!');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert('Connection error. Please try again later.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}