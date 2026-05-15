import { SERVER_URL } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import LocationMap from "../assets/tg_location_map.png";

const TOAST_DURATION = 1500;

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      const response = await axios.post(`${SERVER_URL}/forms/contact`, formData);

      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        e.target.reset();
        setShowSuccess(true);

        // Auto redirect back to form after 4 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again later.", { duration: TOAST_DURATION });
    } finally {
      setIsLoading(false);
    }
  };

  // Success Page Component
  const SuccessPage = () => (
    <>
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fadeIn">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    animation: "checkmark 0.6s ease-in-out 0.3s both",
                    animationName: "checkmark",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ animation: "slideUp 0.6s ease-out 0.5s both" }}
          >
            Thank You!
          </h2>
          <p className="text-lg text-gray-600 mb-6" style={{ animation: "slideUp 0.6s ease-out 0.7s both" }}>
            Your message has been sent successfully. We'll get back to you as soon as possible.
          </p>

          {/* Auto redirect message */}
          <p className="text-sm text-gray-500" style={{ animation: "slideUp 0.6s ease-out 0.9s both" }}>
            Redirecting back to contact form in a few seconds...
          </p>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes checkmark {
          0% { 
            opacity: 0; 
            transform: scale(0.3) rotate(-45deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1) rotate(-10deg); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );

  if (showSuccess) {
    return <SuccessPage />;
  }

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
                onChange={(e) => {
                  // Only allow numeric characters
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    phone: numericValue,
                  }));
                }}
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
                onChange={(e) => {
                  if (e.target.value.length > 500) {
                    toast.error("Keep your message under 500 characters", {
                      duration: TOAST_DURATION,
                    });
                    return;
                  }
                  handleInputChange(e);
                }}
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
