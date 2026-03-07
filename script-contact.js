
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

// Animation Function
function triggerLeafDrop() {
    const leaf = document.querySelector('.leaf-icon');
    if (leaf) {
        leaf.style.transition = "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s";
        leaf.style.transform = "translateY(150px) translateX(20px) rotate(120deg)";
        leaf.style.opacity = "0";
    }

    setTimeout(() => {
        //if (contactForm) contactForm.style.display = 'none';
        if (statusMsg) {
            statusMsg.classList.remove('hidden');
            statusMsg.style.display = 'block'; // Ensure it's visible
        }
    }, 900);
}

function triggerStatusMsg() {
    if (statusMsg){
        statusMsg.classList.add('visible');
    }
}

// The Form Event Listener
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Start the leaf animation immediately for tactile feedback
    triggerLeafDrop(); 
    // Fade in the statusMsg
    triggerStatusMsg();

    const formData = new FormData(contactForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      // SUCCESS: The leaf landed safely
      formStatus.textContent = "Your leaf has landed safely in the studio inbox. I'll reach out soon.";
      formStatus.classList.remove('hidden');
      // Manually clear the inputs so the form stays visible but empty
        contactForm.reset();
});
    })
    .catch((error) => {
      // ERROR: The wind caught it
      formStatus.textContent = "The wind must have caught that leaf. Please try again in a bit.";
      formStatus.classList.remove('hidden');
    });
  }