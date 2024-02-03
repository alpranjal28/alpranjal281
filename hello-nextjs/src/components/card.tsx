const Card = ({ children }: { children: React.ReactNode }) => {
    const cardStyle = {
        padding: "100px",
        margin: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        border: "1px solid #ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
    };
    return <div style={cardStyle}>{children}</div>;
};

export default Card;
