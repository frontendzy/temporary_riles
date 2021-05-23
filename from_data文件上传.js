/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：from_data文件上传.js
*   创 建 者：ZY
*   创建日期：2021年05月23日
*   描    述：
*
================================================================*/
const path = require('path');

const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
		},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
		}
})

const upload = multer({
// 	dest: './uploads/'// 存储位置
	storage
});
// 解析非常多的文件使用 any
// app.use(upload.any());

app.post('/login', (req, res, next) => {
	console.log(req.body);
	res.end("用户登陆成功～");
});
// single 上传单个文件
// array  上传多个文件
app.post('/upload', upload.single('file'), (req, res, next) => {
	// 单个文件使用 file
	// 多个文件使用 files
	// 在使用 single的情况下 如果非要使用 files 就这样使用 files[0] 取第0个文件
	console.log(req.file);
	res.end("文件上传成功～");
});

app.listen(8000, () => {
	console.log("上传服务器启动成功～");
});

/*
 * 总结：
 * 当使用 upload.any() 时， post接口内必须是多个文件的类型语法
 * 上面有注释～
 *
 * */
