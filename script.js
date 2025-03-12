// Typewriter effect
const typewriterElement = document.getElementById('typewriter');
const roles = [
    'Computer Science Student',
    'Competitive Programmer',
    'Web Developer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (!isDeleting && charIndex < currentRole.length) {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    } else if (!isDeleting && charIndex >= currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before starting to delete
    } else if (isDeleting && charIndex > 0) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next role
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start the typewriter effect when the page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500); // Start after a small delay
});

// Dark mode functionality
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Initialize theme
initTheme();

// Add event listeners for theme toggle buttons
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('theme-toggle-mobile').addEventListener('click', toggleDarkMode);

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile menu after clicking a link
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("1xm-VykgNyjVOgXI4");
})();

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'labishjain7@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('service_1qk2cgr', 'template_pq1kg9h', templateParams)
        .then(function() {
            // Show success message
            alert('Thank you! Your message has been sent.');
            
            // Reset form
            document.getElementById('contact-form').reset();
        }, function(error) {
            // Show error message
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    observer.observe(item);
});

// Add loading animation to project images
document.querySelectorAll('.project-card img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});
