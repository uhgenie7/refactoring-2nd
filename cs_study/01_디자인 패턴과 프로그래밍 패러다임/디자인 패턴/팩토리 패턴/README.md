# 팩토리 패턴

1. 객체를 사용하는 코드에서 객체 생성 부분을 떼어내 추상화된 패턴이자 상속 관계에 있는 두 클래스에서,
   상위 클래스가 중요한 뼈대를 결정하고 하위 클래스에서 객체 생성에 관한 구체적인 내용을 결정하는 패턴

```js
const num = new Object(42);
const str = new Object("abc");
num.constructor.name; // Number
str.constructor.name; // String
```

- 다른 타입의 객체를 생성하고 있음
- 전달받은 값에 따라 다른 객체를 생성하고 인스턴스 타입을 정한다
  > 참조 Object.prototype.constructor  
  > 인스턴스의 프로토타입을 만든 Object 함수의 참조를 반환합니다. 이 속성값은 함수 자체의 참조임을 주의하세요, 함수 이름을 포함하는 문자열이 아니라. 그 값은 1, true 및 "test"와 같은 원시(primitive) 값에 대해서만 읽기 전용입니다.

```js
class Latte {
  constructor() {
    this.name = "latte";
  }
}
class Espresso {
  constructor() {
    this.name = "Espresso";
  }
}

class LatteFactory {
  static createCoffee() {
    return new Latte();
  }
}

class EspressoFactory {
  static createCoffee() {
    return new Espresso();
  }
}

const factoryList = { LatteFactory, EspressoFactory };

class CoffeeFactory {
  static createCoffee(type) {
    const factory = factoryList[type];
    return factory.createCoffee();
  }
}

const main = () => {
  // 라떼 커피를 주문한다.
  const coffee = CoffeeFactory.createCoffee("LatteFactory");
  // 커피 이름을 부른다.
  console.log(coffee.name); // latte
};

main();
```

- CoffeeFactory : 상위 클래스. 뼈대.
- LatteFactory : 하위 클래스.
- LatteFactory에서 생성한 인스턴스를 CoffeeFactory에 주입하고 있음
- static : 클래스의 정적 메서드 정의.
  - 클래스의 인스턴스 없이 호출이 가능
  - 메모리를 절약
  - 개별 인스턴스에 묶이지 않으며 클래스 내의 함수를 정의할 수 있다.
