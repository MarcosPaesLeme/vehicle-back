let port = process.env.MONGO_PORT || 27017;
let connection = 'mongodb://linkapi:linkapi2020@ds163718.mlab.com:63718/linkapi'

const options = {
    "useNewUrlParser": true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = () => ({
    connection,
    options
});
