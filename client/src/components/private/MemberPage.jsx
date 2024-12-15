import React from "react";

const MemberPage = () => {
  const meetings = [
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
  ];

  return (
    <div style={{ display: "flex", fontFamily: "Arvo, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "20%",
          backgroundColor: "#9b0f1f",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li style={{ marginBottom: "20px", cursor: "pointer" }}>History</li>
          <li style={{ marginBottom: "20px", cursor: "pointer" }}>Manage meetings</li>
          <li style={{ marginBottom: "20px", cursor: "pointer" }}>Create an event</li>
          <li style={{ marginBottom: "20px", cursor: "pointer" }}>Book a meeting</li>
          <li style={{ marginBottom: "20px", cursor: "pointer" }}>Request a custom meeting</li>
        </ul>
        <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Log out
        </button>
      </aside>

      {/* Main Content */}
      <section
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f9f9f9",
          color: "black",
        }}
      >
        <h1 style={{ fontSize: "36px", color: "#222" }}>Hey Leen!</h1>
        <h2 style={{ fontSize: "24px", margin: "20px 0", color: "#555" }}>
          Your upcoming meetings:
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {meetings.map((meeting, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f2ebea",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", fontSize: "18px", margin: "0 0 10px" }}>
                  {meeting.title}
                </p>
                <p style={{ margin: "0 0 5px" }}>When: {meeting.time}</p>
                <p style={{ margin: "0" }}>Where: {meeting.location}</p>
              </div>
              <button
                style={{
                  display: "inline-block",
                  width: "140px",
                  height: "40px",
                  backgroundColor: "white",
                  border: "transparent",
                  boxShadow: "-10px -10px 1px rgba(198, 22, 39)",
                  color: "#c61627",
                  fontSize: "12px",
                  fontWeight: "bolder",
                  textAlign: "center",
                  lineHeight: "38px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.target.style, {
                    backgroundColor: "#c61627",
                    color: "white",
                  })
                }
                onMouseLeave={(e) =>
                  Object.assign(e.target.style, {
                    backgroundColor: "white",
                    color: "#c61627",
                  })
                }
              >
                Manage Meeting
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MemberPage;
