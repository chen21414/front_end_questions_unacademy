// question: debouncing (when type in search bar, after a second, it automatically fetch results)
import React from "react";

const round_5 = () => {
  const myDebounce = (cb, d) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer); //if timer still running, clear it
      timer = setTimeout(() => {
        cb(...args); //the args here is from the cb itself
      }, d);
    };
  };

  const handleChange = myDebounce((e) => {
    console.log(e.target.value); //will print after one sec
  }, 1000);

  return (
    <div>
      <input onChange={handleChange} />
    </div>
  );
};

export default round_5;
