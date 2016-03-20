## Клиент кассы

### Установка

1. [Ставим nodejs](https://nodejs.org/en/download/package-manager/)
2. Ставим webpack глобально: `npm install -g webpack webpack-dev-server`
3. клонируем этот репозиторий: `git clone git@github.com:kofe-i-knigi/kik-client.git`
4. `cd kik-client`
5. `npm install`
6. `npm start`
7. открыть в браузере http://localhost:8080
8. ничего не забыл?

### N.B.

1. Клиент пишется с использованием кучи фич [ES6](http://es6-features.org/) и компилируется babel
2. прикручен css от adminLTE, но самих тамошних шаблонов нет - таскай из https://github.com/almasaeed2010/AdminLTE
3. самый важный компонент в приложении - ui-router. Нужно знать, как он работает: https://github.com/angular-ui/ui-router
