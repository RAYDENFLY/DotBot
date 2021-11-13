module.exports = async (shard, message) => {
    console.info(`Shard ${shard.id} Eval: ${message._result}`);
}