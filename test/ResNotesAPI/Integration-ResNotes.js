var chakram = require('chakram'),
    expect = chakram.expect,
    constants = require('../../constants'),
    baseUrl = constants.reservationNotesAPI;

describe('Integration Reservation Note API:', function () {
    /*
    
    Tests/Steps:
    1. Create a res note: POST
    2. Get the res note from Location Header
    3. Verify properties posted in step 1
    4. Update a res note using PUT
    5. Read the res note from response of PUT and verify properties posted in step 4 in reqBodyUpdate
    6. Get list of res notes and check it contains updated res note id (Final Sanity)
    
    */
    this.timeout(10000);
    //200
    it('Get 200', function () {
        var response = chakram.get(baseUrl + 'property/369/reservation/5557830/note');
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json([{ id: '5495034', type: 'Email', subject: 'Clean the dirty room' }]);
        return chakram.wait();
    });

    it('E2E Test', function () {

        var createdNoteObj, updatedNoteObj, respHdrlocation;
        var reqHeaders = {
            'requestId': '133a3294-85e7-4d46-9ada-c564626bf20f',
            'Content-Type': 'application/json'
        };
        var reqBodyCreate = {
            'typeId': '2',
            'sourceId': '1',
            'subject': 'Holiday package on arrivals',
            'userId': '100006',
            'details': '10% discount on Holiday package on arrivals'
        };
        var updateReqBody = {
            'typeId': '2',
            'subject': 'Welcome drinks to guests',
            'userId': '100006',
            'details': 'Offer Welcome drinks to guests in the evening'
        };
        // 1. Create a res note
        return chakram.post(baseUrl + 'property/369/reservation/5557830/note?includeCreated=true', reqBodyCreate, { headers: reqHeaders })
            .then(function (createdResp) {
                // 2. Get the res note from Location Header 
                createdNoteObj = createdResp.body;
                expect(createdResp).to.have.header('location', baseUrl + 'property/369/reservation/5557830/note/' + createdNoteObj.id);
                // 3. Verify properties posted in step 1
                expect(createdNoteObj.subject).to.be.eql(reqBodyCreate.subject);
                expect(createdNoteObj.details).to.be.eql(reqBodyCreate.details);
                respHdrlocation = createdResp.response.headers.location;
                return chakram.get(createdResp.response.headers.location);
            })
            .then(function (getResp) {
                // 4. Update a res note
                expect(getResp.body).to.be.eql(createdNoteObj); //Verify that createdNoteObj from POST response is equals to response from GET 

                return chakram.put(respHdrlocation + '?includeCreated=true', updateReqBody, { headers: reqHeaders });
            })
            .then(function (updatedResp) {
                // 5. Read the res note from response of PUT and verify properties posted in step 4 in reqBodyUpdate
                updatedNoteObj = updatedResp.body;
                expect(updatedNoteObj.subject).to.be.eql(updateReqBody.subject);
                expect(updatedNoteObj.details).to.be.eql(updateReqBody.details);
                // 6. Get list of res notes and check it contains updated res note id (Final Sanity)
                return chakram.get(baseUrl + 'property/369/reservation/5557830/note');
            }).then(function (listOfNotes) {
                expect(listOfNotes).to.have.status(200);
                var updatedShortObj = {
                    id: updatedNoteObj.id,
                    subject: updatedNoteObj.subject,
                    type: updatedNoteObj.type
                };
                expect(listOfNotes).to.comprise.of.json([updatedShortObj]);

            });
    });

});