// TODO: 컨트롤러 코드
const User = require("../model/User");
// GET /user
exports.main = (req, res) => {
  res.render("index");
};
// GET /user/signin
exports.get_signin = (req, res) => {
  res.render("signin");
};
// GET /user/signup
exports.get_signup = (req, res) => {
  res.render("signup");
};

// POST /user/signup
// 회원가입 요청
exports.post_signup = (req, res) => {
  console.log("controller", req.body); //{userid, pw, name}
  User.post_signup(req.body, () => {
    res.end();
  });
};

// POST /user/signin
// 로그인 요청
exports.post_signin = (req, res) => {
  console.log("controller", req.body); // {userid, pw}
  User.post_signin(req.body, (result) => {
    console.log("controller", result);
    if (result.length > 0) {
      // 로그인 성공 시, true
      // res.send({isLogin:true, userInfo:result[0]}); //+ 프론트에서도 사용하고 싶으면 이런 식으로 쓰면 됨. 지금은 여부만 궁금하니 패스
      res.send(true);
    } else {
      // 로그인 실패 시, false
      res.send(false);
    }
  });
};

// POST /user/profile
// 프로필 페이지 요청
exports.post_profile = (req, res) => {
  console.log("req.body", req.body); // {userId}
  User.post_profile(req.body.userid, (result) => {
    console.log(result); // {id, userid, name, pw}
    res.render("profile", { data: result });
  });
};

// POST /user/profile/edit
// 회원 정보 수정
exports.edit_profile = (req, res) => {
  console.log("controller", req.body);
  User.edit_profile(req.body, () => {
    res.end();
  });
};

// POST /user/profile/delete
// 회원 정보 삭제
exports.delete_profile = (req, res) => {
  console.log("controller", req.body);
  User.delete_profile(req.body.id, () => {
    res.end();
  });
};
