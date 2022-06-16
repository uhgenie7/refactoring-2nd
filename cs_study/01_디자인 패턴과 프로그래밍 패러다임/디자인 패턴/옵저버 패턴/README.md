# 옵저버 패턴

1. 주체가 어떤 객체의 상태 변화를 관찰하다가 상태 변화가 있을 때마다 메서드를 통해 옵저버 목록에 있는 옵저버들에게 변화를 알려줌

- 주체: **객체**의 상태 변화를 보고 있는 관찰자
- 옵저버: 이 객체의 상태 변화에 따라 전달되는 메서드 등을 기반으로 '추가 변화 사항'이 생기는 객체들
- MVC 패턴에 사용
  - model: 주체
  - view: 옵저버, 변경사항이 생겨 update() 메서드로 옵저버인 뷰에 알려줌
  - controller 작동

2. 옵저버 패턴

- 프록시(Proxy) 객체
  > 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용합니다.  
  > **구문:** new Proxy(target, handler);
  - 자바스크립트에서의 프록시 객체는 두 개의 매개변수를 가진다.
    - target: 프록시할 대상
    - handler: 프록시 객체의 target 동작을 가로채서 정의할 동작이 정해져 있는 함수

```js
const handler = {
  get: function (target, name) {
    return name === "name" ? `${target.a} ${target.b}` : target[name];
  },
};

const p = new Proxy({ a: "KUN", b: "IS YOU" }, handler);
console.log(p.name);
```

- new Proxy로 선언한 객체의 a, b라는 속성에 특정 문자열을 담아, handler에 "name"이라는 속성에 접근할 때 a, b를 합쳐 문자열을 만들어라.
- 변수 `p`에 name이라는 속성이 없어도, p.name으로 name속성에 접근하려고 할 때, 그 부분을 가로채 문자열을 만들어 변환한다.

3. 프록시 객체를 통해 옵저버 패턴 구현하기

```js
function createReactiveObject(target, callback) {
  const proxy = new Proxy(target, {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        callback(`${prop}가 [${prev}] >> [${value}] 로 변경되었습니다`);
      }
      return true;
    },
  });
  return proxy;
}

const a = {
  형규: "솔로",
};

const b = createReactiveObject(a, console.log);

b.형규 = "솔로"; //
b.형규 = "바보"; // 형규가 [솔로] >> [바보] 로 변경되었습니다
b.형규 = "천재"; // 형규가 [바보] >> [천재] 로 변경되었습니다
```

- get() 함수: 속성과 함수에 대한 접근을 가로챈다.
  - 프로퍼티 읽기를 가로채려면 handler에 get(target, property, receiver) 메서드가 있어야 함
  - target – 동작을 전달할 객체로 new Proxy의 첫 번째 인자입니다.
  - property – 프로퍼티 이름
  - receiver – 타깃 프로퍼티가 getter라면 receiver는 getter가 호출될 때 this 입니다. 대개는 proxy 객체 자신이 this가 됩니다. 프락시 객체를 상속받은 객체가 있다면 해당 객체가 this가 되기도 하죠.
- has() 함수: in 연산자의 사용을 가로챈다.
- set() 함수: 속성에 대한 접근을 '가로채' 속성을 감시할 수 있음 (프로퍼티 값 검증하기)
  - set(target, property, value, receiver):
  - target – 동작을 전달할 객체로 new Proxy의 첫 번째 인자입니다. `{형규: '솔로'}`
  - property – 프로퍼티 이름 `형규`
  - value – 프로퍼티 값
  - receiver – get 트랩과 유사하게 동작하는 객체로, setter 프로퍼티에만 관여합니다.
    > true를 잊지 말고 반환해주세요.  
    > set 트랩을 사용할 땐 값을 쓰는 게 성공했을 때 반드시 true를 반환해줘야 합니다. true를 반환하지 않았거나 falsy한 값을 반환하게 되면 TypeError가 발생합니다.
