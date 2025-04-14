import react from "react";
import "./textbox.css";

const Textbox = ({ index, label, value }) => {    

    return (
        <div key={index} className="textbox-container">
          <span className="field-name">{label}</span>
          <input
            placeholder={value.placeholder || "Type something here..."}
            className="input"
            name="text"
            type="text"
          />
        </div>
      );
}

export default Textbox;