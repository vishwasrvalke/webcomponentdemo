import React, { useState } from "react";
import "./App.css";
import CustomButton from "./CustomButton";

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleAsyncClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Web Component Demo</h1>
        <p>This React app is using our custom web component button!</p>

        <div className="button-section">
          <h2>Button Variants</h2>
          <div className="button-group">
            <CustomButton variant="primary" onClick={handleClick}>
              Primary Button
            </CustomButton>
            <CustomButton variant="secondary" onClick={handleClick}>
              Secondary Button
            </CustomButton>
            <CustomButton variant="danger" onClick={handleClick}>
              Danger Button
            </CustomButton>
          </div>
        </div>

        <div className="button-section">
          <h2>Button Sizes</h2>
          <div className="button-group">
            <CustomButton size="small" onClick={handleClick}>
              Small
            </CustomButton>
            <CustomButton size="medium" onClick={handleClick}>
              Medium
            </CustomButton>
            <CustomButton size="large" onClick={handleClick}>
              Large
            </CustomButton>
          </div>
        </div>

        <div className="button-section">
          <h2>Button States</h2>
          <div className="button-group">
            <CustomButton disabled>Disabled</CustomButton>
            <CustomButton loading={loading} onClick={handleAsyncClick}>
              {loading ? "Loading..." : "Async Action"}
            </CustomButton>
          </div>
        </div>

        <div className="counter">
          <h2>Click Counter: {clickCount}</h2>
        </div>
      </header>
    </div>
  );
}

export default App;
