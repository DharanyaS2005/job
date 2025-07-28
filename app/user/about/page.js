'use client';
import React from 'react';
import Navbar from '../navbar/Navbar';
import './about.css';

const About = () => {
  return (
    <div>
      <Navbar />
    <div className="about-container">
      <div className="about-left">
        <h1>About Our Job Board</h1>
        <p>
          Welcome to our Internal Job Opening Board – a streamlined platform where employees can explore
          and apply for open positions within the organization. It’s designed to encourage career growth
          and transparency within the company.
        </p>
        <p>
          Our mission is to simplify internal mobility and empower employees with better opportunities aligned with their aspirations.
        </p>
      </div>
      <div className="about-right">
        <img src="/j1.webp" alt="Profile"/>
      </div>
      <footer className="about-footer">
        &copy; 2025 Internal Job Board. All rights reserved.
      </footer>
    </div>
    </div>
  );
};

export default About;
