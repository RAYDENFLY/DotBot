console.log("Test 1 run libs")
require("../src/lib/console.debug")
require("../src/lib/console.info")
require("../src/lib/console.error")
require("../src/lib/console.tips")
require("../src/lib/console.warn")
try {
    console.debug("Test lib debug")
    console.info("Test lib info")
    console.error("Test lib error")
    console.tips("Test lib tips")
    console.warn("Test lib warn")
} catch (e) {
    console.error("Test 1 error", e)
    console.log("Test 1 catch")
    process.exit(0)
}
console.log("Test 1 end")
console.log("Test 2 run")
try {
    const Util = require("../system/kernel/Util")
    const util = new Util()
    console.log("TEST2 :" + util.msToSec("1000"))
    console.log("TEST2 :" + util.bytesToSize("10000", true))
} catch (e) {
    console.error("Test 2 error", e)
    console.log("Test 2 catch")
    process.exit(0)
}
console.log("Test 2 end")

