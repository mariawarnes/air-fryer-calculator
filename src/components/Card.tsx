import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const Card = ({ title, description, children }: CardProps) => {
  return (
    <div className="rounded-md mt-6 bg-white  mx-auto text-card-foreground shadow-lg w-full max-w-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold whitespace-nowrap tracking-tight text-xl">
          {title}
        </h1>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
};

export default Card;
