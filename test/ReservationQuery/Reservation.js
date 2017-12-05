var chakram = require('chakram'),
    expect = chakram.expect,
    constants = require('../../constants'),
    baseUrl = constants.reservationQueryAPI;

describe('ResQ API:', function () {
    this.timeout(3000);
    it('Get 200', function () {
        var response = chakram.get(baseUrl + 'property/2091/reservation');
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(response).not.to.be.encoded.with.gzip;

        return chakram.wait();
    });

    it('Promise > Validate reservation Detail from Reservation Search', function () {
        var confirmationNo, fn, ln, resId;
        return chakram.get(baseUrl + 'property/2091/reservation')
            .then(function (searchResponse) {
                resId = searchResponse.body.data[0].id;
                confirmationNo = searchResponse.body.data[0].confirmationNumber;
                fn = searchResponse.body.data[0].guests[0].firstName;
                ln = searchResponse.body.data[0].guests[0].lastName;
                return chakram.get(baseUrl + 'property/2091/reservation/' + resId);
            })
            .then(function (resDetail) {
                var reservationDetail = resDetail.body;
                expect(reservationDetail.id).to.contain(resId);
                expect(reservationDetail.confirmationNumber).to.contain(confirmationNo);
                expect(reservationDetail.guests[0].firstName).to.contain(fn);
                expect(reservationDetail.guests[0].lastName).to.contain(ln);
            });
    });
});