let html = document.getElementById("app").innerHTML.trim();
let index = 0;
// reg
const ncname = "[a-zA-Z_][\\w\\-\\.]*";
const singleAttrIdentifier = /([^\s"'<>/=]+)/;
const singleAttrAssign = /(?:=)/;
const singleAttrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>`]+)/.source
];
const attribute = new RegExp(
  "^\\s*" +
    singleAttrIdentifier.source +
    "(?:\\s*(" +
    singleAttrAssign.source +
    ")" +
    "\\s*(?:" +
    singleAttrValues.join("|") +
    "))?"
);
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
const startTagOpen = new RegExp("^<" + qnameCapture);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;

function advance(n) {
  index += n;
  html = html.substring(n);
}
function parseHTML() {
  while (html) {
    {
      let textEnd = html.indexOf("<");
      if (textEnd === 0) {
        if (html.math(endTag)) {
          //...process end tag
          continue;
        }
        if (html.match(startTagOpen)) {
          //...process start tag
          continue;
        }
      } else {
        // process text
        continue;
      }
    }
  }
}
function parseStartTag(){
    const start=html.math(startTagOpen)
    if(start){
        const match = {
            tagName:start[1],
            attrs:[],
            start:index
        }
        advance(start[0].length)
    }
}
export default {};
