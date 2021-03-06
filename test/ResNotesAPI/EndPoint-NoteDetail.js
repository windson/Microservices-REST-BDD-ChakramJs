var chakram = require('chakram'),
    expect = chakram.expect,
    constants = require('../../constants'),
    apiConstants = require('./constants'),
    baseUrl = constants.reservationNotesAPI;

describe('Reservation Note API: Note Detail', function () {

    //400
    it('Get 400', function () {
        var response = chakram.get(baseUrl + 'property/369/reservation/5557830/note/5495034?q=id=1');
        expect(response).to.have.status(400);
        expect(response).to.have.schema(constants.BadReqSchema);
        return chakram.wait();
    });

    // 404
    it('Get 404', function () {
        var response = chakram.get(baseUrl + 'property/3690/reservation/5559844/note/5495034', {
            headers: {
                'Accept': 'application/json'
            }
        });
        expect(response).to.have.status(404);
        return chakram.wait();
    });

    // 406
    it('Get 406', function () {
        var response = chakram.get(baseUrl + 'property/3690/reservation/5559844/note/5495034', {
            headers: {
                'Accept': 'application/ecmascript'
            }
        });
        expect(response).to.have.status(406);
        return chakram.wait();
    });

    // 200 Schema Validation
    it('Get 200 Schema Validation', function () {
        // http://jsonschema.net/
        var response = chakram.get(baseUrl + 'property/369/reservation/5557830/note/5495034');
        return expect(response).to.have.schema(apiConstants.NoteDetailSchema);
    });

    // 200 Success
    it('Get 200', function () {
        var response = chakram.get(baseUrl + 'property/369/reservation/5557830/note/5495034');
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json({ id: '5495034', type: 'Email', subject: 'Clean the dirty room',details: 'so and so details' });
        return chakram.wait();
    });
});