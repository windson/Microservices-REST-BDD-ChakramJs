var chakram = require('chakram'),
    expect = chakram.expect,
    constants = require('../../constants'),
    baseUrl = constants.marketingAPI;

describe('Marketing Info API:', function () {
    it('Get 200', function () {
        var response = chakram.get(baseUrl + 'property/369/reservation/5559844/marketingInfo');
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(response).not.to.be.encoded.with.gzip;
        expect(response).to.comprise.of.json({
            marketSegment: { id: '27', name: 'Black List' }
        });
        return chakram.wait();
    });
});

