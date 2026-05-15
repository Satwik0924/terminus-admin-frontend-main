import { Helmet } from "react-helmet-async";
import ContactDetails from "../components/ContactDetails";
import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Terminus Group | Real Estate Developers in Hyderabad</title>
        <meta
          name="description"
          content="Connect with Terminus Group for residential and commercial property inquiries, project details, partnerships, and customer support in Hyderabad."
        />
        <link rel="canonical" href="https://terminus-group.com/contact" />
      </Helmet>
      <ContactDetails />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Contact;
