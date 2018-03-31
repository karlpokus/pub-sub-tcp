# pub-sub-tcp
Exploring a simple pub/sub pattern for nodeJS.

# requirements
- One broker, multiple publishers and subscribers
- Run publishers and subscribers in any order
- Multiple publishers can publish to the same channel
- A single subscriber can subscribe to multiple channels

# usage
run broker first
```bash
$ node broker.js
```
run subscribers and their subscriptions
```bash
$ node sub.js <channel> [<channel>]
```
run publishers and pass channelName, msg and publishInterval
```bash
$ node pub.js <channelName> <msg> <publishInterval>
```

# todo
- [x] broker
- [x] pub/sub client
- [x] sub to multiple channels
- [x] remove old subscribers from broker
- [x] parameterize all the things

# license
MIT
