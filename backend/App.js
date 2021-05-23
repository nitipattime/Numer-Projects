const express = require("express");
const cors = require("cors");
const database = require("./database.json");
const app = express();
const port = process.env.PORT || 5000;

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc"); // สร้างคำจำกัดความ OpenAPI จากความคิดเห็น JSDoc (สร้างTitle)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Example API",
      description: "Project API Information",
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["route.js"] // path ไปยังไฟล์ที่มีการดึง API
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// const corsOptions = {
//   origin: ["http://localhost:80","http://localhost:3000"],
//   optionsSuccessStatus: 200,
// };

//// function การใช้งาน
//// middleware คือตัวกรอง req ก่อนที่จะเข้า

app.use(express.json()); // ให้อ่านไฟล์ที่เป็นรูปแบบ Json ได้
app.use(express.urlencoded({ extended: true })); 
app.use(cors()) // คือการให้Cross Origin Resource Sharing อนุยาดport 


app.get("/database",  (req, res) => { // res แสดงผล
  res.json(database);
});

app.get("/database/:id", (req, res) => {
  const resalt =  database.filter(value =>value.name == req.params.id)
  res.json(resalt[0])
  // console.log(database.filter(database =>database.fx)); // กรองfile.json โดยที่ file.json มีตัวแปรที่เปน fx
  // console.log(database.filter(database =>database.name == req.params.name)); // กรองfile.json โดยที่ file.json มีตัวแปรที่เปน name == name ที่ req
  // console.log(resalt);
  // console.log(resalt[0]);

  // console.log(res.json(resalt[0]));
  // console.log(" ");
  // console.log(resalt[0]);

  // if(resalt.length > 0){
  // res.json(resalt[0])
  // }else{
    // res.json({})
  // }
});

app.listen(port
  , () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);