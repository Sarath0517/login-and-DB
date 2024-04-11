import express  from "express";
import mysql from "mysql";
import cors from "cors";
import { NavLink } from "react-router-dom";

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1234",
    database: "cookzilla",
    port: 4500
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const dob = req.body.dob;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    con.query("INSERT INTO login (username, dob, email, password) VALUES (?, ?, ?, ?)",[username,dob,email,password],
    (err, result) => {
        if(err){
            console.log(err);
            res.send({result});
        }else{
            res.send({message: "Enter valid details"})
        }
    }
    )
})


app.post('/login', (req, res) => {
    const username = req.body.username;
    const dob = req.body.dob;
    const email = req.body.email;
    const password = req.body.password;

     con.query("SELECT * FROM login WHERE email = ? AND password = ?",[email,password],
     (err, result) => {
         if(err){
             res.setEncoding({err: err});
         }else{
             if(result.length > 0){
                 res.send(result);
             }
        
         }
     }
     )
})


app.listen(8081, () => {
    console.log("backend is running");
})