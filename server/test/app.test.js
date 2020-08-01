const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", function () {
    it("Login with valid email and password with minimum 5 characters", function (done) {
        this.timeout(10000)
        chai
            .request("http://localhost:3000")
            .post("/users/login")
            .send({ email: "ram@gmail.com", password: "123456" })
            .end((err, res) => {
                expect(res.body.responseCode).to.equals(200);
                expect(res.body.error).to.equals(false);
                expect(res.body.result.email).to.equals("ram@gmail.com");
                done();
            });
    });


    it("valid url", function (done) {
        this.timeout(10000)
        chai
            .request("http://localhost:3000")
            .post("/image/imgresize")
            .send({ link:"https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg" })
            .end((err, res) => {
                expect(res.body.responseCode).to.equals(200);
                expect(res.body.error).to.equals(false);
                expect(res.body.openimage).to.equals("https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg");
                done();
            });
    });
});