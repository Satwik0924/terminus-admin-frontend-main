import React from "react";
import LocationMap from "../assets/tg_location_map.webp";

const ContactSection = () => {
  return (
    <section className="flex py-20 w-full items-center justify-center overflow-hidden">
      {/* Map Section */}
      <div className="w-[95%] flex gap-6 max-lg:flex-col">
        <div className="flex-[2]">
          <img
            src={LocationMap} // Replace this with the actual map image or embed
            alt="Map"
            className="w-full h-full object-fill max-lg:min-h-64"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 px-2">
          <form className="h-full">
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium placeholder:text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-foreground w-full text-white py-3 px-6 cursor-pointer text-xl font-medium"
            >
              Get In Touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
