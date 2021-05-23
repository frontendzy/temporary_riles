/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：test.js
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
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
		},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
		}
});
const upload = multer({
	storage
});

// app.use(upload.any());
// app.use(upload.fields());

app.post('/upload',upload.array('file', 10), (req, res, next) => {
	let files = req.files;
	console.log(files);
	res.end("上传成功");
});

app.listen(8000, () => {
	console.log('test start')
});


