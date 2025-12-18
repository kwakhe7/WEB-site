 // JCI MINING — base interactions
(function() {
  // Highlight current nav link
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path) {
      a.classList.add('active');
    }
  });

  // Simple form handler demo (prevents accidental submit in placeholders)
  const forms = document.querySelectorAll('form[data-demo]');
  forms.forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you! We\'ll get back to you shortly.');
    });
  });

  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitButton = contactForm.querySelector('.button');
    const inputs = contactForm.querySelectorAll('input, textarea');

    // Real-time validation feedback
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
          validateField(this);
        }
      });
    });

    function validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let errorMessage = '';

      if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
      } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        }
      }

      field.classList.toggle('invalid', !isValid);
      field.classList.toggle('valid', isValid && value);

      // Remove existing error message
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      // Add error message if invalid
      if (!isValid && errorMessage) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
        field.parentNode.appendChild(errorElement);
      }

      return isValid;
    }

    function validateForm() {
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });
      return isFormValid;
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
        // Simulate form submission
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate async submission
        setTimeout(() => {
          alert('Thank you for your message! We\'ll get back to you shortly.');
          contactForm.reset();
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            const error = input.parentNode.querySelector('.error-message');
            if (error) error.remove();
          });
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }, 2000);
      } else {
        // Scroll to first invalid field
        const firstInvalid = contactForm.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });
  }

  // Services dropdown: show content pane matching the selected option
  document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('serviceSelect');
    const content = document.getElementById('serviceContent');
    if (select && content) {
      const panes = content.querySelectorAll('[data-service]');
      const show = (key) => {
        panes.forEach((p) => {
          if (p.dataset.service === key) {
            p.style.display = 'block';
            p.classList.add('show');
          } else {
            p.classList.remove('show');
            setTimeout(() => p.style.display = 'none', 300);
          }
        });
      };
      // Initialize with current selection
      show(select.value);
      select.addEventListener('change', (e) => show(e.target.value));
    }

    // Directors dropdown: show content pane matching the selected option
    const directorsSelect = document.getElementById('directorsSelect');
    const directorsContent = document.getElementById('directorsContent');
    if (directorsSelect && directorsContent) {
      const panes = directorsContent.querySelectorAll('[data-director]');
      const show = (key) => {
        panes.forEach((p) => {
          if (p.dataset.director === key) {
            p.style.display = 'block';
            p.classList.add('show');
          } else {
            p.classList.remove('show');
            setTimeout(() => p.style.display = 'none', 300);
          }
        });
      };
      // Initialize with current selection
      show(directorsSelect.value);
      directorsSelect.addEventListener('change', (e) => show(e.target.value));
    }
  });
})();