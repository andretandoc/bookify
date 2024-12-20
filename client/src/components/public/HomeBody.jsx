import { Link } from "react-router-dom";

export default function HomeBody() {
  return (
    <main className="layout">
    <div className = "content-wrapper">
      <div className = "left-section">
        <h1 className = "home-title">Simplifying Academic Scheduling & Meetings</h1>
        <p className = "home-p">
          Take control of your academic journey—effortlessly schedule meetings and
          connect with the McGill community. Manage your appointments with
          confidence and stay focused on achieving your goals.
        </p>
      </div>

      <div className = "right-section">
        <button className = "double-red-btn">
          <Link to = "/PublicEvents" style = {style.doubleBtn}>
          Schedule an Appointment</Link> 
        </button>
        
        <button className = "double-red-btn">
          <Link to = "/ApptForm" style = {style.doubleBtn}>
          Manage Scheduled & <br></br> Completed Appointments</Link>
        </button>
      </div>
    
    </div>
    
    <div className = "footer">
    <footer>
        <p> &copy; 2024 Bookify! McGill University  </p>
    </footer>
    </div>
    </main>
    
  );
}

const style = {
  doubleBtn: {
    color: "white",
    fontSize: "19.7px",
    fontFamily: "Lato , sans-serif",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: "50px",
    textDecoration: "none",
    width: "100%",
    display: "block",
  },
};
