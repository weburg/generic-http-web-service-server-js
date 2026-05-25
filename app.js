import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { myFunction } from '#src/my-function.js';
import { Omnibus } from '#src/example/domain/omnibus.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', {
    date: new Date(),
    requestUri: req.originalUrl,
    myFunction: myFunction
  });
});

app.get('/generichttpws/:section?', (req, res) => {
  const section = req.params.section || 'home';

  if (section == 'omnibus') {
    const omnibus = new Omnibus();
    omnibus.birthtime = new Date(2016, 4, 11, 12, 0, 0, 0);
    omnibus.sendtime = new Date();
    omnibus.toppings = ['Cheese', 'Pepperoni', 'Sausage'];
    omnibus.sides = ['Fries', 'Onion Rings'];
    omnibus.onFire = false;
    omnibus.document = null;
    omnibus.pairing = {
      'Steak': 'Cabernet Sauvignon',
      'Fish': 'Chardonnay',
    };

    const json = JSON.stringify(omnibus);

    res.send(json);
    return;
  }

  res.render('generichttpws/' + section, {
    requestUri: req.originalUrl
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
