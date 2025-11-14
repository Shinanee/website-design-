function showTool(tool) {
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');
  const area = document.getElementById("contentArea");
  area.innerHTML = "";

  switch (tool) {
    case "discount":
      area.innerHTML = `
        <div class='tool-box'>
          <h3>Discount Calculator (AI)</h3>
          <label>Original Price:</label>
          <input type='number' id='price' placeholder='Enter price'>
          <label>Discount %:</label>
          <input type='number' id='discount' placeholder='Enter discount'>
          <button onclick='calcDiscount()'>Calculate</button>
          <div class='result' id='discountResult'></div>
        </div>`;
      break;

    case "gst":
      area.innerHTML = `
        <div class='tool-box'>
          <h3>GST Calculator (AI)</h3>
          <label>Amount (₹):</label>
          <input type='number' id='amount'>
          <label>GST %:</label>
          <input type='number' id='gst' value='18'>
          <button onclick='calcGST()'>Calculate GST</button>
          <div class='result' id='gstResult'></div>
        </div>`;
      break;

   
    case "payment":
      area.innerHTML = `
        <div class='tool-box'>
          <h3>Payment Form</h3>
          <label>Customer Name:</label><input id='pName'>
          <label>Amount (₹):</label><input id='pAmount' type='number'>
          <label>Payment Mode:</label>
          <select id='pMode'>
            <option>Cash</option><option>Online</option><option>Card</option>
          </select>
          <button onclick='submitPayment()'>Submit Payment</button>
          <div class='result' id='paymentResult'></div>
        </div>`;
      break;

    default:
      area.innerHTML = `<div class='tool-box'><h3>${tool.toUpperCase()} Module (AI Coming Soon)</h3><p>AI automation under development...</p></div>`;
  }
}

// ======= Tool functions =======
function calcDiscount() {
  let price = parseFloat(document.getElementById("price").value);
  let disc = parseFloat(document.getElementById("discount").value);
  if (isNaN(price) || isNaN(disc)) { alert("Enter valid values"); return; }
  let newPrice = price - (price * disc / 100);
  document.getElementById("discountResult").innerHTML = `Discounted Price: ₹${newPrice.toFixed(2)}`;
}

function calcGST() {
  let amount = parseFloat(document.getElementById("amount").value);
  let gst = parseFloat(document.getElementById("gst").value);
  if (isNaN(amount) || isNaN(gst)) { alert("Enter valid values"); return; }
  let gstAmount = amount * (gst / 100);
  let total = amount + gstAmount;
  document.getElementById("gstResult").innerHTML = `GST: ₹${gstAmount.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
}

function approveQuote() {
  let val = parseFloat(document.getElementById("qValue").value);
  let disc = parseFloat(document.getElementById("qDisc").value);
  if (isNaN(val) || isNaN(disc)) { alert("Enter valid values"); return; }
  let aiDecision = (disc > 10 || val > 100000) ? "Approval Required" : "Auto Approved";
  document.getElementById("quoteResult").innerHTML = `AI Suggestion: <b>${aiDecision}</b>`;
}

function submitPayment() {
  let name = document.getElementById("pName").value;
  let amt = document.getElementById("pAmount").value;
  let mode = document.getElementById("pMode").value;
  if (!name || !amt) { alert("Please enter all fields"); return; }
  document.getElementById("paymentResult").innerHTML = `Payment of ₹${amt} via ${mode} received for ${name}.`;
}

// Load default tool
showTool("discount");

