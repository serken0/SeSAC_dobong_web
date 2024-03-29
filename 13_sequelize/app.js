const PORT = 8080;
const express = require("express");
const app = express();
const db = require("./models");

// middleware
app.set("views", "./views");
app.set("view engine", "ejs");
// app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터 분리
const indexRouter = require("./routes"); // const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

// 404 error
app.get("*", (req, res) => {
  res.render("404");
});

db.sequelize.sync({ force: false }).then((result) => {
  // console.log(result) //+ 동기화 결과에 대한 정보 출력
  console.log("DB 연결 성공"); //+ 동기화 완료 후 출력
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// 실습 해답 생략
