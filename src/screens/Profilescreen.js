import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Tag } from "antd";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-5 mt-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>IsAdmin : {user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      setloading(true);
      const data = await (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(data);
      setbookings(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
      seterror(true);
    }
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setloading(false);
      Swal.fire('Congrats' , 'Your Booking Cancelled Successfully' , 'success').then(result=>{
        window.location.reload();  
      })
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire('Sorry' , 'Please Try Again Later' , 'error')
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId</b> : {booking._id}{" "}
                  </p>
                  <p>
                    <b>CheckIn</b> : {booking.fromdate}{" "}
                  </p>
                  <p>
                    <b>CheckOut</b> : {booking.todate}{" "}
                  </p>
                  <p>
                    <b>Amount</b> : {booking.totalamount}{" "}
                  </p>
                  <p>
                    <b>Status</b> :{" "}
                  {booking.status =='cancelled' ? ( <Tag color="red">CANCELLED</Tag>) : ( <Tag color="green">CONFIRMED</Tag>) }
                  </p>
                 {booking.status !== 'cancelled' && (
                      <div className="text-right">
                      <button
                        className="btn"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        Cancel Booking
                      </button>
                    </div>
                 )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
