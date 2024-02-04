import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();
  const [searchkey, setsearchkey] = useState('')
  const [hotels, sethotels] = useState([]);
  const[type , settype]=useState('all')
  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/rooms/getallrooms")).data;

      setrooms(data);
      setduplicaterooms(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    var temprooms = [];
    var availablitiy = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availablitiy = true;
            }
          }
        }
      }
      if (availablitiy === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  }
  
  function filterBySearch()
  {
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms);
  
  }

  function filterByType(e)
  {
    settype(e)
    if(e!=='all'){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())
      setrooms(temprooms);
    }
    else{
     setrooms(duplicaterooms)
    }
   
  }
  return (
    <div className="container">
      <div className="row mt-5 bs1">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        
        <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search Rooms'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

            <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non Delux</option>
              
            </select>
          </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default Homescreen;
