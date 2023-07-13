import { useState } from "react";

export const useInputState = (initVal, maxCharCount = Infinity) => {
  const [value, setValue] = useState(initVal);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value.trim() === "") {
      setError(`Field is empty`);
    } else if (value.trim().length > maxCharCount) {
      setError(`Exceeds ${maxCharCount} characters`);
    } else {
      setError("");
    }
  };

  return [value, handleChange, error];
};
