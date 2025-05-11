document.addEventListener("DOMContentLoaded", function () {
  const scriptURL = "https://script.google.com/macros/s/AKfycbwGB4sQ5GLPrZZJYyzOGpXUaqNrHKQYioaFG6adEy8V2vl7oMBrKypq0RBU6UQ-8WQ/exec";

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const contactForm = document.getElementById("contactForm");
  const commentForm = document.getElementById("commentForm");

  // Scroll event for navigation highlighting
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

  // Portfolio tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.getAttribute("data-tab")).classList.add("active");
    });
  });

  // Initialize form handling
  if (contactForm) {
    initContactForm(contactForm, scriptURL);
  }

  AOS.init({
    duration: 1000, // Durasi animasi dalam milidetik
    once: true, // Animasi hanya berjalan sekali
  });

  // Generate certificates content
  generateCertificatesContent();

  // Generate tech stack content
  generateTechStackContent();

  // Animation on scroll
  animateOnScroll();

  // Initialize project modal
  initProjectModal();

  loadProjectsFromJSON();

  initContactForm();

  initBackToTopButton();

  initTypeWriter();

  initParallaxEffect();
  initScrollIndicator();
  initCounterAnimation();
});

// Form submission handling function - moved outside DOMContentLoaded
function initContactForm(contactForm, scriptURL) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formStatus = document.getElementById("formStatus") || createFormStatusElement();

  // Tambahkan loading spinner jika belum ada
  if (!contactForm.querySelector(".loading-spinner")) {
    const spinner = document.createElement("span");
    spinner.className = "loading-spinner";
    spinner.style.display = "none";
    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.appendChild(spinner);
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Dapatkan elemen input
    const nameInput = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[name="email"]') || contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]') || contactForm.querySelector("textarea");

    // Pastikan elemen memiliki atribut name (penting untuk FormData)
    if (nameInput && !nameInput.hasAttribute("name")) nameInput.setAttribute("name", "name");
    if (emailInput && !emailInput.hasAttribute("name")) emailInput.setAttribute("name", "email");
    if (messageInput && !messageInput.hasAttribute("name")) messageInput.setAttribute("name", "message");

    // Debug info
    console.log("Form elements:", {
      nameInput: nameInput ? nameInput.value : "not found",
      emailInput: emailInput ? emailInput.value : "not found",
      messageInput: messageInput ? messageInput.value : "not found",
    });

    // Pastikan semua input ada sebelum validasi
    if (!nameInput || !emailInput || !messageInput) {
      showStatus("Error: Form elements not properly configured", "error");
      return;
    }

    // Validasi sederhana
    if (!nameInput.value.trim()) {
      showStatus("Nama tidak boleh kosong", "error");
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showStatus("Format email tidak valid", "error");
      emailInput.focus();
      return;
    }

    if (messageInput.value.trim().length < 10) {
      showStatus("Pesan harus minimal 10 karakter", "error");
      messageInput.focus();
      return;
    }

    // Tampilkan spinner loading
    submitBtn.disabled = true;
    const loadingSpinner = contactForm.querySelector(".loading-spinner");
    if (loadingSpinner) loadingSpinner.style.display = "inline-block";

    // Debugging: Log the FormData being sent
    console.log("Sending FormData:", Array.from(new FormData(contactForm)));

    // If scriptURL is configured, send to Google Sheets
    if (scriptURL && scriptURL !== "https://script.google.com/macros/s/AKfycbwGB4sQ5GLPrZZJYyzOGpXUaqNrHKQYioaFG6adEy8V2vl7oMBrKypq0RBU6UQ-8WQ/exec") {
      fetch(scriptURL, {
        method: "POST",
        body: new FormData(contactForm),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json().catch(() => {
            // Jika response bukan JSON, return success default
            return { result: "success" };
          });
        })
        .then((data) => {
          showStatus("Pesan berhasil dikirim! Terima kasih telah menghubungi saya.", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Error!", error.message);
          showStatus("Terjadi kesalahan. Silakan coba lagi.", "error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          if (loadingSpinner) loadingSpinner.style.display = "none";
        });
    } else {
      console.warn("scriptURL is not properly configured."); // Debugging: Warn if scriptURL is not set
      showStatus("Pesan berhasil dikirim! Terima kasih telah menghubungi saya.", "success");
      contactForm.reset();
      submitBtn.disabled = false;
      if (loadingSpinner) loadingSpinner.style.display = "none";
    }
  });
}

// Helper function untuk menampilkan status form
function showStatus(message, type) {
  let formStatus = document.getElementById("formStatus");

  if (!formStatus) {
    formStatus = createFormStatusElement();
  }

  formStatus.textContent = message;
  formStatus.className = "form-status " + type;
  formStatus.style.display = "block";

  // Sembunyikan pesan setelah 5 detik
  setTimeout(() => {
    formStatus.style.display = "none";
  }, 5000);
}

// Helper function to create form status element if it doesn't exist
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

// Function to add a new comment
// function addNewComment(name, message) {
//   const commentsList = document.querySelector(".comments-list");
//   const commentDiv = document.createElement("div");
//   commentDiv.className = "comment";
//   commentDiv.innerHTML = `
//       <div class="comment-avatar">${name.charAt(0).toUpperCase()}</div>
//       <div class="comment-content">
//         <div class="comment-header">
//           <span class="comment-name">${name}</span>
//           <span class="comment-time">Just now</span>
//         </div>
//         <p class="comment-text">${message}</p>
//       </div>
//     `;
//   commentsList.insertBefore(commentDiv, commentsList.firstChild);
// }

// Function to generate certificates content
function generateCertificatesContent() {
  const certificatesContainer = document.querySelector(".certificates-grid");
  if (!certificatesContainer) return;

  const certificates = [
    {
      title: "Belajar Machine Learning untuk Pemula",
      image: "assets/ml-untuk-pemula.png",
    },
    {
      title: "Belajar Visualisasi Data",
      image: "assets/visualisasi-data.png",
    },
    {
      title: "Belajar Pengembangan Machine Learning",
      image: "assets/pengembangan-ml.png",
    },
    {
      title: "Memulai Pemrograman dengan Python",
      image: "assets/python.png",
    },
    {
      title: "Machine Learning Terapan",
      image: "assets/ml-terapan.png",
    },
    {
      title: "Belajar Dasar Data Science",
      image: "assets/data-science.png",
    },
    {
      title: "Belajar Dasar Structured Query Language (SQL)",
      image: "assets/sql.png",
    },
    {
      title: "Belajar Analisis Data dengan Python",
      image: "assets/analisis-data.png",
    },
    {
      title: "Belajar Penerapan Data Science",
      image: "assets/data-science-penerapan.png",
    },
    {
      title: "Fundamental Python",
      image: "assets/fundamental-python.png",
    },
    {
      title: "Mahir Membuat DB Aplikasi Profesional",
      image: "assets/db-aplikasi.png",
    },
    {
      title: "Menjadi Linux System Administrator",
      image: "assets/linux-admin.png",
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      image: "assets/js-pemrograman.png",
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      image: "assets/web-pemrograman.png",
    },
    {
      title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
      image: "assets/back-end.png",
    },
  ];

  certificatesContainer.innerHTML = certificates
    .map(
      (cert) => `
        <div class="certificate-card">
          <img src="${cert.image}" alt="${cert.title} Certificate">
          <button class="fullscreen-btn">View Fullscreen</button>
        </div>
      `
    )
    .join("");

  // Fullscreen functionality
  document.querySelectorAll(".fullscreen-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.previousElementSibling;
      const fullscreenModal = document.createElement("div");
      fullscreenModal.className = "project-modal show";
      fullscreenModal.innerHTML = `
          <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <img src="${img.src}" alt="${img.alt}" style="width: 100%; max-height: 80vh; object-fit: contain;">
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

// Function to generate tech stack content
// function generateTechStackContent() {
//   const techStackContainer = document.querySelector(".tech-stack-grid");
//   if (!techStackContainer) return;

//   const techStack = [
//     { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
//     { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
//     { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
//     { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
//     { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg" },
//     { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
//     { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
//     { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
//     { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
//     { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
//     { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
//     { name: "MLflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mlflow/mlflow-original.svg" },
//     { name: "Tableau", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg" },
//     { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/spark-original.svg" },
//     { name: "Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
//   ];

//   techStackContainer.innerHTML = techStack
//     .map(
//       (tech) => `
//         <div class="tech-item">
//           <img src="${tech.icon}" alt="${tech.name}">
//           <span>${tech.name}</span>
//         </div>
//       `
//     )
//     .join("");
// }

// Function to animate elements on scroll
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

// Function to initialize project modal
function initProjectModal() {
  const projectData = {
    "Customer Churn Project": {
      title: "Customer Churn Project",
      image: "assets/project1.png",
      description:
        "Program ini dirancang untuk memprediksi kemungkinan pelanggan berhenti berlangganan menggunakan algoritma Machine Learning. Model ini membantu bisnis dalam mengambil tindakan preventif untuk meningkatkan retensi pelanggan.",
      tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
      features: ["Analisis eksploratif terhadap data pelanggan", "Model klasifikasi menggunakan Random Forest & XGBoost", "Visualisasi prediksi churn secara interaktif", "Antarmuka pengguna berbasis Streamlit"],
      liveLink: "https://customer-churn-project-fauza.streamlit.app/",
      githubLink: "https://github.com/Fauza27/Customer-Churn-Project",
    },
    "Sales Forecasting Project": {
      title: "Sales Forecasting Project",
      image: "assets/project2.png",
      description: "Proyek ini bertujuan untuk memprediksi jumlah penjualan di masa depan menggunakan model time series dan machine learning. Dapat membantu bisnis dalam perencanaan stok dan strategi pemasaran secara lebih akurat.",

      tech: ["Python", "Pandas", "Prophet", "Scikit-learn", "Streamlit"],
      features: ["Preprocessing dan analisis tren penjualan", "Model prediksi dengan Facebook Prophet dan regresi linier", "Visualisasi hasil prediksi penjualan", "Dashboard interaktif untuk eksplorasi data penjualan"],
      liveLink: "https://sales-forecasting-fauza.streamlit.app/",
      githubLink: "https://github.com/Fauza27/sales-forecasting-project",
    },
  };

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectCard = btn.closest(".project-card");
      const projectId = projectCard.getAttribute("data-project");
      const project = projectData[projectId];

      const modal = document.createElement("div");
      modal.className = "project-modal";
      modal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h2>${project.title}</h2>
              <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="modal-image">
                <img src="${project.image}" alt="${project.title}">
              </div>
              <div class="modal-description">
                <div class="info-card">
                  <h4>Total Teknologi</h4>
                  <p>${project.tech.length}</p>
                </div>
                <div class="info-card">
                  <h4>Live Demo</h4>
                  <a href="${project.liveLink}">Link</a>
                </div>
                <div class="info-card">
                  <h4>Github</h4>
                  <a href="${project.githubLink}">Link</a>
                </div>
                <h3>Technologies Used</h3>
                <div class="modal-tech">
                  ${project.tech.map((tech) => `<span>${tech}</span>`).join("")}
                </div>
                <h3>Project Description</h3>
                <p>${project.description}</p>
                <h3>Key Features</h3>
                <ul class="feature-list">
                  ${project.features.map((feature) => `<li><i class="fas fa-check"></i> ${feature}</li>`).join("")}
                </ul>
              </div>
            </div>
            <div class="modal-footer">
              <a href="${project.liveLink}" class="btn btn-primary"><i class="fas fa-external-link"></i> Visit Website</a>
              <a href="${project.githubLink}" class="btn btn-secondary"><i class="fab fa-github"></i> View Source</a>
            </div>
          </div>
        `;

      document.body.appendChild(modal);
      document.body.classList.add("modal-open");
      setTimeout(() => modal.classList.add("show"), 10);

      const closeBtn = modal.querySelector(".modal-close");
      closeBtn.addEventListener("click", () => closeModal(modal));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal(modal);
      });
    });
  });
}

// Function to close modal
function closeModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.classList.remove("modal-open");
  }, 300);
}

// Function to add a new comment to the comments list
// function addNewComment(name, message) {
//   const commentsList = document.querySelector(".comments-list");

//   // Create comment elements
//   const commentDiv = document.createElement("div");
//   commentDiv.className = "comment";

//   // Create avatar with first letter of name
//   const avatar = document.createElement("div");
//   avatar.className = "comment-avatar";
//   avatar.textContent = name.charAt(0).toUpperCase();

//   // Create comment content
//   const contentDiv = document.createElement("div");
//   contentDiv.className = "comment-content";

//   // Create comment header
//   const headerDiv = document.createElement("div");
//   headerDiv.className = "comment-header";

//   const nameSpan = document.createElement("span");
//   nameSpan.className = "comment-name";
//   nameSpan.textContent = name;

//   const timeSpan = document.createElement("span");
//   timeSpan.className = "comment-time";
//   timeSpan.textContent = "Just now";

//   headerDiv.appendChild(nameSpan);
//   headerDiv.appendChild(timeSpan);

//   // Create comment text
//   const commentText = document.createElement("p");
//   commentText.className = "comment-text";
//   commentText.textContent = message;

//   // Assemble the comment
//   contentDiv.appendChild(headerDiv);
//   contentDiv.appendChild(commentText);

//   commentDiv.appendChild(avatar);
//   commentDiv.appendChild(contentDiv);

//   // Add to the beginning of the comments list
//   commentsList.insertBefore(commentDiv, commentsList.firstChild);
// }

// Function to generate certificates content
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
      (cert, index) => `
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
      // Mendapatkan parent card untuk mengakses data
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

function closeModal(modal) {
  document.body.classList.remove("modal-open");
  modal.remove();
}

// Function to generate tech stack content
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

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", generateTechStackContent);

// Function to animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".stat-card, .project-card, .certificate-card, .tech-category");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeIn 0.5s ease-in-out forwards";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });
}

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

// Add some CSS styling for certificate cards
// Fungsi untuk animasi text typing pada hero section
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
      // Jika mulai mengetik kata baru
      if (charIndex === 0 && !isDeleting) {
        typeTarget.innerHTML = "";
      }

      const currentWord = words[wordIndex];

      if (!isDeleting) {
        // Mengetik
        typeTarget.innerHTML = currentWord.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;

        // Jika kata telah selesai diketik
        if (charIndex > currentWord.length) {
          isDeleting = true;
          setTimeout(type, pauseTime);
          return;
        }
      } else {
        // Menghapus
        typeTarget.innerHTML = currentWord.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;

        // Jika kata telah terhapus
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex++;

          // Kembali ke awal jika sudah sampai kata terakhir
          if (wordIndex >= words.length) {
            wordIndex = 0;
          }
        }
      }
    }

    // Sesuaikan kecepatan ketikan
    const typingInterval = isDeleting ? typingSpeed / 2 : typingSpeed;
    setTimeout(type, typingInterval);
  }

  // Mulai efek typing
  setTimeout(type, 1000);
}

// Fungsi untuk filter proyek
// function initProjectFilter() {
//   const filterContainer = document.createElement("div");
//   filterContainer.className = "filter-buttons";

//   const filters = ["All", "ML", "Data"];

//   let filterHTML = "";
//   filters.forEach((filter, index) => {
//     filterHTML += `<button class="filter-btn ${index === 0 ? "active" : ""}" data-filter="${filter.toLowerCase()}">${filter}</button>`;
//   });

//   filterContainer.innerHTML = filterHTML;

//   const projectsTab = document.getElementById("projects");
//   if (projectsTab) {
//     const projectGrid = projectsTab.querySelector(".project-grid");
//     projectsTab.insertBefore(filterContainer, projectGrid);

//     // Tambahkan data kategori ke project cards
//     const projectCards = document.querySelectorAll(".project-card");
//     const categories = ["web", "mobile", "design"];

//     projectCards.forEach((card) => {
//       // Assign random category for demo purposes
//       const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//       card.setAttribute("data-category", randomCategory);
//     });

//     // Filter event listener
//     const filterButtons = document.querySelectorAll(".filter-btn");
//     filterButtons.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         const filter = btn.getAttribute("data-filter");

//         // Toggle active class
//         filterButtons.forEach((b) => b.classList.remove("active"));
//         btn.classList.add("active");

//         // Apply filter
//         projectCards.forEach((card) => {
//           if (filter === "all") {
//             card.style.display = "block";
//           } else {
//             const category = card.getAttribute("data-category");
//             card.style.display = category === filter ? "block" : "none";
//           }
//         });
//       });
//     });
//   }
// }

// Fungsi untuk dark mode toggle
// function initDarkMode() {
//   // Buat tombol toggle dark mode
//   const darkModeBtn = document.createElement("button");
//   darkModeBtn.className = "dark-mode-toggle";
//   darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
//   document.body.appendChild(darkModeBtn);

//   // Cek jika user sudah memilih dark mode sebelumnya
//   const isDarkMode = localStorage.getItem("darkMode") === "true";

//   // Terapkan mode yang sesuai
//   if (isDarkMode) {
//     document.body.classList.add("dark-mode");
//     darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
//   }

//   // Event listener untuk toggle
//   darkModeBtn.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
//     const isDarkNow = document.body.classList.contains("dark-mode");
//     localStorage.setItem("darkMode", isDarkNow);
//     darkModeBtn.innerHTML = isDarkNow ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
//   });
// }

// Fungsi untuk lazy loading pada gambar
function initLazyLoading() {
  const images = document.querySelectorAll("img");

  const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");

        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
        }

        lazyLoadObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    const src = img.src;
    img.setAttribute("data-src", src);
    img.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz4KPC9zdmc+";
    lazyLoadObserver.observe(img);
  });
}

// Fungsi untuk menampilkan toast/notifikasi
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

  // Animasi toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Tutup toast setelah 3 detik
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

document.addEventListener("DOMContentLoaded", showToast);

// Fungsi untuk validasi form
// function initFormValidation() {
//   const contactForm = document.getElementById("contactForm");
//   const commentForm = document.getElementById("commentForm");

//   if (contactForm) {
//     contactForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const nameInput = contactForm.querySelector('input[type="text"]');
//       const emailInput = contactForm.querySelector('input[type="email"]');
//       const messageInput = contactForm.querySelector("textarea");

//       // Validasi nama
//       if (nameInput.value.trim().length < 2) {
//         showToast("Nama harus minimal 2 karakter", "error");
//         nameInput.focus();
//         return;
//       }

//       // Validasi email
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(emailInput.value)) {
//         showToast("Format email tidak valid", "error");
//         emailInput.focus();
//         return;
//       }

//       // Validasi pesan
//       if (messageInput.value.trim().length < 10) {
//         showToast("Pesan harus minimal 10 karakter", "error");
//         messageInput.focus();
//         return;
//       }

//       // Simulasi pengiriman form
//       showToast("Pesan berhasil dikirim!", "success");
//       contactForm.reset();
//     });
//   }

// if (commentForm) {
//   commentForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const nameInput = document.getElementById("commentName");
//     const messageInput = document.getElementById("commentMessage");

//     // Validasi nama
//     if (nameInput.value.trim().length < 2) {
//       showToast("Nama harus minimal 2 karakter", "error");
//       nameInput.focus();
//       return;
//     }

//     // Validasi pesan
//     if (messageInput.value.trim().length < 5) {
//       showToast("Komentar harus minimal 5 karakter", "error");
//       messageInput.focus();
//       return;
//     }

//     // Add comment and reset form
//     addNewComment(nameInput.value, messageInput.value);
//     showToast("Komentar berhasil ditambahkan!", "success");
//     commentForm.reset();

//     // Update comment count
//     const commentCount = document.querySelector(".comments-section h3 span");
//     if (commentCount) {
//       const currentCount = parseInt(commentCount.textContent.replace(/[()]/g, ""));
//       commentCount.textContent = `(${currentCount + 1})`;
//     }
//   });
// }
//}

// Fungsi untuk memuat konten portfolio secara dinamis dari JSON
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

  // Hapus konten yang ada
  projectGrid.innerHTML = "";

  // Tambahkan proyek dari data
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

// Fungsi untuk menampilkan modal detail proyek
function initProjectModal() {
  // Tambahkan event listener untuk detail buttons
  document.addEventListener("click", (e) => {
    if (e.target.closest(".project-links .btn-outline")) {
      e.preventDefault();

      // Ambil data proyek dari card
      const projectCard = e.target.closest(".project-card");
      const projectTitle = projectCard.querySelector("h3").textContent;
      const projectImage = projectCard.querySelector("img").getAttribute("data-src") || projectCard.querySelector("img").src;
      const projectDesc = projectCard.querySelector("p").textContent;

      // Ambil link demo dan details dari tombol-tombol di card
      const demoLink = projectCard.querySelector(".project-links a:first-child").getAttribute("href");
      const detailsLink = projectCard.querySelector(".project-links a:last-child").getAttribute("href");

      // Buat modal dengan struktur yang benar sesuai CSS
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
                <a href="${demoLink}" class="btn btn-primary" target="_blank"><i class="fas fa-external-link"></i> Visit Website</a>
                <a href="${detailsLink}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> View Source</a>
              </div>
            </div>
          `;

      // Tambahkan modal ke DOM
      document.body.appendChild(modal);
      document.body.classList.add("modal-open");

      // Tambahkan efek animasi
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);

      // Event listener untuk menutup modal
      const closeBtn = modal.querySelector(".modal-close");
      closeBtn.addEventListener("click", () => {
        closeModal(modal);
      });

      // Tutup modal jika klik diluar content
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });

      // Tutup modal dengan tombol Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeModal(modal);
        }
      });
    }
  });
}

// Fungsi untuk menutup modal
function closeModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.classList.remove("modal-open");
  }, 300);
}
// Fungsi untuk membuat efek parallax pada hero section
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image");

  if (!heroSection || !heroImage) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const sectionTop = heroSection.offsetTop;
    const sectionHeight = heroSection.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
      // Hitung posisi parallax
      const parallaxOffset = (scrollPosition - sectionTop) * 0.4;
      heroImage.style.transform = `translateY(${parallaxOffset}px)`;
    }
  });
}

document.addEventListener("DOMContentLoaded", initParallaxEffect);

// Fungsi untuk membuat efek scroll indicator
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

document.addEventListener("DOMContentLoaded", initScrollIndicator);

// Fungsi untuk menampilkan statistik yang teranimimasi
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

document.addEventListener("DOMContentLoaded", initCounterAnimation);

// Fungsi untuk deteksi dan notifikasi browser yang tidak kompatibel
function checkBrowserCompatibility() {
  // Deteksi browser versi lama
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;
  const isEdgeHTML = !isIE && !!window.StyleMedia;

  if (isIE || isEdgeHTML) {
    const notice = document.createElement("div");
    notice.className = "browser-notice";
    notice.innerHTML = `
          <div class="notice-content">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Website ini terlihat lebih baik di browser modern seperti Chrome, Firefox, Edge (Chromium), atau Safari.</p>
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

// Fungsi untuk back-to-top button
function initBackToTopButton() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Menampilkan/menyembunyikan button berdasarkan scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top ketika button diklik
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

document.addEventListener("DOMContentLoaded", initBackToTopButton);

// Inisialisasi semua fungsi saat DOM sudah load
document.addEventListener("DOMContentLoaded", function () {
  // Panggil fungsi yang sudah ada sebelumnya

  // Inisialisasi fungsi baru
  initTypeWriter();
  initProjectFilter();
  initDarkMode();
  initLazyLoading();
  initFormValidation();
  loadProjectsFromJSON();
  initProjectModal();
  initParallaxEffect();
  initScrollIndicator();
  initCounterAnimation();
  checkBrowserCompatibility();
  initBackToTopButton();
  loadProjectsFromJSON();

  // Tambahkan CSS untuk fitur baru
  addCustomStyles();
});
