import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import LocationMap from "../assets/tg_location_map.png";

const TOAST_DURATION = 1500;

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://api.terminus-group.com/forms/contact", formData);

      if (response.status === 201) {
        toast.success(
          "Message sent successfully. Thank you for contacting us. We will get back to you as soon as possible.",
          {
            duration: TOAST_DURATION,
          }
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again later.", { duration: TOAST_DURATION });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex py-20 w-full items-center justify-center overflow-hidden">
      {/* Map Section */}
      <div className="w-[90%] flex gap-6 max-lg:flex-col">
        <div className="flex-[2]">
          <a
            href="https://maps.app.goo.gl/X9Q7WH8rPPXoWKqt5?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LocationMap} alt="Map" className="w-full h-full lg:object-fill object-contain" />
          </a>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <form className="h-full" onSubmit={formSubmission}>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                value={formData.phone}
                onChange={handleInputChange}
                pattern="[0-9]+"
                title="Please enter a valid phone number (numbers only)"
                maxLength={10}
                minLength={10}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary-foreground w-full text-white py-3 px-6 cursor-pointer sm:text-lg text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
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
