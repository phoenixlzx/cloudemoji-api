/**
 * 2014-06-16 20:33 UTC+8
 * Phoenix Nemo <i@phoenixlzx.com>
 * License MIT | http://opensource.org/licenses/MIT
 */

/*
* emoji document
* {
*   _id: ObjectID(),
*   emoji: 'ლ(╹◡╹ლ)',
*   desc: {
*       'ja': '説明',
*       'en': 'description',
*       'zh': '描述'
*   },
*   shortcuts: [
*       'typingkey1',
*       'typingkey2'
*   ]
* }
* */

var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongodb, { db: { native_parser: true, w : 1 } }, function(err, db) {

    if (err) {
        throw err;
    }

    var collection = db.collection('emoji');

    exports.update = function(emoji, callback) {

        collection.update({
            emoji: emoji.emoji
        }, {
            emoji: emoji.emoji,
            desc: emoji.desc,
            keys: emoji.shortcuts
        }, {
            upsert: true
        }, function(err) {

            if (err) {
                console.log(err);
                return callback(err);
            }

            collection.ensureIndex({
                emoji: 1,
                keys: 1
            }, function(err) {

                if (err) {
                    console.log(err);
                    return callback(err);
                }

                callback();

            });

        });
    };

    exports.remove = function(emojiId, callback) {

        collection.remove({
            _id: ObjectID(emojiId)
        }, function(err) {
            if (err) {
                return callback(err);
            }

            callback();
        });

    };



});
