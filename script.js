/* ============================================================
   JIPRA — configuración de contacto
   Reemplaza estos valores con tus datos reales.
   Formato de WhatsApp: código de país + número, sin signos ni espacios.
   Ejemplo México: 5219991234567 (52 + 1 + 10 dígitos)
   Formato de teléfono: con + y espacios, como quieras que se vea.
============================================================ */
const JIPRA_CONTACT = {
  whatsappNumber: "5219990000000", // TODO: pon tu número real aquí (sin + ni espacios)
  phoneDisplay: "+52 999 000 0000", // TODO: cómo se ve el número en el botón
  phoneNumber: "+529990000000",     // TODO: mismo número, formato para marcar (tel:)
  instagramUser: "jipra.mx",        // TODO: tu usuario de Instagram
  facebookUser: "jipra.mx",         // TODO: tu página de Facebook
  email: "hola@jipra.mx"            // TODO: tu correo real
};

/* ============================================================
   Rellena los botones de contacto y arma los links de WhatsApp
   (tanto el del formulario como el de cada producto del catálogo)
   sin necesidad de backend.
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const whatsappLink = document.getElementById("linkWhatsapp");
  const phoneLink = document.getElementById("linkPhone");
  const phoneLabel = document.getElementById("phoneLabel");
  const instagramLink = document.getElementById("linkInstagram");
  const facebookLink = document.getElementById("linkFacebook");
  const emailLink = document.getElementById("linkEmail");
  const emailLabel = document.getElementById("emailLabel");

  if (whatsappLink) whatsappLink.href = `https://wa.me/${JIPRA_CONTACT.whatsappNumber}`;
  if (phoneLink) phoneLink.href = `tel:${JIPRA_CONTACT.phoneNumber}`;
  if (phoneLabel) phoneLabel.textContent = JIPRA_CONTACT.phoneDisplay;
  if (instagramLink) instagramLink.href = `https://instagram.com/${JIPRA_CONTACT.instagramUser}`;
  if (facebookLink) facebookLink.href = `https://facebook.com/${JIPRA_CONTACT.facebookUser}`;
  if (emailLink) emailLink.href = `mailto:${JIPRA_CONTACT.email}`;
  if (emailLabel) emailLabel.textContent = JIPRA_CONTACT.email;

  // Botones "Cotizar" del catálogo: abren WhatsApp con el producto ya escrito
  document.querySelectorAll(".btn-quote").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const producto = btn.getAttribute("data-product") || "un producto de tu catálogo";
      const texto = `Hola JIPRA! Quiero cotizar: ${producto}`;
      window.open(`https://wa.me/${JIPRA_CONTACT.whatsappNumber}?text=${encodeURIComponent(texto)}`, "_blank");
    });
  });

  // Formulario de contacto: arma un mensaje y abre WhatsApp con todo listo
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const contacto = document.getElementById("email").value.trim();
    const interes = document.getElementById("interes").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const texto =
      `Hola JIPRA! Soy ${nombre}.\n` +
      `Me interesa: ${interes}\n` +
      `${mensaje}\n\n` +
      `Mi contacto: ${contacto}`;

    const url = `https://wa.me/${JIPRA_CONTACT.whatsappNumber}?text=${encodeURIComponent(texto)}`;

    status.textContent = "Abriendo WhatsApp con tu mensaje listo para enviar…";
    window.open(url, "_blank");
    form.reset();
  });
});
