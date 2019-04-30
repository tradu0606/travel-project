const mongoose = require('mongoose')

const ParksSchema = new mongoose.Schema(
      {
        "addresses": [
          {
            "line1": String,
            "line2": String,
            "line3": String,
            "city": String,
            "stateCode": String,
            "postalCode": String,
            "type": String
          },
          {
            "line1": String,
            "line2": String,
            "line3": String,
            "city": String,
            "stateCode": String,
            "postalCode": String,
            "type": String
          }
        ],
        "contacts": [
          {
            "phoneNumbers": [
              {
                "phoneNumber": String,
                "description": String,
                "extension": String,
                "type": String
              },
              {
                "phoneNumber": String,
                "description": String,
                "extension": String,
                "type": String
              },
              {
                "phoneNumber": String,
                "description": String,
                "extension": String,
                "type": String
              }
            ],
            "emailAddresses": [
              {
                "emailAddress": String,
                "description": String
              }
            ]
          }
        ],
        "description": String,
        "designation": String,
        "directionsInfo": String,
        "directionsUrl": String,
        "entranceFees": [
          {
            "cost": Number,
            "description": String,
            "title": String
          },
          {
            "cost": Number,
            "description": String,
            "title": String
          }
        ],
        "entrancePasses": [
          {
            "cost": Number,
            "description": String,
            "title": String
          }
        ],
        "fullName": String,
        "id": String,
        "images": [
          {
            "credit": String,
            "altText": String,
            "title": String,
            "id": Number,
            "caption": String,
            "url": String
          },
          {
            "credit": String,
            "altText": String,
            "title": String,
            "id": Number,
            "caption": String,
            "url": String
          }
        ],
        "latLong": String,
        "name": String,
        "operatingHours": [
          {
            "name": String,
            "description": String,
            "standardHours": [
              {
                "sunday": String,
                "monday": String,
                "tuesday": String,
                "wednesday": String,
                "thursday": String,
                "friday": String,
                "saturday": String
              }
            ],
            "exceptions": [
              {
                "name": String,
                "startDate": String,
                "endDate": String,
                "exceptionHours": [
                  {
                    "sunday": String,
                    "monday": String,
                    "tuesday": String,
                    "wednesday": String,
                    "thursday": String,
                    "friday": String,
                    "saturday": String
                  }
                ]
              },
              {
                "name": String,
                "startDate": String,
                "endDate": String,
                "exceptionHours": [
                  {
                    "sunday": String,
                    "monday": String,
                    "tuesday": String,
                    "wednesday": String,
                    "thursday": String,
                    "friday": String,
                    "saturday": String
                  }
                ]
              }
            ]
          },
          {
            "name": String,
            "description": String,
            "standardHours": [
              {
                "sunday": String,
                "monday": String,
                "tuesday": String,
                "wednesday": String,
                "thursday": String,
                "friday": String,
                "saturday": String
              }
            ],
            "exceptions": Boolean
          }
        ],
        "parkCode": String,
        "states": String,
        "url": String,
        "weatherInfo": String
      })

module.export = mongoose.model("Parks", ParksSchema)