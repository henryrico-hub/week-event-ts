import { Button } from "antd";
import imgRegister from "src/assets/images/services/register.png";
import imgAnalytics from "src/assets/images/services/analytics2.jpg";
import imgCamera from "src/assets/images/services/camara2.jpg";
import imgCrono from "src/assets/images/services/cronos2.jpg";
import imgSupport from "src/assets/images/services/support2.png";

const Section = ({
  id,
  title,
  image,
  description,
  features,
}: {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
}) => (
  <section id={id} className="mb-10">
    {/* Banner */}
    <div className="p-4"></div>
    <div
      className="relative aspect-[16/9] w-full md:max-h-72 max-h-28  bg-cover bg-center md:rounded-xl shadow-md"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/30 md:rounded-xl flex items-center justify-center">
        <h2 className="text-lg md:text-4xl font-bold text-white uppercase">
          {title}
        </h2>
      </div>
    </div>

    {/* Descripción */}
    <div className="mt-6 px-4 md:px-0">
      <p className="text-lg text-gray-700">{description}</p>
    </div>

    {/* Features */}
    <ul className="mt-4 px-4 md:px-0 list-disc list-inside text-gray-600 space-y-1">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>

    {/* CTA opcional */}
    <div className="mt-6 px-4 md:px-0">
      <Button type="primary" size="large">
        Más información
      </Button>
    </div>
  </section>
);

const Dashboard = () => {
  return (
    <div className="px-0 md:px-16 py-10 space-y-20">
      <Section
        id="signin"
        title="Inscripciones"
        image={imgRegister}
        description="Gestión eficiente de inscripciones para tus eventos con formularios personalizados, seguimiento y control."
        features={[
          "Formularios dinámicos",
          "Validaciones en tiempo real",
          "Control de duplicados",
          "Exportación de datos",
        ]}
      />

      <Section
        id="times"
        title="Tiempos / Cronos"
        image={imgCrono}
        description="Controla y consulta cronometrajes precisos para tus eventos deportivos o concursos."
        features={[
          "Carga de resultados en tiempo real",
          "Compatible con múltiples formatos",
          "Visualización por categoría",
          "Exportación en PDF / Excel",
        ]}
      />

      <Section
        id="photographer"
        title="Fotografía"
        image={imgCamera}
        description="Accede a galerías de imágenes profesionales capturadas durante el evento."
        features={[
          "Galerías por participante o categoría",
          "Filtros inteligentes",
          "Descarga y compra de imágenes",
          "Integración con códigos QR",
        ]}
      />

      <Section
        id="support"
        title="Soporte"
        image={imgSupport}
        description="Te brindamos asistencia personalizada antes, durante y después de tu evento."
        features={[
          "Chat en línea",
          "Base de conocimientos",
          "Soporte por correo y teléfono",
          "Gestión de tickets",
        ]}
      />

      <Section
        id="analytics"
        title="Analíticas"
        image={imgAnalytics}
        description="Obtén información clave sobre participantes, tiempos, asistencia y mucho más."
        features={[
          "Panel de control en tiempo real",
          "Gráficas interactivas",
          "Exportación de reportes",
          "Insights personalizados",
        ]}
      />

      {/* <Section
        id="dashboard"
        title="Dashboard"
        image="https://source.unsplash.com/1600x400/?dashboard,admin"
        description="Administra tu evento desde un panel completo y centralizado."
        features={[
          "Vista general del evento",
          "Accesos rápidos a módulos",
          "Alertas y tareas pendientes",
          "Responsive y fácil de usar",
        ]}
      /> */}
    </div>
  );
};

export default Dashboard;
