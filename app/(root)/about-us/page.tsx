import Image from "next/image";

const AboutUs = () => {
  const sections = [
    {
      title: "Welcome to Shree Ram Solar",
      description:
        "At Shree Ram Solar, we are passionate about delivering sustainable energy solutions. We began our journey with a mission to revolutionize the renewable energy landscape and make clean, efficient solar power accessible to all.",
      image: "/image.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Our Mission",
      description:
        "Empowering businesses and individuals through high-quality, cost-effective, and sustainable solar energy solutions. Our mission is to make renewable energy a practical and reliable option for everyone.",
      image: "/images/c.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Our Values",
      description:
        "Integrity, innovation, customer focus, and sustainability are at the heart of everything we do. We strive to deliver products that are environmentally friendly and efficient, while maintaining the highest standards of customer service.",
      image: "/images/b.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Meet Our Team",
      description:
        "Our team of experts works tirelessly to ensure we provide the best solar energy solutions. From design to installation and support, we have a dedicated team of professionals ready to assist you.",
      image: "/team.jpg", // Replace with your image path
      backgroundColor: "bg-black text-white",
    },
    {
      title: "Contact Us",
      description:
        "We'd love to hear from you! Have questions or want to know more about our solar solutions? Reach out to us at Yugmodi284@gmail.com or call us at +91-9509348632.",
      image: "/contact.png", // Replace with your image path
      backgroundColor: "bg-white",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center justify-center h-screen snap-start p-6 lg:p-20 ${section.backgroundColor} gap-12`} // Added gap between elements
          >
            {/* Text Section */}
            <div className={`lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0 flex flex-col justify-center ${index % 2 === 0 ? "order-1" : "order-2"}`}>
              <h2 className="text-heading1-bold font-extrabold mb-6 text-blue-600">{section.title}</h2>
              <p className="text-body-medium text-gray-700 leading-relaxed">{section.description}</p> {/* Added leading-relaxed for line spacing */}
            </div>

            {/* Image Section */}
            <div className={`lg:w-1/2 ${index % 2 === 0 ? "order-2" : "order-1"}`}>
              <Image
                src={section.image}
                alt={section.title}
                width={400}
                height={300}
                className="rounded-lg shadow-lg mx-auto" // Image centered horizontally
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-4xl font-medium mb-4">© 2024 Shree Ram Solar. All Rights Reserved.</p>
        <p className="text-xl">
          Follow us on{" "}
          <a href="https://www.twitter.com" className="text-blue-400 hover:underline">
            Twitter
          </a>,{" "}
          <a href="https://www.instagram.com" className="text-pink-400 hover:underline">
            Instagram
          </a>, and{" "}
          <a href="https://www.linkedin.com" className="text-blue-600 hover:underline">
            LinkedIn
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
