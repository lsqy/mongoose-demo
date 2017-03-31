'use strict'

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoosedemo');

const db = mongoose.connection; //可以获得一下当前的连接实例

/*
 * 检测下是否连接成功
 */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected");
});


/*
 * 对于mongoose，一切都来源于Schema（可以称为模式）
 * 下面我们获得一下它的引用，并且定义一个lsqy的Schema，这样我们就已经得到了有一个name属性的Schema
 */
const lsqySchema = mongoose.Schema({
    name: String
});

lsqySchema.methods = {
    speak: function() {
        var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
        console.log(greeting);
    }
};




/*
 * 将Schema编译到一个model中
 */
const Lsqy = mongoose.model('Lsqy', lsqySchema);

/*
 * 一个model是我们构建文档的一个类，这样每个lsqy就都具有在lsqySchema中声明的属性和方法了。
 */
const lsqy = new Lsqy({ name: 'lsqyun' });
// console.log(lsqy.name);
lsqy.speak();
lsqy.save(function (err, lsqy) {
  if (err) return console.error(err);
  lsqy.speak();
});

/*
 * 查找全部
 */
Lsqy.find(function (err, lsqy) {
  if (err) return console.error(err);
  // console.log(lsqy);
});

/*
 * 根据具体条件查询
 */
Lsqy.find({ name: "lsqyun" },function (err, lsqy) {
  if (err) return console.error(err);
  console.log(lsqy);
});
