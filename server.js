var express = require('express');
var PORT = process.env.PORT || 8080;
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});
