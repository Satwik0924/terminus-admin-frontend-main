import React from "react";

const ContactDetails = () => {
  return (
    <section className="max-w-4xl mx-11 px-11 pt-16">
      <div className="flex flex-col space-y-4">
        {/* Contact Section */}
        <div className="flex items-start text-xl text-black">
          <label className="font-bold w-32">Contact</label>
          <p>+91 95548 34567</p>
        </div>

        {/* Address Section */}
        <div className="flex items-start text-black text-xl">
          <label className="font-bold w-32">Address</label>
          <p>
            25th Floor, ONE WEST Building, Sy. No.88/AA, 88/E,<br></br> Nanakramguda, Hyderabad, Telangana-500008
          </p>
        </div>

        {/* Email Section */}
        <div className="flex items-center text-xl text-black">
          <label className="font-bold w-32">Email</label>
          <p className="text-foreground">info@terminus-global.com</p>
        </div>

        {/* Message Section */}
        <div className="flex items-center">
          <label className="font-bold text-black w-32"></label>
          <p className="text-black text-xl space-y-6">
            We are always on the look-<br></br>out for talent to add to our growing, dynamic team. Please click<br></br>{" "}
            on the link below to view and apply for open positions.<br></br>
            <a
              href="https://careers.terminus-global.com"
              className="text-foreground font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Careers at Terminus
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
