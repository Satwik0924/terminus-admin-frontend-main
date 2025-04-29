import { Helmet } from "react-helmet-async";
import ContactDetails from "../components/ContactDetails";
import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Terminus Group | Get in Touch with Our Team</title>
        <meta
          name="description"
          content="For further inquiries about us, feel free to get in touch. Contact: +91 95548 34567"
        />
      </Helmet>
      <ContactDetails />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Contact;
