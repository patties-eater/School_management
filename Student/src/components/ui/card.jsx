// src/components/ui/card.jsx
export const Card = ({ title, children }) => {
    return (
      <div className="card">
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    );
  };
  
  export const CardContent = ({ children }) => {
    return <div className="card-content">{children}</div>;
  };
  