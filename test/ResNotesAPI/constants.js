module.exports = Object.freeze({
    NoteListSchema: {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "subject": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "type",
                "subject"
            ]
        }
    },
    NoteDetailSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string"
            },
            "type": {
                "type": "string"
            },
            "subject": {
                "type": "string"
            },
            "details": {
                "type": "string"
            }
        },
        "required": [
            "id",
            "type",
            "subject",
            "details"
        ]
    }
});
