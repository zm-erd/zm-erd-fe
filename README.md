# zm-erd-fe

# 개발 메뉴얼

1. `npm run lint`:
    - 이 명령어는 프로젝트의 코드를 ESLint를 사용하여 검사합니다.
    - Next.js의 기본 lint 설정을 사용합니다.
    - 코드의 문제점을 찾아내지만, 자동으로 수정하지는 않습니다.
    - 주로 코드 품질 문제, 잠재적 버그, 스타일 가이드 위반 등을 확인합니다.

2. `npm run lint:fix`:
    - 이 명령어도 ESLint를 사용하여 코드를 검사하지만, 자동으로 수정 가능한 문제들을 수정합니다.
    - `--fix` 옵션이 포함되어 있어, 간단한 코드 스타일 문제나 일부 규칙 위반을 자동으로 수정합니다.
    - 모든 문제를 해결하지는 못하지만, 많은 일반적인 issues를 자동으로 수정할 수 있습니다.

3. `npm run lint:strict`:
    - 이 명령어는 더 엄격한 lint 검사를 수행합니다.
    - `'*/**/*.{js,jsx,ts,tsx}'` 패턴을 사용하여 프로젝트의 모든 JavaScript 및 TypeScript 파일을 검사합니다.
    - 일반적인 lint 검사보다 더 광범위하고 엄격한 규칙을 적용할 수 있습니다.
    - 프로젝트의 모든 파일에 대해 일관된 코드 품질을 유지하는 데 유용합니다.

4. `npm run prettier`:
    - 이 명령어는 Prettier를 사용하여 코드의 형식을 정리합니다.
    - `--write` 옵션이 포함되어 있어, 파일을 직접 수정합니다.
    - `*/**/*.{js,jsx,json,ts,tsx,scss,css,md}` 패턴을 사용하여 다양한 파일 형식을 대상으로 합니다.
    - 코드 스타일(들여쓰기, 줄 바꿈, 따옴표 등)을 일관되게 유지하는 데 도움을 줍니다.
    - ESLint가 코드의 품질과 잠재적 문제를 다룬다면, Prettier는 순수하게 코드의 형식을 다룹니다.

이러한 명령어들을 함께 사용하면:
- `lint`와 `lint:strict`로 코드 품질 문제를 확인합니다.
- `lint:fix`로 자동 수정 가능한 문제들을 해결합니다.
- `prettier`로 코드 형식을 일관되게 유지합니다.

개발 과정에서 이 명령어들을 정기적으로 실행하면, 코드 품질을 높이고 팀 내에서 일관된 코딩 스타일을 유지하는 데 큰 도움이 됩니다.

```shell
npm run lint
npm run lint:fix
npm run lint:strict
npm run prettier
```
