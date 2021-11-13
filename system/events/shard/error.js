module.exports = async (shard, error) => {
    console.error(`Shard ${shard.id} had an error but not restart: ${error}`)
}