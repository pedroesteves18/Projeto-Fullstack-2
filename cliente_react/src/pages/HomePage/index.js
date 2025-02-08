import { useEffect } from 'react';

import "./HomePage.css"

const HomePage = () => {
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch("/api");
        const body = await response.json();

        console.log("Succesfully called API \"/api\" endpoint", { body })

        return body
      } catch (error) {
        return console.log("Error calling API \"/api\" endpoint")
      }
    };

    callApi()
  }, [])

  return (
    <div className="container">
      <h1>Olá da HomePage</h1>
    </div>
  );
}

export default HomePage;
