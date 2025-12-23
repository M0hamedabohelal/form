document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');

    // Real-time validation on blur
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        // Clear error on input
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            simulateSubmission();
        }
    });

    function validateInput(input) {
        const value = input.value.trim();
        const wrapper = input.closest('.input-wrapper') || input.closest('.checkbox-group');
        let errorMessage = '';

        // Skip if radio (handled by group usually, or just required check native)
        if (input.type === 'radio') return true;

        if (input.required && !value && input.type !== 'checkbox') {
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email';
            }
        } else if (input.type === 'password' && value) {
            if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters';
            }
        } else if (input.type === 'checkbox' && input.required && !input.checked) {
            errorMessage = 'You must agree to the terms';
        }

        if (errorMessage) {
            setError(input, errorMessage, wrapper);
            return false;
        } else {
            setSuccess(input, wrapper);
            return true;
        }
    }

    function setError(input, message, wrapper) {
        if (wrapper) {
            wrapper.classList.add('error');
            // Find sibling error message span
            const parent = wrapper.parentElement;
            const errorSpan = parent.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = message;
        }
    }

    function setSuccess(input, wrapper) {
        if (wrapper) {
            wrapper.classList.remove('error');
            // Remove text
            const parent = wrapper.parentElement;
            const errorSpan = parent.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = '';
        }
    }

    function clearError(input) {
        const wrapper = input.closest('.input-wrapper') || input.closest('.checkbox-group');
        if (wrapper) wrapper.classList.remove('error');
    }

    function simulateSubmission() {
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<span>Creating...</span>';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = '<span>Success! 🎉</span>';
            btn.style.background = 'var(--success-color)';

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.style.background = ''; // revert to gradient
                btn.style.opacity = '1';
                alert('Account created successfully!');
            }, 2000);
        }, 1500);
    }
});
