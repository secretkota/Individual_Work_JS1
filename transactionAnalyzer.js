class TransactionAnalyzer {
    constructor(transactions = []) {
        this.transactions = transactions;
    }

    /**
     * Добавление транзации
     * @param {Object} transaction Добавление транзакции
     * @author Covaliuc Stanislav 
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
    /**
     * 
     * @returns Текущие транзакции
     * @author Covaliuc Stanislav 
     */
    getAllTransactions() {
        return this.transactions.map((item) => {
            const obj = { ...item };
            obj.string = () => JSON.stringify(obj);
            return obj;
        });
    }

    /**
     * 
     * @returns Уникальные  типы транзаций
     * @author Covaliuc Stanislav 
     */
    getUniqueTransactionType() {
        const uniqueTypeSet = new Set();

        this.transactions.forEach((transactions => {
            uniqueTypeSet.add(transactions.transaction_type)
        }));

        return Array.from(uniqueTypeSet);
    }
    /**
     * 
     * @returns калькулятор всех транзации
     * @author Covaliuc Stanislav 
     */
    calcTotalAmount() {
        return this.transactions.reduce(
            (total, transaction) => total + transaction.transaction_amount,
            0
        );
    }
    /**
    * @returns возвращает калькулятор по дате
    * @author Covaliuc Stanislav 
    */
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
    /**
     * 
     * @param {object} type Возвращает по типу 
     * @returns вернет значение по типу нужному
     * @author Covaliuc Stanislav 
     */
    getTransactionByType(type) {
        return this.transactions.filter(
            (transaction) => transaction.transaction_type === type
        );
    }
    /**
     * 
     * @param {date} startDate начальная дата
     * @param {date} endDate  конечная дата
     * @returns  вернет все транзации с начальной даты по конечную истина
     * @author Covaliuc Stanislav 
     */
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
    /**
     * 
     * @param {object} merchantName 
     * @returns верет транзации по месту оплаты
     * @author Covaliuc Stanislav 
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(
            (transaction) => transaction.merchant_name === merchantName
        );
    }
    /**
     * 
     * @returns вернет серднюю транзацкцию
     * @author Covaliuc Stanislav 
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calcTotalAmount();
        const numberOfTransaction = this.transactions.length;

        if (numberOfTransaction === 0) return 0;

        return totalAmount / numberOfTransaction;
    }
    /**
     * 
     * @param {number} minAmunt 
     * @param {number} maxAmount 
     * @returns вернет все транзации с минимальным и максимальным
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter((transaction) => {
            const transactionAmount = transaction.transaction_amount;
            return transactionAmount >= minAmount && transactionAmount <= maxAmount;
        })
    }
    /**
     * 
     * @returns возвращает все значения debit
     * @author Covaliuc Stanislav 
     */
    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionByType('Debit');
        return debitTransactions.reduce((total, transaction) => {
            return total + transaction.transaction_amount;
        }, 0);
    }

    /**
     * 
     * @param {date} date 
     * @returns возвращает все тразакции после даты
     */
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate < targetDate;
        });
    }
    /**
     * 
     * @param {string} id 
     * @returns возвращает транзакию по айди
     * @author Covaliuc Stanislav 
     */
    getTransactionById(id) {
        return this.transactions.filter(
            (transaction) => transaction.transaction_id === id
        );
    }
    /**
     * 
     * @returns возвращает массив с описаниями транзакций
     */
    mapTransactionDescriptions() {
        return this.transactions.map(
            (transaction) => transaction.transaction_description
        );
    }
    /**
     * 
     * @returns месяц где больше всего транзации
     */
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
    /**
     * 
     * @returns возвращаем месяц где больше всего дебита
     */
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
    /**
     * 
     * @returns сколько всего больше транзакции
     */
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

// импортируме модуль
module.exports = { TransactionAnalyzer };
