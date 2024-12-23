import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [value, setValue] = useState(8);
  const [password, setPassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const handleChange = (event) => {
    setValue(Number(event.target.value)); // Ensure value is a number
  };

  const copyPasswordOnClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = useCallback(() => {
    const length = value; // Fix for undeclared variable
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) characters += "0123456789";
    if (charAllowed) characters += "()&%#@!~*{}[]/;";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters[randomIndex];
    }

    setPassword(pass);
  }, [value, numAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <>
      <div className="center">
        <input
          type="text"
          value={password}
          placeholder="password"
          ref={passwordRef}
          readOnly
        />
        <button className="button" onClick={copyPasswordOnClip}>
          Copy
        </button>
        <input
          type="range"
          min="6"
          max="20"
          className="slider"
          id="myRange"
          value={value}
          onChange={handleChange}
        />
        <label className="container">Length: {value}</label>
        <label className="container">
          Number
          <input
            type="checkbox"
            checked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Characters
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </>
  );
}

export default App;
