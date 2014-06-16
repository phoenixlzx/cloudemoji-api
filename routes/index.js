/*
 * CloudEmoji API Server Routing controller
 * 2014-06-16 19:09 UTC+8 phoenixlzx <i@phoenixlzx.com>
 * License MIT | http://opensource.org/licenses/MIT
 * */

var express = require('express');
var router = express.Router();

var config = require('../config');
var ipaddr = require('ipaddr.js');

router.get('/', checkip, checkgetperm, function(req, res) {
    res.send(200, 'ლ(╹◡╹ლ)');
});

module.exports = router;

// check client permission for requests
function checkip(req, res, next) {

    if (config.public_query) {

        return next();

    } else {

        var client_ip = ipaddr.parse(req.headers['x-forwarded-for'] || req.connection.remoteAddress);

        if (config.ip_whitelist[0]) {
            config.ip_whitelist.forEach(function(iprange) {
                var ip = ipaddr.parse(iprange.slice(0, iprange.indexOf('/'))),
                    range = parseInt(iprange.slice(iprange.indexOf('/') + 1));
                if (client_ip.match(ip, range)) {
                    return next();
                }
            });
            return res.send(401);
        }

    }

}
function checkgetperm(req, res, next) {

    if (config.public_query) {

        return next();

    } else {

        if (req.query.apikey !== config.apikey) {
            return res.send(401);
        } else {
            next();
        }

    }

}

function checkpostperm(req, res, next) {

    if (req.body.apikey !== config.apikey) {
        return res.send(401);
    } else {
        next();
    }

}
