// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

const express = require('express');
const router  = express.Router();
const db      = require('../db');

function buildPage(monsters, message, error, battle) {
    monsterCards='';
    monsters.forEach(m => {
        monsterCards += `<div class=monster-card>
        <div class=monster-name>Name: `+m.name+`</div>
        <div class=monster-species>Species: `+m.species+`</div>
        <div class=monster-stats>Attack: `+m.attack+`</div>
        <div class=monster-stats>Defense: `+m.defense+`</div>
        <div class=monster-stats>HP: `+m.hp+`</div>
        <div class=monster-id>ID: `+m.id+`</div>
        </div>`;
    });

    return `<!-- HW10 – COSC 2328 – Professor McCurry
     Implemented by: Gabriel Enrique Sanchez Zambrana -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HW10</title>
        <link rel="stylesheet" href="/hw10/css/hw10.css">
    </head>
    <body>
        ${message ? `<p class="banner-success">${message}</p>` : ''}
        ${error ? `<p class="banner-error">${error}</p>` : monsterCards}
        <form action="/hw10/recruit" method="POST">
            <label for="name">Name</label>
            <input type="text" id="name" name="name"
            placeholder="Name" required>

            <label for="species">Species</label>
            <input type="text" id="species" name="species"
            placeholder="Species" required>

            <label for="attack">Attack</label>
            <input type="number" id="attack" name="attack"
            placeholder="0" pattern="[0-9]{7}" required>

            <label for="defense">Defense</label>
            <input type="number" id="defense" name="defense"
            placeholder="0" pattern="[0-9]{7}" required>

            <label for="hp">HP</label>
            <input type="number" id="hp" name="hp"
            placeholder="0" pattern="[0-9]{7}" required>

            <button type="submit">Recruit</button>
        </form>

        <form action="/hw10/retire" method="POST">

            <label for="id">ID</label>
            <input type="number" id="id" name="id"
            placeholder="0" pattern="[0-9]{7}" required>

            <button type="submit">Retire</button>
        </form>

        <form action="/hw10/battle" method="POST">
            <button type="submit">Battle!</button>
        </form>

        ${battle ? `<div class="battle-results">
            <p>Winner Message: ${battle.winner}</p>
            <p>Fighter A Name: ${battle.a.name}</p>
            <p>Fighter A Species: ${battle.a.species}</p>
            <p>Fighter A Attack: ${battle.a.attack}</p>
            <p>Fighter A Defense: ${battle.a.defense}</p>
            <p>Fighter A Health: ${battle.a.hp}</p>
            <p>Fighter A ID: ${battle.a.id}</p>
            <p>Fighter B Name: ${battle.b.name}</p>
            <p>Fighter B Species: ${battle.b.species}</p>
            <p>Fighter B Attack: ${battle.b.attack}</p>
            <p>Fighter B Defense: ${battle.b.defense}</p>
            <p>Fighter B Health: ${battle.b.hp}</p>
            <p>Fighter B ID: ${battle.b.id}</p>
            <p>Fighter A Score: ${battle.scoreA}</p>
            <p>Fighter B Score: ${battle.scoreB}</p>
            </div>` : ''}

    </body>
    </html>`;
}

router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});

router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;