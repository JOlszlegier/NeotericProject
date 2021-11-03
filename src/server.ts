const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(`../dist/SplitwiseApp`));
app.get('/*', function (req: any, res: any) {
  res.sendFile('index.html', {root: '../dist/SplitwiseApp'});
})


app.listen(8080, () => {
  console.log(`Listening on 8080`);
})

