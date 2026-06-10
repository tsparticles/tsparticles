const text = "  rate;\n\n  constructor()";
const name = "rate";
const fullRe = new RegExp("^( *)(override\\s+)?(readonly\\s+)?(?:readonly\\s+)?" + name + "(\\??)\\s*(:\\s*[^;\\n]+?)?\\s*;\\s*$", "m");
const m = text.match(fullRe);
console.log("full regex match:", m ? JSON.stringify(m[0]) : "null");
console.log("full regex length:", m ? m[0].length : 0);

// Show all captures
if (m) {
  for (let i = 1; i < m.length; i++) {
    console.log(`  cap ${i}:`, JSON.stringify(m[i]));
  }
  // What's at the position after the match?
  console.log("char after match:", JSON.stringify(text[m.index + m[0].length]));
  console.log("next 20 chars:", JSON.stringify(text.substring(m.index + m[0].length, m.index + m[0].length + 20)));
}
