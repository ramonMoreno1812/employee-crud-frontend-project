import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <footer className="footer" style={{ position: "fixed", bottom: "0"
        , width: "100%", height: "50px", backgroundColor: "black", textAlign: "center",
        color: "white"}}>
        <span>@Ramon Moreno</span>
        
      </footer>
    </div>
  );
};

export default FooterComponent;