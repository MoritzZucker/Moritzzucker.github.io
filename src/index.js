import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import "./default.css";
import "./atom-one-dark.css";

let deck = new Reveal({
  plugins: [Markdown, Highlight, Notes],
});
deck.initialize({
  controls: true,
  progress: true,
  hash: true,
  history: true,
});
