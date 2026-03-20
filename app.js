import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { myFunction } from '#src/my-function.js';

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
