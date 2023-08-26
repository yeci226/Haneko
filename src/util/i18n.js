const en = require("../languages/en.js");
const tw = require("../languages/tw.js");

const langs = { en, tw };

function i18nMixin(lang) {
  if (!Object.keys(langs).includes(lang))
    throw new Error("No lang specified found!");
  return function i18n(string, options, ...args) {
    let str = langs[lang][string] ?? langs["en"][string];
    if (str == undefined) return void 0;
    if (typeof str == "function") return str(options, ...args);
    else if (typeof str != "string") return str;
    else {
      if (options && isObj(options))
        for (let [key, value] of Object.entries(options))
          str = str.replace(`<${key}>`, `${value}`);
      if (typeof options == "string") args.push(options);
      if (args) {
        for (let [index, value] of Object.entries(args))
          str = str
            .replace("%s", `${value}`)
            .replaceAll(`%${index}%`, `${value}`);
      }
    }
    return str;
  };
}

function tl3(str) {
  if (str.startsWith("zh")) return "tw";
}

function isObj(k) {
  return Object.prototype.toString.call(k) === "[object Object]";
}

module.exports = { tl3, i18nMixin };
