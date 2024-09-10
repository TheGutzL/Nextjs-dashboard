import { AccordionFaqs } from "./components/AccordionFaqs";

const PageFaqs = () => {
  return (
    <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-6">
      <h2 className="mb-8 text-3xl">FAQS</h2>
      <div className="mb-5">
        <p>
          Bienvenido a nuestra sección de Preguntas Frecuentes (FAQ) diseñada
          especificamente para brindarte respuestas rápidas y claras sobre el
          dashboard para empresas que hemos desarrollado con pasión y dedicación
        </p>
        <p>
          Si tienes alguna pregunta que no esté respondida en esta sección,
          porfavor no dudes en contactarnos a través de nuestro correo
          electrónico
        </p>
        <p>
          Nuestro equipo se ha esforzado por proporcionar respuestas detalladas
          y fáciles de entender para garantizar que encuentres la información
          que necesitas de manera rápida y sencilla en todo momento.
        </p>
        <p>Gracias por confiar en nosotros y por ser parte de nuestra</p>
      </div>

      <AccordionFaqs />
    </div>
  );
};

export default PageFaqs;
