<h1 align="center">Individual_Work_JS1</h1>

# 1. Как запускать проект
Для того чтоб запрустить проект нам нужен Node.js
проверяем есть ли он у нас на компьютере при помощи CMD:
![checkNode](https://i.imgur.com/nKagNqW.png)
Если у нас установлен Node.js,  то качаем наш проект
и скидываем его в созданную папку
далее мы создаем терминал и заходим в него и прлописываем следущую фразу: ```npm start```
и терминале будет наш проект!

# 2. Описание индивидуальной работы
У нас есть **json** с транзакциями где мы слаживаем все транзакции ищем месяц где больше транзакции и так же каких транзакций больше всего, то есть работа с транзакциями

# 3. Краткая документация к проекту
Проект имеет множество функции которые работают с транзакциями они слаживают, выводят большее, добьавляют и еще выводят транзакции с отпределенной даты по опредленную дату

# 4. Примеры использования проекта с приложением скриншотов или фрагментов кода
1. Добавляем транзакции в наш JSON
```js
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /* в файле с транзакциями */

        transaction.addTransaction({
        transaction_id: '148',
        transaction_date: '2001-21-08',
        transaction_amount: 1000.0,
        transaction_type: 'Credit',
        transaction_description: 'Ticket #8934 POLICE',
        merchant_name: 'Police Ticket',
        card_type: 'Mir',
    });
```
2. Функция выывода всех транзакции
```js
    getAllTransactions() {
        return this.transactions.map((item) => {
            const obj = { ...item };
            obj.string = () => JSON.stringify(obj);
            return obj;
        });
    }
```
3. Функция вывода уникальных транзакций
```js
    getUniqueTransactionType() {
        const uniqueTypeSet = new Set();

        this.transactions.forEach((transactions => {
            uniqueTypeSet.add(transactions.transaction_type)
        }));

        return Array.from(uniqueTypeSet);
    }
```
4. Функция подсчета всех транзакций
```js
    calcTotalAmount() {
        return this.transactions.reduce(
            (total, transaction) => total + transaction.transaction_amount,
            0
        );
    }
```
5. Функция подсчета транзакций по дате
```js
calcAmountDate(year, month, day) {
        let totalAmountDate = 0;

        this.transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            const transactionYear = year ?? transactionDate.getFullYear();
            const transactionMonth = month ?? transactionDate.getMonth() + 1;
            const transactionDay = day ?? transactionDate.getDate();

            if (
                transactionDate.getFullYear() === transactionYear &&
                transactionDate.getMonth() + 1 === transactionMonth &&
                transactionDate.getDate() === transactionDay
            ) {
                totalAmountDate += transaction.transaction_amount;
            }
        });

        return totalAmountDate;
    }
```
6. Функция вывода транзакции по типу
```js
    getTransactionByType(type) {
        return this.transactions.filter(
            (transaction) => transaction.transaction_type === type
        );
    }
```
7. Функция получения транзакций в опредленном интревале дат
```js
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            const startDateTime = startDate ? new Date(startDate) : null;
            const endDateTime = endDate ? new Date(endDate) : null;

            if (startDateTime && transactionDate < startDateTime) return false;
            if (endDateTime && transactionDate > endDateTime) return false;

            return true;
        });
    }
```
8. Функция получения транзакции по мету где была проведена транзакция
```js
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(
            (transaction) => transaction.merchant_name === merchantName
        );
    }
```
9. Функция получения средней транзакции
```js
   calculateAverageTransactionAmount() {
        const totalAmount = this.calcTotalAmount();
        const numberOfTransaction = this.transactions.length;

        if (numberOfTransaction === 0) return 0;

        return totalAmount / numberOfTransaction;
    }
```
10. Функция получения транзакции в интервале минимальной и максимальной
```js
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter((transaction) => {
            const transactionAmount = transaction.transaction_amount;
            return transactionAmount >= minAmount && transactionAmount <= maxAmount;
        })
    }
```
11. Функция подсчета дебитовых транзакци
```js
    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionByType('Debit');
        return debitTransactions.reduce((total, transaction) => {
            return total + transaction.transaction_amount;
        }, 0);
    }
```
12. Функция вывода транзакции после даты
```js
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate < targetDate;
        });
    }
```
13. Функция вывода транзакции по id
```js
    getTransactionById(id) {
        return this.transactions.filter(
            (transaction) => transaction.transaction_id === id
        );
    }
```
14. Возврат массива с описаниями функциями
```js
    mapTransactionDescriptions() {
        return this.transactions.map(
            (transaction) => transaction.transaction_description
        );
    }
```
15. Функция которая возвращает нам месяц где больше всего транзакций
```js
    findMostTransactionsMonth() {
        const transactionsByMonth = {};

        this.transactions.forEach((transaction) => {
            const [year, month] = transaction.transaction_date.split("-");
            const monthKey = `${year}-${month}`;

            if (!transactionsByMonth[monthKey]) {
                transactionsByMonth[monthKey] = 1;
            } else {
                transactionsByMonth[monthKey]++;
            }
        });

        let maxMonth = null;
        let maxCount = -1;

        for (const monthKey in transactionsByMonth) {
            if (transactionsByMonth[monthKey] > maxCount) {
                maxCount = transactionsByMonth[monthKey];
                maxMonth = monthKey;
            }
        }

        return maxMonth;
    }
```
16. Функция которая возвращает месяц где больше всего дебитовых транзакций
```js
    findMostDebitTransactionMonth() {
        const transactionsByMonth = {};

        this.getTransactionByType('debit').forEach((transaction) => {
            const [year, month] = transaction.transaction_date.split("-");
            const monthKey = `${year}-${month}`;

            if (!transactionsByMonth[monthKey]) {
                transactionsByMonth[monthKey] = 1;
            } else {
                transactionsByMonth[monthKey]++;
            }
        });

        let maxMonth = null;
        let maxCount = -1;

        for (const monthKey in transactionsByMonth) {
            if (transactionsByMonth[monthKey] > maxCount) {
                maxCount = transactionsByMonth[monthKey];
                maxMonth = monthKey;
            }
        }

        return maxMonth;
    }
```
17. Функция которая возвращает нам месяц где больше всего  транзакций
```js
    mostTransactionTypes() {
        const debitTransactions = this.getTransactionByType('debit').length;
        const creditTransactions = this.getTransactionByType('dredit').length;

        if (debitTransactions > creditTransactions) {
            return 'Debit';
        } else if (creditTransactions > debitTransactions) {
            return 'Credit';
        } else {
            return 'equal';
        }
    }
}
```

Файл ```index.js```
```js
const fs = require('fs');
const path = require('path');
const { TransactionAnalyzer } = require('./transactionAnalyzer');

const main = async () => {
    const fileData = fs.readFileSync(path.join(process.cwd(), 'JSON', 'transaction.json'), { encoding: 'utf8' });
    const transactionJSON = JSON.parse(fileData);

    const transaction = new TransactionAnalyzer(transactionJSON);

    transaction.addTransaction({
        transaction_id: '148',
        transaction_date: '2001-21-08',
        transaction_amount: 1000.0,
        transaction_type: 'Credit',
        transaction_description: 'Ticket #8934 POLICE',
        merchant_name: 'Police Ticket',
        card_type: 'Mir',
    });
    // 1. Добавление транзакции
    console.log("1. AddTransaction\n\n", transaction.getAllTransactions().find(item => item.transaction_id === '148').string());
    //2. Получаем все транзации
    console.log("2. getAllTransactions\n\n", transaction.getAllTransactions().slice(0, 5));
    //4. Получаем уникальные транзацкии
    console.log("4. getUniqueTransactionType\n\n", transaction.getUniqueTransactionType());
    //5. Калькулятор транзации
    console.log("5. calcTransactionAmount\n\n", transaction.calcTotalAmount());
    // 6. Калькулятор по дате
    console.log("6. calcAmountDate\n\n", transaction.calcAmountDate(2019, 1));
    // 7. Возвращаем транзакции по типу
    console.log("7. getTransactionsByType\n\n", transaction.getTransactionByType('debit'));
    // 8. Возвращаем транзакцию по Начало даты и Конец
    console.log("8. getTransactionsInDateRange\n\n", transaction.getTransactionsInDateRange('2019-01-02', '2019-01-05'));
    // 9. Возвращаем транзакции по их месту траты
    console.log("9. getTransactionsByMerchant\n\n", transaction.getTransactionsByMerchant('GasStationXYZ'));
    // 10. Возвращаем среднее значение транзакции
    console.log('10. calculateAverageTransactionAmount()\n\n', transaction.calculateAverageTransactionAmount());
    // 11. Возвращает транзакции с суммой в заданном диапазоне от minAmount до maxAmount.
    console.log('11. getTransactionsByAmountRange(minAmount, maxAmount)\n\n', transaction.getTransactionsByAmountRange(50, 55));
    // 12. Вычисляет общую сумму дебетовых транзакций.
    console.log('12. calculateTotalDebitAmount()\n\n', transaction.calculateTotalDebitAmount());
    // 13. Возвращаем все до определенной даты
    console.log("13. getTransactionsBeforeDate\n\n", transaction.getTransactionsBeforeDate('2019-01-03'));
    // 14. Возвращаем по айди
    console.log("14. getTransactionsByID\n\n", transaction.getTransactionById('6'));
    // 15. Воазвращем новый массив только с описаниями
    console.log("15. mapTransactionDescriptions\n\n", transaction.mapTransactionDescriptions());
    // 16. findMostTransactionsMonth()
    console.log('16. findMostTransactionsMonth()\n\n', transaction.findMostTransactionsMonth());
    // 17. findMostDebitTransactionMonth()
    console.log('17. findMostDebitTransactionMonth()\n\n', transaction.findMostDebitTransactionMonth());
};

main();
```

# 5. Ответы на контрольные вопросы
<h1>1. Какие примитивные типы данных существуют в JavaScript?</h1>

```В JS существует 6 видов примитивных типов: 
1. Undefined - Неопределённый тип
2. Boolean - Логический тип
3. Number - Числовой тип
4. String - Стройчный тип
5. Null - Пустой тип
6. Symbol - Символьный тип
```

<h1>2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?</h1>

```Для своей задачи я использовать только метод push т.к я добавлял в конец моего пустого массива```
<h1>3. В чем состоит роль конструктора класса?</h1>

```Конструтор существует для того, чтоб произвести начальную инициализацию до того как будут вызваны дальнейшие методы в классе```
<h1>4. Каким образом вы можете создать новый экземпляр класса в JavaScript?</h1>

```Создать новый экземляр можно при помощи формулы const a = new Class()```


# 6. Список использованных источников
```
Github нашего курса
google.com
```
