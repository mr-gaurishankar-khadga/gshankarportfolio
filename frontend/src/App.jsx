import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import "./App.css";

import myimage from './components/myimage.png'

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Add state to track if initial animation is complete
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);

  useEffect(() => {
    // Handle loading screen with a smoother timing
    setTimeout(() => {
      setIsLoading(false);
      
      // Set initialAnimComplete after a short delay to allow loading transition to complete
      setTimeout(() => {
        setInitialAnimComplete(true);
      }, 600);
    }, 500);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observer all sections after the DOM is loaded
    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        observer.observe(section);
      });
    }, 1000);
    
    return () => {
      // Cleanup observer on component unmount
      observer.disconnect();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`app-container ${!isLoading ? 'loaded' : ''}`}>
      <Navbar />
      <main className="main-content" style={{margin:'0',padding:'0'}}>
       
        <section id="home" style={{marginLeft:'0',padding:''}}>
          <Home/>
        </section>
        <section id="about">
          <About/>
        </section>

        <section id="skill">
          <Skills/>
        </section>

        <section id="projects">
          <Projects/>
        </section>

        <section id="contact">
          <Contact/>
        </section>

      </main>
    </div>
  );
};

export default App;