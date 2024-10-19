import React from 'react';
import './MeetOurTeam.css';
import teamMember1 from '../../assets/images/team1.jpg'; // Replace with actual image path
import teamMember2 from '../../assets/images/team2.jpg'; // Replace with actual image path
import teamMember3 from '../../assets/images/team3.jpg'; // Replace with actual image path

const MeetOurTeam = () => {
  return (
    <section className="meet-our-team">
      <h2>Meet our team</h2>
      <div className="team-grid">
        <div className="team-card">
          <img src={teamMember1} alt="Mir Allahyar" />
          <h3>Mir Allahyar</h3>
          <p>MD</p>
        </div>
        <div className="team-card">
          <img src={teamMember2} alt="Touqeer Shah" />
          <h3>Touqeer Shah</h3>
          <p>CEO</p>
        </div>
        <div className="team-card">
          <img src={teamMember3} alt="Haider" />
          <h3>Haider</h3>
          <p>Plumber</p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
