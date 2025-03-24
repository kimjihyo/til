
# Oklch, RGB와 HSL의 뒤를 잇다


[CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)에서 oklch()라는 색상을 선언하는 함수가 추가됐다. 이 함수는 Oklab color space 방식으로 색상을 표현한다. 


2023년 5월 부터 최신 디바이스와 브라우저 버전에서 사용가능하다.


## 사용법


`oklch(L C H)` 또는 `oklch(L C H / a)` 로 사용가능하며

- `L` is _perceived_ lightness (`0% - 100%`). “Perceived” means that it has consistent lightness for our eyes, unlike `L` in `hsl()`.
- `C` is chroma, from gray to the most saturated color.
- `H` is the hue angle (`0360`).
- `a` is opacity (`01` or `0100%`

## OKLCH의 장점

- 디자이너들은 색상을 표현하는 공식을 지정해 몇 가지 색상만 고르면 컬러 팔레트는 지정된 공식에 따라서 자동적으로 생성이되어 일일히 모든 색상을 고를 필요가 없다.
- P3 컬러를 지원한다. 이 말인 즉슨, 예를 들면 요즘 나오는 새로운 디바이스들은 기존의 sRGB 모니터가 표현하는 색보다 더 많은 범위의 색을 표현할 수 있다. OKLCH를 사용해서 이 새로운 색들까지 지정 가능하다.
- rgb() 나 hex (#ca0000) 보다 OKLCH는 사람이 읽기 편하다.
- hsl()에서는 상대적 밝기가 고려되지 않아 상대 채도가 일관적이지 않다. OKLCH는 이를 보완한다.
