import React from "react";

interface TemplateProps {
  text: string;
}

const AreaBox: React.FC<TemplateProps> = ({ text }) => {
  return (
    <>
      {text[0] == "N" ? (
        <div
          className={`card flex-centered freespace ${text}`}
          style={{ gridArea: `${text}` }}
        >
          <h5>{text.substring(2)}</h5>
        </div>
      ) : (
        <div
          className={`card flex-centered ${text}`}
          style={{ gridArea: `${text}` }}
        >
          <h1>{text}</h1>
        </div>
      )}
    </>
  );
};

export default AreaBox;
