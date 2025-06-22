import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to eDoc!"}
        subtitle={"Skip the Wait, See a Doctor Instantly!!"}
        imageUrl={"/hero.png"}
        subtitleStyle={{ fontSize: "2rem", color: "#34495e" }} // Increased subtitle size
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
