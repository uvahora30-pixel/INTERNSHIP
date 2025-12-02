/* scripts.js
   Requires:
   - EmailJS SDK loaded and emailjs.init('YOUR_USER_ID') executed in HTML
   - Replace SERVICE_ID and TEMPLATE_ID placeholders below with your EmailJS values.
*/

(function(){
  // ======== Config - CHANGE THESE ========
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. 'service_xxx'
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. 'template_xxx'
  // =======================================

  // Elements
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const modalClose = document.getElementById("modalClose");
  const modalOk = document.getElementById("modalOk");

  // Dark mode toggle
  const darkToggle = document.getElementById("darkToggle");
  const rootEl = document.documentElement;

  // Initialize dark mode from localStorage
  function applyDarkFromStorage(){
    const prefer = localStorage.getItem("rg_darkmode");
    if(prefer === "true"){
      rootEl.classList.add("dark");
    } else {
      rootEl.classList.remove("dark");
    }
    updateDarkIcon();
  }
  function toggleDark(){
    const isDark = rootEl.classList.toggle("dark");
    localStorage.setItem("rg_darkmode", isDark ? "true" : "false");
    updateDarkIcon();
  }
  function updateDarkIcon(){
    // Show appropriate icon inside button (assumes two icons present and `.hidden` handles visibility)
    const moon = darkToggle.querySelector(".fa-moon");
    const sun = darkToggle.querySelector(".fa-sun");
    if(rootEl.classList.contains("dark")){
      moon.classList.add("hidden");
      sun.classList.remove("hidden");
    } else {
      moon.classList.remove("hidden");
      sun.classList.add("hidden");
    }
  }

  darkToggle.addEventListener("click", toggleDark);
  applyDarkFromStorage();

  // Form validation helpers
  function showErr(id, message){
    const el = document.getElementById(id);
    if(el) el.textContent = message || "";
  }
  function validateEmail(email){
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Modal helpers
  function openModal(){
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closeModal);
  modalOk.addEventListener("click", closeModal);
  modal.addEventListener("click", function(e){
    if(e.target === modal) closeModal();
  });

  // Form submit
  form.addEventListener("submit", function(e){
    e.preventDefault();

    // Clear old errors
    showErr("err-name","");
    showErr("err-email","");
    showErr("err-subject","");
    showErr("err-message","");

    const name = (form.name.value || "").trim();
    const email = (form.email.value || "").trim();
    const phone = (form.phone.value || "").trim();
    const subject = (form.subject.value || "").trim();
    const message = (form.message.value || "").trim();

    let hasErr = false;
    if(name.length < 2){ showErr("err-name","Please enter your name."); hasErr = true; }
    if(!validateEmail(email)){ showErr("err-email","Please enter a valid email."); hasErr = true; }
    if(subject.length < 3){ showErr("err-subject","Please add a subject."); hasErr = true; }
    if(message.length < 6){ showErr("err-message","Message is too short."); hasErr = true; }

    if(hasErr) return;

    // Prepare template params for EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      subject: subject,
      message: message,
      hotel: form.hotel.value || "Royal Grand Hotel"
    };

    // Show a temporary disabled state on submit button
    const submitBtn = form.querySelector(".btn-primary");
    const prevText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    // Send via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function(response){
        // Success
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevText;
        openModal();
      }, function(error){
        // Failure: fallback to showing modal with error message
        console.error("EmailJS error:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevText;
        // Show modal but with different message
        const title = document.getElementById("modalTitle");
        const para = modal.querySelector(".modal-body p");
        title.textContent = "Could not send";
        para.textContent = "There was an issue sending your message. You can call us or try again later.";
        openModal();
      });
  });

  // Small UX: hide errors on input
  ["name","email","subject","message"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener("input", ()=> showErr("err-"+id,""));
  });

  // Optionally: keyboard accessibility for modal (Escape to close)
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && !modal.classList.contains("hidden")){
      closeModal();
    }
  });

  // Optional: detect if user has WhatsApp available (mobile) and adjust button (basic)
  (function adjustWhatsapp(){
    const wa = document.getElementById("whatsappBtn");
    if(!wa) return;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    if(!isMobile){
      // show small text on desktop
      wa.classList.add("desktop");
    }
  })();

})();
