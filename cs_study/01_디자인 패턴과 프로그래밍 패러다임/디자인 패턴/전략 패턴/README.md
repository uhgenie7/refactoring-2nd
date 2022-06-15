# 전략 패턴 (정책 패턴)

1. 객체의 **행위**를 바꾸고 싶은 경우, 전략이라고 부르는 **캡슐화한 알고리즘**을 컨텍스트 안에서 바꿔주며 상호 교체가 가능하게 만드는 패턴
   > 컨텍스트?  
   > 상황, 맥락, 문맥을 의미하며 개발자가 어떤 작업을 완료하는데 필요한 모든 관련 정보

```js
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
```
