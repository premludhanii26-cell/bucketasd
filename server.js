const express = require('express');
const app = express()
const port = 3000

const cacheMiddleware = require('./middleware/cacheMiddleware');
const productRoutes = require('./routes/productRoutes');

app.use(express.json()); 
app.use('/products', cacheMiddleware, productRoutes);

app.listen(port, () => {
    console.log(`server app listening on port ${port}`);
});