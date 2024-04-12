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
