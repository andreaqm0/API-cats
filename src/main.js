const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// import routes
const breedsRoute = require('./routes/Breeds.route')

// Set port
const PORT = process.env.PORT || 3000

// Set configurations
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api', breedsRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})