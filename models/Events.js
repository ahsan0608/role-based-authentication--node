const { Schema, model } = require("mongoose");

const eventTypeSchema = new Schema(
  {
    TypeOfEvent: {
      type: String,
      required: true,
      enum: ["single", "recurring"],
    },
  },
  { timestamps: true }
);

const eventHostingSchema = new Schema(
  {
    TypeOfEvent: {
      type: String,
      required: true,
      enum: ["online", "physical", "hybrid"],
    },
  },
  { timestamps: true }
);

const onlineHostingSchema = new Schema({
  Country: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Postal Code: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Latitude: {
    type: String,
    required: true,
  },
  Longitude: {
    type: String,
    required: true,
  },
});

const physicallyHostingSchema = new Schema({
    HostOn: {
      type: String,
      required: true,
    },
    HostingLink: {
      type: String,
      required: true,
    },
  });

  const hybridHostingSchema = new Schema({
    Country: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    Postal Code: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    Longitude: {
      type: String,
      required: true,
    },
    OnlineHostingOn: {
        type: String,
        required: true,
      },
    HostingLink: {
        type: String,
        required: true,
      },
  });


const eventTicketSchema = new Schema(
  {
    TicketType: {
      type: String,
      required: true,
      enum: ["free", "paid"],
    },
    TicketPrice: {
      type: String,
      required: true,
    },
    TicketSaleStartDate: {
      type: String,
      required: true,
    },
    TicketSaleStartTime: {
      type: String,
      required: true,
    },
    TicketSaleEndDate: {
      type: String,
      required: true,
    },
    TicketSaleEndTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const paidTicketSchema = new Schema(
    {
      TicketCategory: {
        type: String,
        required: true,
      },
      TicketCurrency: {
        type: String,
        required: true,
      },
      TicketPrice: {
        type: String,
        required: true,
      },
      TicketSaleStartDate: {
        type: String,
        required: true,
      },
      TicketSaleStartTime: {
        type: String,
        required: true,
      },
      TicketSaleEndDate: {
        type: String,
        required: true,
      },
      TicketSaleEndTime: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );



  const eventCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventSummary: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: String,
    required: true,
  },
  eventStartTime: {
    type: String,
    required: true,
  },
  eventEndDate: {
    type: String,
    required: true,
  },
  eventEndTime: {
    type: String,
    required: true,
  },
  eventCategory:{
    type: eventCategorySchema,
    required: true, 
  },
  eventHosting:{
      type: eventHostingSchema,
      required: true,
  },
  eventTicket:{
      type: eventTicketSchema,
      required: true,
  },

});

eventSchema.path('eventHosting').discriminator("online",onlineHostingSchema);
eventSchema.path('eventHosting').discriminator("physical",physicallyHostingSchema);
eventSchema.path('eventHosting').discriminator("hybrid",hybridHostingSchema);

eventSchema.path('eventTicket').discriminator("paid",paidTicketSchema);

module.exports = model("eventType", eventTypeSchema);
module.exports = model("eventTicket", eventTicketSchema);
module.exports = model("eventCategory", eventCategorySchema);
module.exports = model("eventType", eventTypeSchema);
module.exports = model("eventTicket", eventTicketSchema);
module.exports = model("eventCategory", eventCategorySchema);
