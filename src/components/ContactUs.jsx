import React from "react";
import LocationMap from "../assets/tg_location_map.png";

const TIMER = 2 * 1000;

const ContactSection = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const mimicFormSubmission = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve, _reject) => {
      setTimeout(resolve, TIMER);
    });
    alert("Message sent successfully");
    setIsLoading(false);
  };

  return (
    <section className="flex py-20 w-full items-center justify-center overflow-hidden">
      {/* Map Section */}
      <div className="w-[95%] flex gap-6 max-lg:flex-col">
        <div className="flex-[2]">
          <a
            href="https://maps.app.goo.gl/X9Q7WH8rPPXoWKqt5?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LocationMap} alt="Map" className="w-full h-full object-fill max-lg:min-h-64" />
          </a>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <form className="h-full" onSubmit={mimicFormSubmission}>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg outline-none"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-foreground w-full text-white py-3 px-6 cursor-pointer text-xl font-medium"
            >
              {isLoading ? "Sending..." : "Get In Touch"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
