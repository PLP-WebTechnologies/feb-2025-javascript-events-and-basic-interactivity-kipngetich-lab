document.addEventListener('DOMContentLoaded', () => {
            // --- Get DOM Elements ---
    const clickBtn = document.getElementById('clickBtn');
    const hoverDiv = document.getElementById('hoverDiv');
    const keypressInput = document.getElementById('keypressInput');
    const secretDiv = document.getElementById('secretDiv');
    const eventOutput = document.getElementById('eventOutput');

    const colorChangeBtn = document.getElementById('colorChangeBtn');

    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const myForm = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formFeedback = document.getElementById('formFeedback');

            // --- 1. Event Handling 🎈 ---
            // Button click
    clickBtn.addEventListener('click', () => {
        eventOutput.textContent = 'Button clicked! 🎉';
    });

            // Hover effects
    hoverDiv.addEventListener('mouseover', () => {
        eventOutput.textContent = 'Mouse hovered over the div! ✨';
        hoverDiv.style.backgroundColor = 'deepskyblue';
    });
    hoverDiv.addEventListener('mouseout', () => {
        eventOutput.textContent = 'Mouse left the div. 👋';
        hoverDiv.style.backgroundColor = 'lightblue';
    });

            // Keypress detection
    keypressInput.addEventListener('keyup', (event) => {
        eventOutput.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
    });

            // Bonus: Secret action for double-click or long press
    secretDiv.addEventListener('dblclick', () => {
        eventOutput.textContent = 'SECRET: Double-click activated! 🤫💥';
        secretDiv.style.backgroundColor = 'gold';
        setTimeout(() => secretDiv.style.backgroundColor = 'lightcoral', 1000);
    });

        let pressTimer;
        secretDiv.addEventListener('mousedown', () => {
            pressTimer = window.setTimeout(() => {
            eventOutput.textContent = 'SECRET: Long press activated! 🤫⏳';
            secretDiv.style.backgroundColor = 'darkorange';
        }, 1000); // 1 second for long press
            });
        secretDiv.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
            // Reset color if it was changed by long press only
            if (secretDiv.style.backgroundColor === 'darkorange') {
                setTimeout(() => secretDiv.style.backgroundColor = 'lightcoral', 500);
            }
        });
        secretDiv.addEventListener('mouseleave', () => { // Also clear if mouse leaves
            clearTimeout(pressTimer);
        });


            // --- 2. Interactive Elements 🎮 ---
            // A button that changes text or color
            let isColorChanged = false;
            colorChangeBtn.addEventListener('click', () => {
                isColorChanged = !isColorChanged;
                if (isColorChanged) {
                    colorChangeBtn.textContent = 'Changed! Click to Revert';
                    colorChangeBtn.classList.add('active'); // Uses CSS class for color
                } else {
                    colorChangeBtn.textContent = 'Click to Change Me';
                    colorChangeBtn.classList.remove('active');
                }
            });

            // An image gallery or slideshow
    const images = [
        'images/pizza.jpg',
        'images/pizza-drink.jpg',
        'images/potato-chips.jpg',
        'images/chocolate_cake.jpg',
		'images/vanilla_cake.jpg',
		'images/sweet_cake.jpg',
		'images/velvet.jpg'
    ];
        let currentImageIndex = 0;

        function showImage(index) {
            galleryImage.src = images[index];
            // JS animation bonus: could add a class for fade-in/out
            galleryImage.style.opacity = 0.5;
            setTimeout(() => galleryImage.style.opacity = 1, 150);
        }

        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });
            // Initialize gallery
		showImage(currentImageIndex); 

            // Tabs or accordion-style content
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
        // Deactivate all tabs and hide content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));

            // Activate clicked tab and show its content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.remove('hidden');
        });
    });

            // --- 3. Form Validation 📋 ---
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            return false;
        }
            nameError.textContent = '';
            return true;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
                return false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email format (e.g., user@example.com).';
                return false;
        }
            emailError.textContent = '';
                return true;
    }

    function validatePassword() {
        if (passwordInput.value === '') { // Check for empty first for better UX
            passwordError.textContent = 'Password is required.';
                return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
                return false;
        }
            passwordError.textContent = '';
                return true;
    }

            // Bonus: Real-time feedback while typing
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

                // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPasswordValid) {
            formFeedback.textContent = 'Form submitted successfully! ✅ (Data would be sent here)';
                formFeedback.style.color = 'green';
                myForm.reset(); // Clear the form
                    // Clear real-time error messages that might persist if user fixed and submitted fast
                nameError.textContent = '';
                emailError.textContent = '';
                passwordError.textContent = '';
        } else {
                formFeedback.textContent = 'Please correct the errors above. ❌';
                formFeedback.style.color = 'red';
        }
    });
});