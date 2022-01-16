const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = 'http://localhost:7000'

//assertion style
chai.use(chaiHTTP)
chai.should()
// TEST API CENTERS
describe('Events API', () => {
    //TEST GET ROUTE
    describe(' GET /events', () => {
        it('it should get all events', (done) => {
            chai.request(server)
                .get('/all-events')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                })
            done()
        })
    })
    //TEST POST
    describe(' POST /ajouter-even', () => {
        it('it should post one event ', (done) => {
            chai.request(server)
                .post('/ajouter-even')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                })
            done()
        })
    })
    //TEST GET BY ID
    describe(' GET /events/:idEvent', () => {
        it('it should get one event by giving id', (done) => {
            const idEvent = '619bca376b94cc5c8a25415f'
            chai.request(server)
                .get(`/events/${idEvent}`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                })
            done()
        })
    })
    //TEST DELETE EVENT
    describe(' DELETE /events/:idEvent', () => {
        it('it should delete one event by giving id', (done) => {
            const idEvent = '619bca376b94cc5c8a25415f'
            chai.request(server)
                .post(`/events/${idEvent}`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                })
            done()
        })
    })
    describe(' PUT /events/:idEvent', () => {
        it('it should update one event by giving id', (done) => {
            const idEvent = '619bca376b94cc5c8a25415f'
            chai.request(server)
                .put(`/events/${idEvent}`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                })
            done()
        })
    })
})
