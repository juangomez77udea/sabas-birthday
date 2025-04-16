import emailjs from '@emailjs/browser';

// Inicializa EmailJS con tu User ID público
// Encuentra este ID en la sección Account > API Keys de tu cuenta EmailJS
emailjs.init("-OsygP1HpxgWAYGK2");

export const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      'service_qudjnlr',     // ID del servicio que creaste en el paso 2
      'template_9ox6nf3',    // ID de la plantilla que creaste en el paso 3
      templateParams       // Parámetros que pasas desde el componente
    );
    
    console.log('Email enviado correctamente:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
};