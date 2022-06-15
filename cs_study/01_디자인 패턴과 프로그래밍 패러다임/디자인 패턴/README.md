# 싱글톤 패턴

1. 하나의 클래스에 하나의 인스턴스만 가지는 패턴
2. 하나의 인스턴스를 다른 모듈들이 공유하며 사용
3. 단, 의존성이 높아짐

```js
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
  getInstance() {
    return this.instance;
  }
}
const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

```js
const URL = "mongodb://localhost:27017/kundolapp";
const createConnection = (url) => ({ url: url });
class DB {
  constructor(url) {
    if (!DB.instance) {
      DB.instance = createConnection(url);
    }
    return DB.instance;
  }
  connect() {
    return this.instance;
  }
}
const a = new DB(URL);
const b = new DB(URL);
console.log(a === b); // true
```

```js
// 메인 모듈
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "example.org",
  user: "genie",
  password: "secret",
  database: "genie",
});
pool.connect();

// 모듈 A
pool.query(query, function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

// 모듈 B
pool.query(query, function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
```

- 해당 인스턴스를 기반으로 쿼리를 보내는 형식으로 쓰임

## 단점

1. TDD가 힘듬

   - 단위 테스트는 독립적이어야 함.
   - 테스트는 어떤 순서로든 실행할 수 있어야 함.

2. 의존성이 강함

   - 모듈 간 결합이 강함
   - 존속성
   - A가 B에 의존성이 있다는 것은 B의 변경사항에 A도 변함

## 해결 방안

1. 의존성 주입

   - 메인 모듈이 직접 하위 모듈에 대한 의존성을 주기 보다, 중간에 의존성 주입자가 이를 가로채 메인 모듈이 간접적으로 의존성을 주입.
   - 디커플링 된다

2. 의존성 주입의 장점

   - 모듈들을 쉽게 교체할 수 있어서 테스팅하기 쉽다.
   - 마이그레이션 하기 수월하다.

3. 의존성 주입의 단점

   - 모듈이 분리되어 클래스 수가 늘어나 복잡성이 증가됨
   - 런타임 패널티 생김

4. 의존성 주입의 원칙
   - 상위 모듈은 하위 모듈에서 아무것도 가져오면 안 됨
   - 추상화에 의존해야 함
   - 추상화는 세부사항에 의존하지 말아야 함
