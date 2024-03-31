import React from "react";

const Card = ({ title, description, children }) => {
  return (
    <div className="rounded-lg border mx-auto text-card-foreground shadow-sm w-full max-w-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold whitespace-nowrap tracking-tight text-lg">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
};

export default Card;
