const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// import routes
const breedsRoute = require('./routes/Breeds.route')
const imagesRoute = require('./routes/Images.route')

// Set port
const PORT = process.env.PORT || 3000

// Set configurations
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/breeds', breedsRoute)
app.use('/api/images', imagesRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})