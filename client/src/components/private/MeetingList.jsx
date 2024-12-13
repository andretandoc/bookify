
function MeetingList() {    

    const handleAppt = async (event) => {
        event.preventDefault();
    
        // Reset results
        setAppointments([]);
        setMessage("");
    
    
        try {
          const response = await axios.get(
            "http://localhost:5005/api/appointments",
            {
              params: {
                email,
                startDate,
                endDate,
              },
            }
          );
    
    
          if (response.data.length === 0) {
            setMessage("No appointments found");
          } else {
            setAppointments(response.data.appointments); // Save appointments in state
          }
        } catch (error) {
          setMessage(
            error.response?.data?.message || "Failed to retrieve appointments!"
          );
        }
      };
    

    return (
           <ul className="meeting-list">
                
                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Custom Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>                               
                            <button className="accept-btn">Accept Request &#9989;</button>
                            <button className="request-btn">Request New Time</button>
                            <button className="reject-btn">Reject Request &#10060;</button>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Custom Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>
                            <p> Status : </p>
                            <button className="accepted">Accepted &#9989;</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Custom Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>
                            <p> Status : </p>
                            <button className="pending">Pending Request</button>
                        </div>
                    </div>
                </li> 
                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Custom Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>
                            <p> Status : </p>
                            <button className="rejected">Rejected / Canceled &#10060;</button>
                        </div>
                    </div>
                </li> 
                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Manage Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>
                            <button className="manage-btn">Not sure: Edit Meeting</button>
                            <button className="request-btn">Request Custom Meeting</button>
                            <button className="reject-btn">Cancel Meeting &#10060;</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Manage "Event": Office Hours COMP307</p>
                            <p>On date: 11/12/2024</p>
                            <button className="reject-btn">Cancel Event &#10060;</button>
                        </div>
                    </div>
                </li>
            </ul>         
    )
}

export default MeetingList



/*              <li>
                    <div className="meeting-box">
                        <div className="meeting">
                            <p>Virtual Meeting with: Karl Wehbe</p>
                            <p>On date: 11/12/2024</p>
                            <p>At: 7:00pm</p>
                            <button className="manage-btn">Manage Meeting</button>
                            <button className="request-btn">Request Custom Meeting </button>
                            <button className="zoom-btn"> Join Meeting &nbsp;&#128249;</button>
                        </div>
                    </div>
                </li> 
*/