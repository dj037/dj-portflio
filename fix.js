const fs = require("fs");
const { decode, encode } = require("iconv-lite");
const text = fs.readFileSync("tuorui/index.html");
// Actually, iconv-lite may not be installed. Let us avoid it.
// We can use TextDecoder!
const buf = fs.readFileSync("tuorui/index.html"); // UTF-8 buffer
const str = buf.toString("utf8"); // This string contains the GBK pseudo-characters.
// How do we get the GBK bytes back without iconv-lite?
// We cannot in pure JS unless we use a mapping.

