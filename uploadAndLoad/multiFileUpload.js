/*
 如下是支持单个或多个文件上传的源码
 @author kongzhi
*/
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');

const app = new Koa();

/* 
  koa-body 对应的API及使用 看这篇文章 http://www.ptbird.cn/koa-body.html
  或者看 github上的官网 https://github.com/dlau/koa-body
*/
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
    multipart: true // 是否支持 multipart-formdate 的表单
  }
}));

const uploadUrl = "http://localhost:3001/static/upload";

router.get('/', (ctx) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/upload.html');
  ctx.body = fs.createReadStream(pathUrl);
});
/*
 flag: 是否是多个文件上传
*/
const uploadFilePublic = function(ctx, files, flag) {
  const filePath = path.join(__dirname, '/static/upload/');
  let file,
    fileReader,
    fileResource,
    writeStream;

  const fileFunc = function(file) {
    // 读取文件流
    fileReader = fs.createReadStream(file.path);
    // 组装成绝对路径
    fileResource = filePath + `/${file.name}`;
    /*
     使用 createWriteStream 写入数据，然后使用管道流pipe拼接
    */
    writeStream = fs.createWriteStream(fileResource);
    fileReader.pipe(writeStream);
  };
  const returnFunc = function(flag) {
    console.log(flag);
    console.log(files);
    if (flag) {
      let url = '';
      for (let i = 0; i < files.length; i++) {
        url += uploadUrl + `/${files[i].name},`
      }
      url = url.replace(/,$/gi, "");
      ctx.body = {
        url: url,
        code: 0,
        message: '上传成功'
      };
    } else {
      ctx.body = {
        url: uploadUrl + `/${files.name}`,
        code: 0,
        message: '上传成功'
      };
    }
  };
  if (flag) {
    // 多个文件上传
    for (let i = 0; i < files.length; i++) {
      const f1 = files[i];
      fileFunc(f1);
    }
  } else {
    fileFunc(files);
  }
  
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        returnFunc(flag);
      }
    });
  } else {
    returnFunc(flag);
  }
}

// 上传单个或多个文件
router.post('/upload', (ctx) => {
  let files = ctx.request.files.file;
  const fileArrs = [];
  if (files.length === undefined) {
    // 上传单个文件，它不是数组，只是单个的对象
    uploadFilePublic(ctx, files, false);
  } else {
     uploadFilePublic(ctx, files, true);
  }
});

app.use(static(path.join(__dirname)));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001, () => {
  console.log('server is listen in 3001');
});