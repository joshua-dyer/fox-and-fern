        function openModal(element) {
            const modal = document.getElementById("artModal");
            const modalImg = document.getElementById("modalImg");
            const modalText = document.getElementById("modalText");
            
            // Get the base name from the data-img-name attribute
            const imgName = element.getAttribute("data-img-name");
            const titleAndDesc = element.querySelector(".hidden-desc").innerHTML;
            
            // Define the paths to use.  First the thumb will load.  After the higher-res modal_ images loads, we will swap
            const thumbPath = `./images/thumbs/${imgName}.jpg`;
            const fullPath = `./images/gallery/mid-res/mid-${imgName}.jpg`;
            
            // Set up the initial view for the modal
            modalImg.classList.remove('loaded');    // Reset for the next image the modal might use
            modalText.innerHTML = titleAndDesc;
            modalImg.src = thumbPath; // Already cached, should load instantly
            
            const highRes = new Image();
            highRes.src = fullPath;

            // after highRes is loaded, swap the thumb for the highRes image
            highRes.onload = function(){
                modalImg.src = fullPath;
                modalImg.classList.add('loaded'); // Triggers CSS fade-in animation
            }

            // Show the modal
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // halts scrolling main page while modal is open

            // Restart the animation for the content
            const content = modal.querySelector('.modal-content');
            content.style.animation = 'none';
            content.offsetHeight;                   // Trigger a 'reflow' - this is a magic trick to restart CSS animations
            content.style.animation = null;

        }

        function closeModal() {
            const modal = document.getElementById("artModal");
            modal.style.display = "none";
            // Restore background scrolling
            document.body.style.overflow = "auto";
        }

        // Close modal if user hits the 'Esc' key
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape") {
                closeModal();
            }
        });


/**
 * Preload image helper function to assist
 * with slower connections.
 */
function preloadImage(element) {
    const imgName = element.getAttribute("data-img-name");
    const midResPath = `./images/gallery/mid-res/mid-${imgName}.jpg`;
    // Create a "ghost" image to start the download early
    const img = new Image();
    img.src = midResPath;
}


        // First loading fox icon animation
document.addEventListener("DOMContentLoaded", function() {
    const foxIcon = document.getElementById("ff-logo");
    // Check if the fox has already 'landed' this session
    const hasLanded = sessionStorage.getItem("foxLanded");

    if (!hasLanded) {
        console.log("The Fox is landing now..."); // THIS WILL APPEAR IN THE 'CONSOLE' TAB
        foxIcon.classList.add("fox-landing-anim");
        sessionStorage.setItem("foxLanded", "true");

        // Wait for the delay (1.2s) + animation (1.2s) + a small buffer
        setTimeout(() => {
            foxIcon.classList.remove("fox-landing-anim");
            // Ensure opacity stays 1 after the class is removed
            foxIcon.style.opacity = "1"; 
        }, 2600);
    } else {
    console.log("Fox has already landed. Standing still.");
    }
});