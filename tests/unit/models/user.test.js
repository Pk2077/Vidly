const {User} = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const { default: mongoose } = require("mongoose");

describe("user.generateToken",()=>{
it("should generate jwt token",()=>{
    const payload = {
        _id:new mongoose.Types.ObjectId().toHexString(),
        isAdmin:true};
const user = new User(payload);
const token = user.generateToken();
const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
expect(decoded).toMatchObject(payload);
});

});