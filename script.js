        function openModal(element) {
            const modal = document.getElementById("artModal");
            const modalImg = document.getElementById("modalImg");
            const modalText = document.getElementById("modalText");
            
            // Extract the image source and the hidden text from the clicked div
            const imgSrc = element.getAttribute("data-full");
            const titleAndDesc = element.querySelector(".hidden-desc").innerHTML;
            
            modalImg.classList.remove('loaded');    // Reset for the next image the modal might use
            modalImg.onload = function(){
                modalImg.classList.add('loaded');   // Fade in will begin AFTER image is actually loaded
            }

            modalImg.src = imgSrc;
            modalText.innerHTML = titleAndDesc;
            
            // Show the Modal
            modal.style.display = "flex";
            // Prevent background scrolling while modal is open
            document.body.style.overflow = "hidden";

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