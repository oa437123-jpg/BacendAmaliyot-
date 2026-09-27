const express = require('express');
const { connect, model } = require("mongoose");
const cors = require('cors');
require("dotenv").config();

global.model = model;

const app = express();

app.use(express.json());
app.use(cors());

async function connectToDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("MongoDB is connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
connectToDB();

//Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//Admin
const { admin } = require("./router/adminrouter");
app.use("/admin", admin);

//Venue
const { venue } = require("./router/venuerouter");
app.use("/venue", venue);

//Booking
const { booking } = require("./router/bookingrouter");
app.use("/booking", booking);

//CartItem
const { cartItem } = require("./router/cartitemrouter");
app.use("/cartitem", cartItem);

//Cart
const { cart } = require("./router/cartrouter");
app.use("/cart", cart);

//Country
const { country } = require("./router/countryrouter");
app.use("/country", country);

//CustomerAddress
const { customerAddress } = require("./router/customeraddressrouter");
app.use("/customeraddress", customerAddress);

//CustomerCard
const { customerCard } = require("./router/customercardrouter");
app.use("/customercard", customerCard);

//Customer
const { customer } = require("./router/customerrouter");
app.use("/customer", customer);

//DeliveryMethod
const { deliveryMethod } = require("./router/deliverymethodrouter");
app.use("/deliverymethod", deliveryMethod);

//Discount
const { discount } = require("./router/discountrouter");
app.use("/discount", discount);

//District
const { district } = require("./router/districtrouter");
app.use("/district", district);

//Event
const { event } = require("./router/eventrouter");
app.use("/event", event);

//EventType
const { eventType } = require("./router/eventtyperouter");
app.use("/eventtype", eventType);

//Flat
const { flat } = require("./router/flatrouter");
app.use("/flat", flat);

//Gender
const { gender } = require("./router/genderrouter");
app.use("/gender", gender);

//HumanCategory
const { humanCategory } = require("./router/humancategoryrouter");
app.use("/humancategory", humanCategory);

//Lang
const { lang } = require("./router/langrouter");
app.use("/lang", lang);

//PaymentMethod
const { paymentMethod } = require("./router/paymentmethodrouter");
app.use("/paymentmethod", paymentMethod);

//Region
const { region } = require("./router/regionrouter");
app.use("/region", region);

//Seat
const { seat } = require("./router/seatrouter");
app.use("/seat", seat);

//SeatType
const { seatType } = require("./router/seattyperouter");
app.use("/seattype", seatType);

//Sector
const { sector } = require("./router/sectorrouter");
app.use("/sector", sector);

//Ticket
const { ticket } = require("./router/ticketrouter");
app.use("/ticket", ticket);

//TicketStatus
const { ticketStatus } = require("./router/ticketstatusrouter");
app.use("/ticketstatus", ticketStatus);

//TicketType
const { ticketType } = require("./router/tickettyperouter");
app.use("/tickettype", ticketType);

//Types
const { types } = require("./router/typesrouter");
app.use("/types", types);

//VenuePhoto
const { venuePhoto } = require("./router/venuephotorouter");
app.use("/venuephoto", venuePhoto);

//VenueTypes
const { venueTypes } = require("./router/venuetypesrouter");
app.use("/venuetypes", venueTypes);

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: "API documentation for Express.js with Swagger",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Development 29 modules backend project"
            }
        ]
    },
    apis: ["./router/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
