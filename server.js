const express = require('express')
const app = express()
app.use(express.json());

const port = process.env.PORT ||  3000

app.get("/",(req,res)=>{
    res.send('Hello')
})

let rooms = []
let customer_bookings = []
let customers = []

app.post("/createroom",(req,res)=>{
    const newRoom = {
        id : rooms.length + 1,
        name : req.body.name,
        noofSeats : req.body.noofSeats,
        amenities : req.body.amenities,
        priceperHour : req.body.price
    }
    rooms.push(newRoom);
    return res.status(201).json({ message : "successfully Created New Room"})
})

app.post("/bookroom",(req,res)=>{
    const newbooking = {
        startDate : req.body.startDate,
        endDate : req.body.EndDate,
        roomid : req.body.roomId
    }
    const newCust = {
        name : req.body.cust_name,
        custid : customers.length + 1

    }
    customer_bookings.push(newbooking);
    customers.push(newCust);
    // console.log(customers)
    // console.log(bookings)
    // console.log(rooms)
    return res.status(201).json({ message : "Room Booking Successful"})

})

app.get("/listallroomsWithBookedData",(req,res)=>{
    const allRoomsData = [];
    customer_bookings.forEach((booking) =>{
        bookingViewModel = {
            roomName : rooms.find(x => x.id == booking.roomid).name,
            customerName : customers.find(x => x.id == booking.custid).name,
            bookedStatus : "Successful",
            startDate : booking.startDate,
            endDate : booking.endDate
        }
        allRoomsData.push(bookingViewModel);
    });

    res.send(allRoomsData);
})

app.get("/listallbookings",(req,res)=>{
    const allBookedData = [];
    customer_bookings.forEach((booking) =>{
        bookingViewModel = {
            roomName : rooms.find(x => x.id == booking.roomid).name,
            customerName : customers.find(x => x.id == booking.custid).name,
            bookedStatus : "Successful",
            startDate : booking.startDate,
            endDate : booking.endDate
        }
        allBookedData.push(bookingViewModel);
    });

    res.send(allBookedData);
})


app.listen(port)
