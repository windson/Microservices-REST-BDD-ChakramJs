module.exports = Object.freeze({
    reservationQueryAPI: 'http://api.myreservationQuery.com/api/v1/',
    reservationNotesAPI: 'http://api.mynote.com/api/v1/',
    marketingAPI: 'http://api.mymarketing.com/api/v1/',
    BadReqSchema:
    {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            },
            "data": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "key": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "key",
                        "message"
                    ]
                }
            }
        },
        "required": [
            "message",
            "data"
        ]
    }

});
