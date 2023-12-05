function calculateLoan() {
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTermInput = document.getElementById('loanTerm');
    const resultElement = document.getElementById('result');
    const alertDiv = document.querySelector('.alert');

    // Verificar si se ingresaron valores en los campos
    if (loanAmountInput.value.trim() === '' || interestRateInput.value.trim() === '' || loanTermInput.value.trim() === '') {
        resultElement.textContent = 'No hay valores válidos ingresados.';
        alertDiv.style.display = 'block'; // Mostrar el mensaje de error
        alertDiv.classList.add('alert-danger'); // Agregar clase para alerta de error
        return; // Detener la ejecución si faltan valores
    }

    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100;
    const loanTerm = parseFloat(loanTermInput.value);

    // Verificar si los valores ingresados son números válidos
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        resultElement.textContent = 'Los valores ingresados no son números válidos.';
        alertDiv.style.display = 'block'; // Mostrar el mensaje de error
        alertDiv.classList.add('alert-danger'); // Agregar clase para alerta de error
        return; // Detener la ejecución si los valores no son números válidos
    }

    const monthlyInterestRate = interestRate / 12;
    const totalMonths = loanTerm;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, totalMonths) - 1;
    const monthlyPayment = loanAmount * (numerator / denominator);
    const totalInterest = monthlyPayment * totalMonths - loanAmount; // Calcular el total de interés pagado
    const totalPayment = loanAmount + totalInterest; // Calcular el total pagado (préstamo + interés)

    // Mostrar el resultado del cálculo del préstamo en la div de alerta
    showResultAlert(monthlyPayment, totalPayment, totalInterest, totalMonths);
}

function showResultAlert(monthlyPayment, totalPayment, totalInterest, totalMonths) {
    const alertDiv = document.querySelector('.alert');
    const resultElement = document.getElementById('result');

    const alertMessage = `El pago mensual será de: $${monthlyPayment.toFixed(2)} durante ${totalMonths} meses. El total de intereses pagados será de: $${totalInterest.toFixed(2)}.`;

    // Mostrar el resultado del cálculo del préstamo dentro de la div de alerta
    resultElement.textContent = alertMessage;
    alertDiv.style.display = 'block'; // Mostrar el elemento de alerta
    alertDiv.classList.add('alert-danger'); // Agregar clase para alerta de error
}
