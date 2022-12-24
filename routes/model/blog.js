const sql = require('./db');


const Blog = function (blog) {
    this.blogId = blog.blogId
    this.title = blog.title
    this.imagePath = blog.imagePath
    this.logoPath = blog.logoPath
    this.body = blog.body
};

Blog.createBlog = (req, res) => {

    let blog = req.body.blog;
    blog.imagePath = '';
    blog.logoPath = '';

    if (blog.blogId == undefined || blog.blogId == 0) {

        sql.query(`INSERT INTO blog(title,body,imagePath,logoPath) values(?,?,?,?)`,
            [blog.title,blog.body,blog.imagePath,blog.logoPath],
            function (err, data) {
                try {
                    if (err) {
                        res.status(200).send({
                            "status": "error",
                            "response": {
                                "error":err,
                                "message":"Error in Adding Blog"
                            }
                        })
                    }
                    else {
                        res.status(200).send({
                            "status": "success",
                            "response": {
                                "blogId":data.insertId,
                                "message":"Blog Added"
                            }
                        })
                    }

                }
                catch (error) {
                    console.log({
                        "status": "success",
                        "response": "Error in adding Blog"
                    })
                }
            })

    }
    else {

    }


}


Blog.getBlog = (req, res) => {

    let blogId = req.body.blogId;

    if (blogId != undefined) {

        sql.query(`SELECT * from blog where blogId = ${blogId}`,
            function (err, data) {
                try {
                    console.log(err, data)
                    if (err) {
                        res.status(200).send({
                            "status": "error",
                            "response": "Error in getting Blog"
                        })
                    }
                    else {
                        res.status(200).send({
                            "status": "success",
                            "response": data[0]
                        })
                    }

                }
                catch (error) {
                    console.log("Error in post blog")
                }
            })

    }
    else {

        res.status(200).send({
            "status": "error",
            "response": "BlogId not sent in request parameter"
        })

    }


}

module.exports = Blog;