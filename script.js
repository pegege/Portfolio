import emailjs from '@emailjs/browser';

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtén los valores usando los names
    const formData = {
        name: this.elements['name'].value,
        email: this.elements['email'].value,
        message: this.elements['message'].value
    };

    // Validación
    if (!validateForm(formData)) {
        return;
    }

    // Envío con EmailJS
    emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', formData, 'TU_PUBLIC_KEY')
        .then(() => {
            showMessage('¡Mensaje enviado con éxito!', false);
            this.reset(); // Limpia el formulario
        })
        .catch((error) => {
            showMessage('Error al enviar el mensaje', true);
        });
});

function validateForm(formData) {
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Por favor, completa todos los campos', true);
        return false;
    }
    
    if (!isValidEmail(formData.email)) {
        showMessage('Por favor, introduce un email válido', true);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(message, isError = false) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Ejemplo de uso:
showMessage('¡Mensaje enviado con éxito!', false); // Para éxito
showMessage('Error al enviar el mensaje', true); // Para error