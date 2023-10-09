    //googlesheet 
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz1fzGr4UONVf8dpbNXMhuEI80thX--d30RjWbkgCvqt-mKmyE7l-BrPuMR7AGdPwg1/exec';
    const form = document.forms['contact-form'];
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Add your form validation logic here
      if (!validateForm()) {
        console.error('Form validation failed.');
        return;
      }
    
      fetch(scriptURL, { method: 'Post', body: new FormData(form) })
        .then((response) => {
          if (response.ok) {
            alert('Thank you! Your form is submitted successfully.');
            window.location.reload();
          } else {
            console.error('Error! HTTP status:', response.status);
          }
        })
        .catch((error) => console.error('Error!', error.message));
    });
    
    // Function to validate the form
    function validateForm() {
      let isValid = true;
    
      // Add your validation logic here
      // Example: Check if required fields are filled correctly
      const nameInput = form.querySelector('input[name="your-name"]');
      if (nameInput.value.trim() === '') {
        alert('Please fill in your name.');
        isValid = false;
      }
    
      const emailInput = form.querySelector('input[name="your-email"]');
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(emailInput.value)) {
        alert('Invalid email format.');
        isValid = false;
      }

      // Validation for Phone
    const phoneInput = form.querySelector('input[name="your-number"]');
    const phoneError = document.getElementById('phone-error');
    const phonePattern = /^\d{10}$/; // Change this pattern to match your phone number format
    if (!phonePattern.test(phoneInput.value)) {
      phoneError.textContent = 'Invalid phone number';
      isValid = false;
    } else {
      phoneError.textContent = '';
    }

    // Validation for Message
    const messageInput = form.querySelector('textarea[name="message"]');
    const messageError = document.getElementById('message-error');
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Message is required';
      isValid = false;
    } else {
      messageError.textContent = '';
    }
      return isValid;
    }
    
    
    
    
    