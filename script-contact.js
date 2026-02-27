// 1. Grab our elements
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

// 2. Define the Animation Function FIRST (so it's ready to be called)
function triggerLeafDrop() {
    const leaf = document.querySelector('.leaf-icon');
    if (leaf) {
        leaf.style.transition = "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s";
        leaf.style.transform = "translateY(150px) translateX(20px) rotate(120deg)";
        leaf.style.opacity = "0";
    }

    setTimeout(() => {
        if (contactForm) contactForm.style.display = 'none';
        if (statusMsg) {
            statusMsg.classList.remove('hidden');
            statusMsg.style.display = 'block'; // Ensure it's visible
        }
    }, 900);
}

// 3. The Event Listener (with a Guard Clause)
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);

        // Netlify needs an extra hidden field to know which form is which
        // If you didn't add the 'data-netlify="true"' to your HTML, do that first!
        
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then((response) => {
            if (response.ok) {
                triggerLeafDrop();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((error) => {
            alert("The wind caught that leaf! Please try again or email me directly.");
        });
    });
}