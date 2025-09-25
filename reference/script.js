/**
 * Portfolio Website - Main JavaScript
 *
 * This script handles all interactive functionality for a personal portfolio website,
 * including animations, form handling, UI interactions, and dynamic content loading.
 *
 * Table of Contents:
 * 1. Core Initialization
 * 2. UI Components
 * 3. Form Handling
 * 4. Animation Effects
 * 5. Content Generation
 * 6. Helper Functions
 */

/**
 * ============================================================================
 * 1. CORE INITIALIZATION
 * ============================================================================
 */

/**
 * Main initialization function that runs when the DOM is fully loaded
 * Sets up all interactive elements and initializes components
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize core components
  updateTimestamp();
  setInterval(updateTimestamp, 1000);
  setupNavigation();
  initPortfolioTabs();

  // Initialize animations
  AOS.init({
    duration: 1000,
    once: true,
  });
  animateOnScroll();
  initTypeWriter();
  initParallaxEffect();
  initScrollIndicator();
  initCounterAnimation();

  // Initialize content
  generateCertificatesContent();
  generateTechStackContent();
  loadProjectsFromJSON();

  // Initialize UI interactions
  initProjectModal();
  initContactForm();
  initBackToTopButton();
});

/**
 * Updates the timestamp element with the current date and time
 */
function updateTimestamp() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);
  const timestampElement = document.getElementById("timestamp");
  if (timestampElement) {
    timestampElement.textContent = formattedDate;
  }
}

/**
 * Sets up navigation highlighting based on scroll position
 */
function setupNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Initializes tab switching functionality in the portfolio section
 */
function initPortfolioTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

/**
 * ============================================================================
 * 2. UI COMPONENTS
 * ============================================================================
 */

/**
 * Initializes the back-to-top button functionality
 */
function initBackToTopButton() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Creates a scroll progress indicator at the top of the page
 */
function initScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;

    scrollIndicator.style.width = `${scrollPercentage}%`;
  });
}

/**
 * Initializes the project modal for displaying project details
 */
function initProjectModal() {
  // Add event listener for project detail buttons
  document.addEventListener("click", (e) => {
    if (e.target.closest(".project-links .btn-outline")) {
      e.preventDefault();

      // Get project data from card
      const projectCard = e.target.closest(".project-card");
      const projectTitle = projectCard.querySelector("h3").textContent;
      const projectImage = projectCard.querySelector("img").getAttribute("data-src") || projectCard.querySelector("img").src;
      const projectDesc = projectCard.querySelector("p").textContent;

      // Get demo and details links
      const demoLink = projectCard.querySelector(".project-links a:first-child").getAttribute("href");
      const detailsLink = projectCard.querySelector(".project-links a:last-child").getAttribute("href");

      // Create modal with proper structure
      const modal = document.createElement("div");
      modal.className = "project-modal";
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>${projectTitle}</h2>
            <button class="modal-close"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="modal-image">
              <img src="${projectImage}" alt="${projectTitle}">
            </div>
            <div class="modal-description">
              <h3>Project Description</h3>
              <p>${projectDesc}</p>
              <h3>Tools & Technologies</h3>
              <div class="modal-tech">
                ${projectCard.querySelector(".project-technologies") ? projectCard.querySelector(".project-technologies").innerHTML : "<span>HTML</span><span>CSS</span><span>JavaScript</span>"}
              </div>
              <h3>Project Features</h3>
              <ul class="feature-list">
                <li><i class="fas fa-check"></i> Responsive design for all devices</li>
                <li><i class="fas fa-check"></i> Modern UI/UX principles</li>
                <li><i class="fas fa-check"></i> High performance optimization</li>
                <li><i class="fas fa-check"></i> Clean and maintainable code</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <a href="${demoLink}" class="btn btn-primary" target="_blank">
              <i class="fas fa-external-link"></i> Visit Website
            </a>
            <a href="${detailsLink}" class="btn btn-secondary" target="_blank">
              <i class="fab fa-github"></i> View Source
            </a>
          </div>
        </div>
      `;

      // Add modal to DOM with animation
      document.body.appendChild(modal);
      document.body.classList.add("modal-open");
      setTimeout(() => modal.classList.add("show"), 10);

      // Event listeners for closing modal
      const closeBtn = modal.querySelector(".modal-close");
      closeBtn.addEventListener("click", () => closeModal(modal));

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal(modal);
      });
    }
  });
}

/**
 * Closes a modal with animation
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.classList.remove("modal-open");
  }, 300);
}

/**
 * ============================================================================
 * 3. FORM HANDLING
 * ============================================================================
 */

/**
 * Initializes the contact form with validation and submission handling
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("submitBtn");
    const loadingSpinner = submitBtn.querySelector(".loading-spinner");
    const formStatus = document.getElementById("formStatus");
    const contactScriptURL = "https://script.google.com/macros/s/AKfycbz0XWmcJ06XsZf0dpuCNoSUocUd46zRfTMAHbxsbgtRbc-vTJVF8UwrRZgFUSluK44/exec";

    // Create FormData object
    const formData = new FormData(form);

    // Add timestamp
    formData.append("timestamp", new Date().toISOString());

    // Validate form
    const validationErrors = validateForm(formData);

    if (validationErrors.length > 0) {
      // Display validation errors
      showStatus(validationErrors.join("<br>"), "error");
      return;
    }

    submitBtn.disabled = true;
    loadingSpinner.style.display = "inline-block";

    fetch(contactScriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        formStatus.textContent = "Message sent successfully!";
        formStatus.classList.add("success");
        form.reset();
      })
      .catch((error) => {
        formStatus.textContent = "Error sending message. Please try again.";
        formStatus.classList.add("error");
      })
      .finally(() => {
        submitBtn.disabled = false;
        loadingSpinner.style.display = "none";
      });
  });
}

/**
 * Validates form data
 * @param {FormData} formData - The form data to validate
 * @returns {Array} An array of validation error messages
 */
function validateForm(formData) {
  let errors = [];

  // Validate name (minimum 2 characters)
  const name = formData.get("name");
  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  // Validate email
  const email = formData.get("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Please enter a valid email address");
  }

  // Validate message (minimum 10 characters)
  const message = formData.get("message");
  if (!message || message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return errors;
}

/**
 * Displays form status messages
 * @param {string} message - The message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showStatus(message, type) {
  let formStatus = document.getElementById("formStatus");

  if (!formStatus) {
    formStatus = createFormStatusElement();
  }

  formStatus.textContent = message;
  formStatus.className = "form-status " + type;
  formStatus.style.display = "block";

  // Hide message after 5 seconds
  setTimeout(() => {
    formStatus.style.display = "none";
  }, 5000);
}

/**
 * Creates a form status element if it doesn't exist
 * @returns {HTMLElement} The created form status element
 */
function createFormStatusElement() {
  const formStatus = document.createElement("div");
  formStatus.id = "formStatus";
  formStatus.className = "form-status";
  formStatus.style.display = "none";

  // Find contact form container and append the status element
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.parentNode.insertBefore(formStatus, contactForm.nextSibling);
  } else {
    document.body.appendChild(formStatus);
  }

  return formStatus;
}

/**
 * ============================================================================
 * 4. ANIMATION EFFECTS
 * ============================================================================
 */

/**
 * Initializes typing animation effect in the hero section
 */
function initTypeWriter() {
  const typeTarget = document.querySelector(".hero-text h1");
  if (!typeTarget) return;

  const originalText = typeTarget.innerHTML;
  const words = originalText.split("<br>");
  typeTarget.innerHTML = "";

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const pauseTime = 1000;

  function type() {
    if (wordIndex < words.length) {
      // If starting to type a new word
      if (charIndex === 0 && !isDeleting) {
        typeTarget.innerHTML = "";
      }

      const currentWord = words[wordIndex];

      if (!isDeleting) {
        // Typing
        typeTarget.innerHTML = currentWord.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;

        // If word has been fully typed
        if (charIndex > currentWord.length) {
          isDeleting = true;
          setTimeout(type, pauseTime);
          return;
        }
      } else {
        // Deleting
        typeTarget.innerHTML = currentWord.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;

        // If word has been fully deleted
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex++;

          // Return to the beginning if reached the last word
          if (wordIndex >= words.length) {
            wordIndex = 0;
          }
        }
      }
    }

    // Adjust typing speed
    const typingInterval = isDeleting ? typingSpeed / 2 : typingSpeed;
    setTimeout(type, typingInterval);
  }

  // Start typing effect
  setTimeout(type, 1000);
}

/**
 * Adds parallax effect to the hero section
 */
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image");

  if (!heroSection || !heroImage) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const sectionTop = heroSection.offsetTop;
    const sectionHeight = heroSection.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
      // Calculate parallax offset
      const parallaxOffset = (scrollPosition - sectionTop) * 0.4;
      heroImage.style.transform = `translateY(${parallaxOffset}px)`;
    }
  });
}

/**
 * Animates elements when they come into view during scrolling
 */
function animateOnScroll() {
  const elements = document.querySelectorAll(".stat-card, .project-card, .certificate-card, .tech-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeIn 0.5s ease-in-out forwards";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });
}

/**
 * Animates counters in statistic elements
 */
function initCounterAnimation() {
  const statElements = document.querySelectorAll(".stat-card h4");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent);
          let currentValue = 0;
          const duration = 2000; // ms
          const stepTime = Math.abs(Math.floor(duration / finalValue));

          function updateCount() {
            currentValue++;
            target.textContent = currentValue;

            if (currentValue < finalValue) {
              setTimeout(updateCount, stepTime);
            }
          }

          setTimeout(updateCount, 100);
          countObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statElements.forEach((stat) => {
    countObserver.observe(stat);
  });
}

/**
 * ============================================================================
 * 5. CONTENT GENERATION
 * ============================================================================
 */

/**
 * Generates certificate content from data
 */
function generateCertificatesContent() {
  const certificatesContainer = document.querySelector(".certificates-grid");
  if (!certificatesContainer) return;

  const certificates = [
    {
      title: "Learning Machine Learning for Beginners",
      issuer: "Dicoding Indonesia",
      date: "2023",
      credential: "Number: 53XE4VN7VZRN",
      image: "img/certi/Belajar ML untuk pemula.png",
      link: "https://www.dicoding.com/certificates/53XE4VN7VZRN",
    },
    {
      title: "Learning Data Visualization",
      issuer: "Dicoding Indonesia",
      date: "2023",
      credential: "Number: 6RPN4MWERX2M",
      image: "img/certi/Belajar visualisasi data.png",
      link: "https://www.dicoding.com/certificates/6RPN4MWERX2M",
    },
    {
      title: "Learning Machine Learning Development",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: EYX405606PDL",
      image: "img/certi/Belajar Pengembangan ML.png",
      link: "https://www.dicoding.com/certificates/EYX405606PDL",
    },
    {
      title: "Starting Programming with Python",
      issuer: "Dicoding Indonesia",
      date: "2023",
      credential: "Number: 10P81G03VZQK",
      image: "img/certi/memulai pemrograman dengan python.png",
      link: "https://www.dicoding.com/certificates/10P81G03VZQK",
    },
    {
      title: "Applied Machine Learning",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: L4PQQLO10P01",
      image: "img/certi/ML Terapan.png",
      link: "https://www.dicoding.com/certificates/L4PQQLO10P01",
    },
    {
      title: "Learning the Basics of Data Science",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: 1RXY18RO1PVM",
      image: "img/certi/Belajar dasar data science.png",
      link: "https://www.dicoding.com/certificates/1RXY18RO1PVM",
    },
    {
      title: "Learning the Basics of Structured Query Language (SQL)",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: 81P2VEGQQPOY",
      image: "img/certi/Belajar dasar sql.png",
      link: "https://www.dicoding.com/certificates/81P2VEGQQPOY",
    },
    {
      title: "Learning Data Analysis with Python",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: JLX12OR9NZ72",
      image: "img/certi/Belajar dasar data science.png",
      link: "https://www.dicoding.com/certificates/JLX12OR9NZ72",
    },
    {
      title: "Learning Data Science Applications",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: N9ZOMLN06PG5",
      image: "img/certi/Belajar Penerapan Data Science.png",
      link: "https://www.dicoding.com/certificates/N9ZOMLN06PG5",
    },
    {
      title: "Fundamental Python",
      issuer: "Coding Studio",
      date: "2024",
      credential: "Number: 77E5627DEB-77DFE5C234-75C10615EE",
      image: "img/certi/Fundamental Python.png",
      link: "https://www.codingstudio.com/certificates/77E5627DEB-77DFE5C234-75C10615EE",
    },
    {
      title: "Mastering Professional Database Application Creation",
      issuer: "Coding Studio",
      date: "2024",
      credential: "Number: 77E5627DEB-77DFE5C234-75C10615EE",
      image: "img/certi/Mahir membuat db app profesional.png",
      link: "https://www.codingstudio.com/certificates/77E5627DEB-77DFE5C234-75C10615EE",
    },
    {
      title: "Becoming a Linux System Administrator",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: 6RPN1066RX2M",
      image: "img/certi/Menjadi linux system administrator.png",
      link: "https://www.dicoding.com/certificates/6RPN1066RX2M",
    },
    {
      title: "Learning Basic JavaScript Programming",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: QLZ97MQQMP5D",
      image: "img/certi/Belajar dasar pemrograman js.png",
      link: "https://www.dicoding.com/certificates/QLZ97MQQMP5D",
    },
    {
      title: "Learning Basic Web Programming",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: 2VX3RDJ6NZYQ",
      image: "img/certi/Belajar dasar web.png",
      link: "https://www.dicoding.com/certificates/2VX3RDJ6NZYQ",
    },
    {
      title: "Learning to Build Back-End Applications for Beginners",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credential: "Number: KEXL1V9LWXG2",
      image: "img/certi/Belajar membuat back end dengan google cloud.png",
      link: "https://www.dicoding.com/certificates/KEXL1V9LWXG2",
    },
  ];

  certificatesContainer.innerHTML = certificates
    .map(
      (cert) => `
        <div class="certificate-card" data-image="${cert.image}" data-title="${cert.title}">
          <img src="${cert.image}" alt="${cert.title} Certificate">
          <div class="certificate-icon">
            <i class="fas fa-certificate"></i>
          </div>
          <div class="certificate-info">
            <h3>${cert.title}</h3>
            <p class="issuer">${cert.issuer}</p>
            <p class="date">${cert.date}</p>
            <p class="credential">${cert.credential}</p>
          </div>
          <button class="fullscreen-btn">View Fullscreen</button>
        </div>
      `
    )
    .join("");

  // Fullscreen functionality
  document.querySelectorAll(".fullscreen-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Get parent card to access data
      const card = btn.closest(".certificate-card");
      const imgSrc = card.getAttribute("data-image");
      const imgTitle = card.getAttribute("data-title");

      const fullscreenModal = document.createElement("div");
      fullscreenModal.className = "project-modal show";
      fullscreenModal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>${imgTitle}</h2>
            <button class="modal-close"><i class="fas fa-times"></i></button>
          </div>
          <img src="${imgSrc}" alt="${imgTitle}" style="width: 100%; max-height: 80vh; object-fit: contain;">
        </div>
      `;
      document.body.appendChild(fullscreenModal);
      document.body.classList.add("modal-open");

      const closeBtn = fullscreenModal.querySelector(".modal-close");
      closeBtn.addEventListener("click", () => closeModal(fullscreenModal));
      fullscreenModal.addEventListener("click", (e) => {
        if (e.target === fullscreenModal) closeModal(fullscreenModal);
      });
    });
  });
}

/**
 * Generates tech stack content from data
 */
function generateTechStackContent() {
  const techStackContainer = document.querySelector(".tech-stack-grid");
  if (!techStackContainer) return;

  const techStack = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg" },
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "OpenCV", icon: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg" },
    { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-logo-primary-colormark-darktext.svg" },
  ];

  techStackContainer.innerHTML = techStack
    .map(
      (tech) => `
        <div class="tech-item" data-aos="fade-up">
          <img src="${tech.icon}" alt="${tech.name}">
          <span>${tech.name}</span>
        </div>
      `
    )
    .join("");
}

/**
 * Loads project data from JSON and generates project cards
 */
function loadProjectsFromJSON() {
  const projectsData = [
    {
      id: 1,
      title: "Customer Churn Project",
      description: "This program is designed to predict the likelihood of customers unsubscribing using Machine Learning algorithms. This model helps businesses take preventive actions to improve customer retention.",
      image: "img/customer churn.png",
      category: "AI/ML",
      technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
      demoLink: "https://customer-churn-project-fauza.streamlit.app/",
      detailsLink: "https://github.com/Fauza27/Customer-Churn-Project",
    },
    {
      id: 2,
      title: "Sales Forecasting Project",
      description: "This project aims to predict future sales figures using time series models and machine learning. It helps businesses in stock planning and marketing strategies more accurately.",
      image: "img/Sales forecasting.png",
      category: "AI/ML",
      technologies: ["Python", "Pandas", "Prophet", "Scikit-learn", "Streamlit"],
      demoLink: "https://sales-forecasting-fauza.streamlit.app/",
      detailsLink: "https://github.com/Fauza27/sales-forecasting-project",
    },
  ];

  const projectGrid = document.querySelector(".project-grid");
  if (!projectGrid) return;

  // Clear existing content
  projectGrid.innerHTML = "";

  // Add projects from data
  projectsData.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.setAttribute("data-category", project.category);

    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" data-src="${project.image}">
      </div>
      <div class="project-meta">
        <div class="project-technologies">
          ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
        </div>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-links">
        <a href="${project.demoLink}" class="btn btn-small">
          <i class="fas fa-external-link"></i> Live Demo
        </a>
        <a href="${project.detailsLink}" class="btn btn-small btn-outline">
          <i class="fas fa-arrow-right"></i> Details
        </a>
      </div>
    `;

    projectGrid.appendChild(projectCard);
  });
}

/**
 * ============================================================================
 * 6. HELPER FUNCTIONS
 * ============================================================================
 */

/**
 * Rearranges the About section layout based on screen size
 */
function rearrangeAboutSection() {
  const aboutContainer = document.querySelector(".about-content");
  const aboutText = document.querySelector(".about-text");
  const aboutImage = document.querySelector(".about-image");

  if (!aboutContainer || !aboutText || !aboutImage) return;

  if (window.innerWidth <= 576) {
    // On mobile view
    // Move image before text
    aboutContainer.insertBefore(aboutImage, aboutText);
  } else {
    // On desktop view, restore original order
    aboutContainer.appendChild(aboutImage); // Image at the end
  }
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Notification type ('success' or 'error')
 */
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;

  document.body.appendChild(toast);

  // Toast animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Close toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);

  // Close button event listener
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  });
}

/**
 * Checks browser compatibility and shows a notice for old browsers
 */
function checkBrowserCompatibility() {
  // Detect old browsers
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;
  const isEdgeHTML = !isIE && !!window.StyleMedia;

  if (isIE || isEdgeHTML) {
    const notice = document.createElement("div");
    notice.className = "browser-notice";
    notice.innerHTML = `
      <div class="notice-content">
        <i class="fas fa-exclamation-triangle"></i>
        <p>This website looks better in modern browsers like Chrome, Firefox, Edge (Chromium), or Safari.</p>
        <button class="notice-close"><i class="fas fa-times"></i></button>
      </div>
    `;

    document.body.appendChild(notice);

    const closeBtn = notice.querySelector(".notice-close");
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(notice);
      localStorage.setItem("browserNoticeShown", "true");
    });
  }
}
