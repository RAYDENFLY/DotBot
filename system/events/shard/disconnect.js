module.exports = async (shard, reconnecting, error) => {
    console.warn(`Shard ${shard.id} disconnected with code ${reconnecting}`)
    if (reconnecting) {
        console.warn(`Shard ${shard.id} reconnecting`)
    } else {
        console.error(`Shard ${shard.id} died with error ${error}`)
    }
}