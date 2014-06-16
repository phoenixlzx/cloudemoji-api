/*
 * CloudEmoji API Server Routing controller
 * 2014-06-16 19:09 UTC+8 phoenixlzx <i@phoenixlzx.com>
 * License MIT | http://opensource.org/licenses/MIT
 * */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
