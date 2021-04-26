const express = require('express')
const compression = require('compression')
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(compression())
// app.set('Content-encoding', 'gzip');
// app.set('cache-control', 'public, max-age=31536000, s-maxage=31536000, immutable')

app.listen(5000, () => {
    console.log('start: 5000')
})