# 이터레이터 패턴

- 이터레이터(iterator)을 사용하여 컬렉션의 요소들에 접근하는 디자인 패턴
- 순회할 수 있는 여러 가지 자료형의 구조와는 상관없이 이터레이터라는 하나의 인터페이스로 순회가 가능

```js
const mp = new Map();
mp.set("a", 1);
mp.set("b", 2);
mp.set("c", 3);
// Map(3) {'a' => 1, 'b' => 2, 'c' => 3}

const st = new Set();
st.add(1);
st.add(2);
st.add(3);
// Set(3) {1, 2, 3}

for (let a of mp) console.log(a);
for (let a of st) console.log(a);

/*
a, b, c
[ 'a', 1 ]
[ 'b', 2 ]
[ 'c', 3 ]
1
2
3
*/
```

## Map

1. Map은 Object와 상당히 유사한 순회 가능한 객체이다.
2. [key, value]의 형태로 이뤄져있으며, 선언하거나 추가시 이러한 형태로 값을 넣어주어야한다.
3. [key, value] 형태에서 key 부분이 어떠한 타입이어도 상관 없다. Object는 string과 symbol만 가능하다.
4. length가 아닌 size로 Map 값의 크기를 알 수 있다.
5. 여러 메소드가 있는데 `map.get('a')`과 같은 방식으로 값을 가져올 수 있으며, 전체 key값이나 value값을 가져오는 방식 또한 메소드로 갖고 있다. map.keys(), map.values()
6. Map의 요소를 배열로 받을 수 있는 방법으로 `[...Map] // return [['a', 1], ['b', 2]]` 스프레드 연산자를 사용할 수 있으며, `for (let [key, value] of map` 또는 `for (let keyvalue of map)`의 형태로 key값과 value값을 순회하며 접근할 수 있다. (전자는 key와 value를 destructuring으로 각각 접근 할 수 있는 것)
7. for in을 사용한 순회방식은 undefined만 리턴한다.
8. Object와 마찬가지로 동일한 Key값을 가진 값은 맨 마지막 요소만 값으로 갖는다. `new Map([['a', 1], ['a', 2]]) // return {"a" => 1}`
9. Object는 key값이 숫자로 된 string인 경우, 그 key값이 숫자인 다른 property와 자동적으로 정렬이 일어나지만, Map은 내가 설정한 순서 그대로를 유지한다.
10. 배열과 다르게 숫자와 숫자로 된 string이 key값일 경우 엄격하게 검사한다.
    `Map([1, 'b']) // map.has('1') return false`

## Set

1. 배열과 유사한 순회 가능한 객체이다.
2. 배열처럼 value로만 이뤄져있지만, 값이 키와 동일하게 설정되어있다.

```js
cosnt set = new Set(['a', 'b', 'c'])
set.keys() // return {'a', 'b', 'c'}
set.values() //return {'a', 'b', 'c'}
```

3. 값은 중복될 수 없으며, 중복될 경우 가장 앞의 값을 제외하고 삭제된다.
   `new Set([1, 2, 1]) // return {1, 2}`
4. 배열처럼 `set[1]`이나 `set.value(1) // 메서드 자체가 없음`로 중간 값을 확인할 수 없으며, 전체를 순회하는 방식으로만 사용 가능하다.
5. 이 또한 size 메소드로 length대신 크기를 확인할 수 있다.
6. splice를 사용하지 않고 `delete(value)` 메소드를 사용해 손쉽게 배열의 중간 값을 잘라낼 수 있다. `delete`메소드는 `true` or `false` 값을 리턴한다.
7. 배열의 값이 있는지 확인하려는 경우, 배열의 indexOf나 includes를 통해 확인하는 것 보다 `set.has(value)`로 확인하는 것이 더욱 빠르다. 리턴 값은 `true` or `false`이다.
8. `Set.prototype.add()` add() 메서드는 Set 개체의 맨 뒤에 주어진 value의 새 요소를 추가합니다.

> 이터레이터 프로토콜
>
> - 이터레블한 객체들을 순회할 때 쓰이는 규칙

> 이터러블한 객체
>
> - 반복 가능한 객체로 배열을 일반화한 객체
