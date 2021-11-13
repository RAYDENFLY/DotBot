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
    process.exit(1)
}
console.info("Test 1 end")
console.info("Test 2 run util")
try {
    const Util = require("../system/kernel/Util")
    const util = new Util()
    console.info("1# :" + util.msToSec("10000000"))
    console.info("2# :" + util.bytesToSize("10000000", true))
    console.info("3# :" + util.MbToBytes("1000"))
    console.info("4# :" + util.msToTime("10000000000"))
    console.info("4# :" + util.randompassword(1000))
} catch (e) {
    console.error("Test 2 error", e)
    console.warn("Test 2 catch")
    process.exit(1)
}
console.info("Test 2 end")

