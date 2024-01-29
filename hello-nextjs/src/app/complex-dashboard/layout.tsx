export default function DashboardLayout({
    children,
    analytics,
    notifications,
    revenue,
}: {
    children: React.ReactNode;
    analytics: React.ReactNode;
    notifications: React.ReactNode;
    revenue: React.ReactNode;
}) {
    return (
        <>
            <div>{children}</div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    border: "1px solid black",
                    marginTop: "20px",
                    marginBottom: "20px",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: "lightgray",
                    boxShadow: "0px 0px 5px black",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexDirection: "column",
                        border: "1px solid black",
                    }}
                >
                    <div style={{ border: "1px solid black" }}>{analytics}</div>
                    <div style={{ border: "1px solid black" }}>{revenue}</div>
                </div>
                <div
                    style={{
                        border: "2px solid black",
                        display: "flex",
                        flex: "1",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {notifications}
                </div>
            </div>
        </>
    );
}
