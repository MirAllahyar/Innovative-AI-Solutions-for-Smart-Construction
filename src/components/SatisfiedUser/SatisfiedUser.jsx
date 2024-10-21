import React from 'react';
import './SatisfiedUser.css';
import img1 from '../../assets/images/team1.jpg'; // Replace with your image path
import img2 from '../../assets/images/team2.jpg'; // Replace with your image path
import img3 from '../../assets/images/team3.jpg'; // Replace with your image path
const SatisfiedUser = () => {
  return (
    <section className="satisfied-users">
      <h2>From Our Satisfied Users</h2>
      <div className="testimonial-grid">
        <div className="testimonial-card">
          <img src={img3} alt="User testimonial" />
          <p>
          Smart Construction has transformed the way I design homes! The front elevation generator is a game-changer, allowing me to visualize and present ideas to clients instantly. The cost calculation tool helps me stay on budget, and the bidding feature makes finding contractors so easy!
          </p>
          <h4>- Sophie </h4>
        </div>
        <div className="testimonial-card">
          <img src={img1} alt="User testimonial" />
          <p>
          I used Smart Construction to find a service provider for my home renovation, and the process was seamless. The community chat allowed me to connect with others going through similar projects, and the contractor bidding feature helped me get the best deal.
          </p>
          <h4>- Milcheur Law</h4>
        </div>
        <div className="testimonial-card">
          <img src={img2} alt="User testimonial" />
          <p>
          As a contractor, Smart Construction has streamlined my communication with clients and stakeholders. The platform makes bidding on projects a breeze, and the ability to network through the community chat has helped me grow my business. Highly recommended
          </p>
          <h4>- Mark R., Contractor</h4>
        </div>
      </div>
    </section>
  );
};

export default SatisfiedUser;
