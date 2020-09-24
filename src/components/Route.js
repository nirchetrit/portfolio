import React, { useEffect, useState } from "react";

const Route = ({ path, children }) => {
  const [currenPatch, setCurrenPatch] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrenPatch(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);
  return currenPatch === path ? children : null;
};
export default Route;
