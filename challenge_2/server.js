const path = require('path');
const express = require('express');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json);


let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app is listing on ${port}`);
});
