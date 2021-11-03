const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(`../dist/SplitwiseApp`));
app.get('/*', function (req: any, res: any) {
  res.sendFile('index.html', {root: '../dist/SplitwiseApp'});
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on ${process.env.PORT}`);
})

