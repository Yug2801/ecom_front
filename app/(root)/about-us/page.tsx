import Image from "next/image";

const AboutUs = () => {
  const sections = [
    {
      title: "Welcome to Our Company",
      description:
        "We are passionate about delivering exceptional products and services to our customers. Our journey began with a mission to revolutionize the way businesses and customers connect.",
      image: "/images/a.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Our Mission",
      description:
        "Empowering individuals and businesses by offering high-quality, sustainable, and cutting-edge solutions that enhance their lives and operations.",
      image: "/images/c.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Our Values",
      description:
        "Integrity, innovation, customer focus, and sustainability are the core values driving everything we do.",
      image: "/images/b.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
    {
      title: "Meet Our Team",
      description:
        "Our dedicated team of experts works tirelessly to ensure we deliver on our promises. From development to customer support, every member plays a vital role in our success.",
      image: "/images/b.jpg", // Replace with your image path
      backgroundColor: "bg-black text-white",
    },
    {
      title: "Contact Us",
      description:
        "Have questions? Reach out to us at Yugmodi284@gmail.com or call us at +91-9509348632.",
      image: "/images/c.jpg", // Replace with your image path
      backgroundColor: "bg-white",
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-4xl font-medium mb-4">© 2024 Your Company. All Rights Reserved.</p>
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
