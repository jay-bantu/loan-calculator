// listem for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  //   hide results
  document.getElementById('results').style.display = 'none';

  //   show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
});

//   calculate results

function calculateResults(e) {
  // Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //   monthlyPayment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  const errorDiv = document.createElement('div');

//   hide loader and results

  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';

  //   get ui Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  //   clear error after 3s
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
