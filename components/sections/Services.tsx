const Services = () => {
  const services = [
    {
      title: "Yoga Vinyasa",
      description: "Un style dynamique qui synchronise le mouvement avec la respiration, idéal pour développer force et souplesse.",
      image: "https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg"
    },
    {
      title: "Yoga Restauratif",
      description: "Des postures douces maintenues plus longtemps, parfaites pour la récupération et la relaxation profonde.",
      image: "https://images.pexels.com/photos/6698615/pexels-photo-6698615.jpeg"
    },
    {
      title: "Méditation",
      description: "Des séances guidées pour apaiser l'esprit et développer la pleine conscience au quotidien.",
      image: "https://images.pexels.com/photos/8436589/pexels-photo-8436589.jpeg"
    }
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-sage text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-sage mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;