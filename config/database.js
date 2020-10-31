const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/play', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

db.on('connected', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`)
})