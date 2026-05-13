# lorem ibsen

Norwegian placeholder text generator that draws sentences from Henrik Ibsen's
plays — primarily *Et Dukkehjem* and *Peer Gynt*, sourced from
[Wikikilden](https://no.wikisource.org/wiki/Henrik_Ibsen).

Live at **<https://lorem-ibsen.whirlwin.io>**.

## Files

- `index.html` · `styles.css` · `app.js` — the static site
- `corpus.js` — the sentence corpus
- `.domains` — Codeberg Pages custom-domain mapping
- `deploy.sh` — push the served tree to the `pages` branch on Codeberg

## Deploy

```
./deploy.sh                  # pushes to remote "codeberg" branch "pages"
```

## Local

```
python3 -m http.server 4001  # then http://localhost:4001
```

## License

Site code under the user's preferred terms. Ibsen's plays are in the public
domain.
