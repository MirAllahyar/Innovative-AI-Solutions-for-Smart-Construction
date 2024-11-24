// MeetOurTeam.jsx
import React from 'react';
import './MeetOurTeam.css';
import teamMember1 from '../../assets/images/mir.jpg'; 
import teamMember2 from '../../assets/images/touqeer1.jpg';
import teamMember3 from '../../assets/images/haider.jpg'; 

const MeetOurTeam = () => {
  return (
    <section className="meet-our-team">
      <h2>Meet our team</h2>
      <div className="team-grid">
        <div className="team-card">
          <img src={teamMember1} alt="Mir Allahyar" />
          <h3>Mir Allahyar</h3>
          <p>Project Manager</p>
        </div>
        <div className="team-card">
          <img src={teamMember2} alt="Touqeer Shah" />
          <h3>Touqeer Shah</h3>
          <p>Web Developer</p>
        </div>
        <div className="team-card">
          <img src={teamMember3} alt="Haider" />
          <h3>Haider</h3>
          <p>UI/UX Designer</p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
