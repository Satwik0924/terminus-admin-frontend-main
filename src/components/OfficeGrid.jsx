import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfficeComponent = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get('https://your-backend-endpoint.com/team')
      .then((response) => {
        setTeamData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Sticky Side Text */}
      <div
        style={{
          flex: '1',
          position: 'sticky',
          top: '20px',
          alignSelf: 'flex-start',
          paddingRight: '20px',
        }}
      >
        <ul style={{ listStyleType: 'none', paddingLeft: '120px', fontSize: '20px', lineHeight: '2' }}>
          <li>Team</li>
          <li>Philanthropy</li>
          <li>News & Media</li>
          <li>Consultants & Partners</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: '3', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Top Section */}
        <div style={{ textAlign: 'left' }}>
          <img
            src="https://c-p.rmcdn1.net/6704dad37ea051caab873de5/5089501/Image-6f2f2b02-4bf3-40e7-b6ba-f6a5ddfcafc7.gif"
            alt="Office Scene"
            style={{ width: '80%', height: 'auto', borderRadius: '8px', paddingLeft: '30px' }}
          />
          <h1 style={{ fontWeight: '300', fontSize: '48px', margin: '40px 0' }}>The Finest.</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            Featuring an established track record of creating luxury, retail,<br /> and corporate properties by partnering
            with experts in the<br />
            engineering and architecture industry.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            Over a decade of delivering projects that are at the forefront of modern design, every time setting a
            benchmark in Hyderabad.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Hear from our Founder Chairman</p>
        </div>

        {/* Team Section */}
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontWeight: '300', fontSize: '36px', margin: '10px 0' }}>The Team</h2>
          <img
            src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-82fc00d4-be74-4e76-887a-d79cdf4ee721.jpg"
            alt="The Team"
            style={{ width: '60%', height: 'auto', margin: '20px 0', borderRadius: '8px', paddingLeft: '30px', }}
          />
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '20px' }}>
            We believe that you can achieve the best product if you have the best people in your team.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            We have a diverse team from all fields of expertise in engineering, design, and management.
          </p>
        </div>

        {/* Dynamic Leadership and Marketing Section */}
        <div>
          {teamData.length > 0 ? (
            <>
              {/* Leadership Section */}
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: 'orange', marginBottom: '20px' }}>
                  Leadership
                </h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {teamData
                    .filter((member) => member.department === 'Leadership')
                    .map((member) => (
                      <div key={member.id} style={{ width: '200px', textAlign: 'center' }}>
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{member.name}</p>
                        <p>{member.role}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Marketing Section */}
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: 'lightgray', marginBottom: '20px' }}>
                  Marketing
                </h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {teamData
                    .filter((member) => member.department === 'Marketing')
                    .map((member) => (
                      <div key={member.id} style={{ width: '200px', textAlign: 'center' }}>
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{member.name}</p>
                        <p>{member.role}</p>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <p>Loading team data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeComponent;
