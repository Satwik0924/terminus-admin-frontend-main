import React from "react";

const ContactDetails = () => {
  return (
    <section className="max-w-4xl mx-4 pt-16 lg:max-w-4xl lg:mx-11 lg:px-11 lg:pt-16">
      <div className="flex flex-col space-y-4">
        {/* Contact Section */}
        <div className="flex flex-col lg:flex-row lg:items-start text-xl text-black space-y-2 lg:space-y-0">
          <label className="font-bold w-full lg:w-32">Contact</label>
          <p>+91 95548 34567</p>
        </div>

        {/* Address Section */}
        <div className="flex flex-col lg:flex-row lg:items-start text-black text-xl space-y-2 lg:space-y-0">
          <label className="font-bold w-full lg:w-32">Address</label>
          <p>
            25th Floor, ONE WEST Building, Sy. No.88/AA, 88/E,
            <br /> Nanakramguda, Hyderabad, Telangana-500008
          </p>
        </div>

        {/* Email Section */}
        <div className="flex flex-col lg:flex-row lg:items-center text-xl text-black space-y-2 lg:space-y-0">
          <label className="font-bold w-full lg:w-32">Email</label>
          <p className="text-foreground">info@terminus-global.com</p>
        </div>

        {/* Message Section */}
        <div className="flex flex-col lg:flex-row">
          <label className="font-bold text-black w-full lg:w-32"></label>
          <p className="text-black text-xl space-y-6">
            We are always on the look-
            <br />
            out for talent to add to our growing, dynamic team. Please click
            <br /> on the link below to view and apply for open positions.
            <br />
            <a
              href="https://docs.google.com/forms/d/1qss7Ji8uhSV_3U47Or-Y9z7Ny1P5oFi-7ImtmiheV6o/edit"
              className="text-foreground font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              For Careers at Terminus, <strong>apply here</strong>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
