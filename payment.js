
document.getElementById("paymentForm").addEventListener("submit", function(e){
  e.preventDefault();

  const payment = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    invoice: document.getElementById("invoice").value,
    amount: document.getElementById("amount").value,
    mode: document.getElementById("mode").value,
    remarks: document.getElementById("remarks").value,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  const payments = JSON.parse(localStorage.getItem("payments")) || [];
  payments.push(payment);
  localStorage.setItem("payments", JSON.stringify(payments));

  alert("✅ Payment submitted successfully!");
  document.getElementById("paymentForm").reset();
});
