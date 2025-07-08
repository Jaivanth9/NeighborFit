
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const neighborhoods = [
  {
    name: "GreenVille",
    nature: 10,
    nightlife: 2,
    schools: 8,
    publicTransport: 5
  },
  {
    name: "MetroTown",
    nature: 2,
    nightlife: 9,
    schools: 6,
    publicTransport: 9
  },
  {
    name: "QuietVille",
    nature: 8,
    nightlife: 1,
    schools: 10,
    publicTransport: 4
  }
];

app.post('/match', (req, res) => {
  const preferences = req.body;

  const scores = neighborhoods.map(n => {
    const score = (preferences.nature ? n.nature : 0) +
                  (preferences.nightlife ? n.nightlife : 0) +
                  (preferences.schools ? n.schools : 0) +
                  (preferences.publicTransport ? n.publicTransport : 0);
    return { ...n, score };
  });

  scores.sort((a, b) => b.score - a.score);
  res.json(scores[0]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
