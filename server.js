const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");

const app = express();

const port=process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended:true}))

app.use(bodyParser.json());

//MySQL
const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'jamil',
    password:'',

    database:'node_mysql_one'
})

//get  whole 
app.get('',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            //throw err;
            console.log(err);
        }
        console.log(`connected as id ${connection.threadId}`);

        const q='SELECT name,id FROM students'
        connection.query(q,(err,rows)=>{
            connection.release();

            if(!err)    {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
})



/// Get information by Id
app.get('/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            //throw err;
            console.log(err);
        }
        console.log(`connected as id ${connection.threadId}`);

        const q='SELECT name,id FROM students WHERE id=?'
        connection.query(q, [req.params.id] ,(err,rows)=>{
            connection.release();

            if(!err)    {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
})




/// Delete information by Id
app.get('/delete/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            //throw err;
            console.log(err);
        }
        console.log(`connected as id ${connection.threadId}`);

        const q='DELETE  FROM students WHERE id=?'
        connection.query(q, [req.params.id] ,(err,rows)=>{
            connection.release();

            if(!err)    {
                res.send(`Record of id ${req.params.id} is deleted...`);
            }
            else {
                console.log(err);
            }
        })
    })
})




/// add information
app.post('/post/',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            //throw err;
            console.log(err);
        }
        console.log(`connected as id ${connection.threadId}`);
        
        const q='INSERT INTO students SET ?'
        connection.query(q,[req.body],(err,rows)=>{
            connection.release();

            if(!err)    {
                res.send(`Record of id ${req.body.id} is added...`);
            }
            else {
                console.log(err);
            }
        })
    })
})



/// update information
app.put('/update/',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            //throw err;
            console.log(err);
        }
        console.log(`connected as id ${connection.threadId}`);
        const {id,name}=req.body;

        const q='UPDATE students SET name=? WHERE id=?'
        connection.query(q,[name,id],(err,rows)=>{
            connection.release();

            if(!err)    {
                res.send(`Record of id ${req.body.id} is updated...`);
            }
            else {
                console.log(err);
            }
        })
    })
})





app.listen(port,()=>{
    console.log(`Listen on port ${port}`);
})