const sql = require('./db');

const Comments = function (comment) {
    this.comment = comment.comment
};

Comments.getComments = (req, res) => {
    sql.query(`SELECT * FROM comments`,function(err,data){
        if (err) {
            res.status(200).send("Error in fetching comment")
        }
        else{
            res.status(200).send(data);
        }
      
    })
}


Comments.postComment = (req, res) => {

    console.log(req.body)
    sql.query(`INSERT INTO comments(body,author,addedDate,blogId) values('${req.body.comment.body}','${req.body.comment.author}',CURDATE(),0)`, function (err, data) {
        try {
            console.log(err, data)
            if (err) {
                res.status(200).send("Error in adding comment")
            }
            else{
                res.status(200).send("Comment Added")
            }
            
        }
        catch (error) {
            console.log("Error in post comment")
        }
    })
}

 Comments.addAndGetViews = (req,res) => {
    console.log(req.body)
    sql.query(`call addAndGetViews(${req.body.blogId});`,function(err,data){
        if(err){
            res.status(200).send({"status":"error",
                                    "message":-1})
        }
        else{
           
            res.status(200).send({"status":"success",
                                    "message":data[0][0].viewCount})
        }
    })

 }













module.exports = Comments