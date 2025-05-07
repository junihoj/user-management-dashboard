import React from "react";
import styles from "./loader2.module.css";

const Loader2 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader2;
