import React from "react";

const ContactDetails = () => {
  return (
    <section className="max-w-4xl mx-11 px-11">
      <div className="flex flex-col space-y-4">
        {/* Contact Section */}
        <div className="flex items-center">
          <label className="font-bold text-lg text-black w-32">Contact</label>
          <p className="text-black">+91 95548 34567</p>
        </div>

        {/* Address Section */}
        <div className="flex items-center">
          <label className="font-bold text-lg text-black w-32">Address</label>
          <p className="text-black">
            25th Floor, ONE WEST Building, Sy. No.88/AA, 88/E,<br></br> Nanakramguda, Hyderabad, Telangana-500008
          </p>
        </div>

        {/* Email Section */}
        <div className="flex items-center">
          <label className="font-bold text-lg text-black w-32">Email</label>
          <p className="text-black">info@terminus-global.com</p>
        </div>

        {/* Message Section */}
        <div className="flex items-center ">
          <label className="font-bold text-lg text-black w-32"></label>
          <p className="text-black">
            We are always on the look<br></br>out for talent to add to our growing, dynamic team. Please click<br></br>{" "}
            on the link below to view and apply for open positions.<br></br>
            <a
              href="https://careers.terminus-global.com"
              className="text-blue-600 hover:underline"
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
