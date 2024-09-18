import React from "react";
import "../globals.css";
function Homepage() {
  return (
    <div className="flex w-full h-screen justify-center">
      {/*left body*/}
      <div className="flex w-[60%] border border-black justify-center items-center ">
        
        <strong>
          Experience seamless video communication anytime, anywhere .
        </strong>
      
       Connect with friends, family, or colleagues in high quality. Fast,
        secure, and reliable video chat made easy for everyone.
      </div>
      {/*right body*/}
      <div className="flex w-[40%] border border-black justify-center items-center">
        right
      </div>
    </div>
  );
}

export default Homepage;
