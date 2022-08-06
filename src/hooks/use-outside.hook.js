import { useEffect } from "react";

export const useOutside = (
  containerRef,
  contextMenuRef,
  callback = () => {}
) => {
  // if click occurred outside an element
  const handleClickOutside = (e) => {
    if (
      containerRef?.current?.contains(e.target) &&
      !contextMenuRef?.current?.contains(e.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
