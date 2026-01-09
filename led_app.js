// === MODULE PRICE TABLE ===
const modulePriceList = {
  "P10 Red DIP": { series: "Outdoor", price: 2020 },
  "P10 RGB 2727": { series: "Outdoor", price: 2400 },
  "P10 RGB 3535": { series: "Outdoor", price: 3170 },
  "P6.66 2727": { series: "Outdoor", price: 3780 },
  "P6 2727": { series: "Outdoor", price: 3860 },
  "P6 2525": { series: "Outdoor", price: 4030 },
  "P4": { series: "Outdoor", price: 4110 },
  "P4 Pro": { series: "Outdoor", price: 4830 },
  "P3.076": { series: "Outdoor", price: 6020 },
  "P2.5": { series: "Outdoor", price: 9330 },

  "P4 Indoor": { series: "Indoor", price: 3480 },
  "P2.5 Indoor": { series: "Indoor", price: 3860 },
  "P2.5 Pro": { series: "Indoor", price: 4600 },
  "G2 GOB": { series: "Indoor", price: 7090 },
  "P2": { series: "Indoor", price: 5530 },
  "P1.86": { series: "Indoor", price: 5830 },
  "C1.86 COB (640X480)": { series: "Indoor", price: 9770 },
  "P1.53": { series: "Indoor", price: 9270 },
  "G1.53 GOB": { series: "Indoor", price: 10080 },
  "C1.53 COB (640X480)": { series: "Indoor", price: 13620 },
  "C1.5 COB (600X337.5)": { series: "Indoor", price: 18870 },
  "P1.25": { series: "Indoor", price: 14300 },
  "G1.25 GOB": { series: "Indoor", price: 15090 },
  "C1.25 COB (600X337.5)": { series: "Indoor", price: 20800 },
};

// === MODULE OPTIONS ===
const moduleOptions = {
  outdoor: ["P10 Red DIP","P10 RGB 2727","P10 RGB 3535","P6.66 2727","P6 2727","P6 2525","P4","P4 Pro","P3.076","P2.5"],
  indoor: ["P4 Indoor","P2.5 Indoor","P2.5 Pro","G2 GOB","P2","P1.86","C1.86 COB (640X480)","P1.53","G1.53 GOB","C1.53 COB (640X480)","C1.5 COB (600X337.5)","P1.25","G1.25 GOB","C1.25 COB (600X337.5)"]
};

function $(id){return document.getElementById(id);}
function formatMoney(v){return '₹'+v.toLocaleString('en-IN',{minimumFractionDigits:2});}

function populateModules(env){
  const select=$('moduleType');
  select.innerHTML='';
  moduleOptions[env].forEach(m=>{
    const opt=document.createElement('option');
    opt.value=m;
    opt.textContent=m;
    select.appendChild(opt);
  });
}

// === CALCULATION ===
function calcQuote(){
  const env=document.querySelector('input[name="environment"]:checked').value;
  const mod=$('moduleType').value;
  const w=parseFloat($('width').value)||0;
  const h=parseFloat($('height').value)||0;
  const qty=parseInt($('quantity').value)||1;
  const area=w*h*10.764;
  const totalArea=area*qty;

  let baseRate=0;
  const key=modulePriceList[mod]?mod:mod+" "+env.charAt(0).toUpperCase()+env.slice(1);
  if(modulePriceList[key]) baseRate=modulePriceList[key].price;
  else if(modulePriceList[mod]) baseRate=modulePriceList[mod].price;

  const moduleAmount=totalArea*baseRate;

  // ✅ Dynamic Media Player
  let senderPrice=0; let senderModel="";
  if(totalArea<=100){senderPrice=18000;senderModel="Basic Player";}
  else if(totalArea<=300){senderPrice=18000;senderModel="Standard Player";}
  else if(totalArea<=600){senderPrice=20000;senderModel="Advanced Player";}
  else{senderPrice=25000;senderModel="Professional Player";}

   



  const discountPct=parseFloat($('discount').value)||0;
  const gstPct=parseFloat($('gst').value)||18;
  const subtotal=moduleAmount+senderPrice;
  const discount=subtotal*(discountPct/100);
  const taxable=subtotal-discount;
  const gst=taxable*(gstPct/100);
  const total=taxable+gst;

  return {env,mod,w,h,qty,area,totalArea,baseRate,moduleAmount,senderPrice,senderModel,subtotal,discount,taxable,gst,total};
}

// === RENDER ===
function renderQuote(){
  const q=calcQuote();
  const cust=$('custName').value||'Customer';
  const contact=$('custContact').value||'-';
  const today=new Date().toLocaleDateString();

  const html=`
  <div id="quotationPDF">
  <div class="quote-header">
    <div><strong>QUOTE No.:</strong> Q${Date.now().toString().slice(-6)}<br><strong>Date:</strong> ${today}</div>
    <div><strong>Customer:</strong> ${cust}<br><strong>Contact:</strong> ${contact}</div>
  </div>

  <div><strong>Screen Size:</strong> ${q.w.toFixed(2)}m × ${q.h.toFixed(2)}m = ${q.area.toFixed(2)} sqft × ${q.qty} = ${q.totalArea.toFixed(2)} sqft total</div>

  <table class="quote-table">
    <tr><th>Description</th><th>Unit Price</th><th>Qty</th><th>Units</th><th>Amount</th></tr>
    <tr>
      <td><strong>RAK - ${q.mod}</strong><br>${q.env.toUpperCase()} LED Module, High Brightness, Refresh >3840Hz,<br>Cabinet MS-PC, Power Supply Rong 300W</td>
      <td>${formatMoney(q.baseRate)}</td><td>${q.totalArea.toFixed(2)}</td><td>Sqft</td><td>${formatMoney(q.moduleAmount)}</td>
    </tr>
    <tr><td>LED Sender: ${q.senderModel} (USB/LAN/WiFi/HDMI)</td><td>${formatMoney(q.senderPrice)}</td><td>1</td><td>Pcs</td><td>${formatMoney(q.senderPrice)}</td></tr>
    <tr><td>Video Processor (Optional)</td><td>0.00</td><td>0</td><td>Set</td><td>0.00</td></tr>
    <tr><td>Packaging / Transport / Installation</td><td>Included</td><td>-</td><td>-</td><td>0.00</td></tr>
  </table>

  <div class="quote-total">
    <div>Subtotal: ${formatMoney(q.subtotal)}</div>
    <div>Discount: -${formatMoney(q.discount)}</div>
    <div>Taxable: ${formatMoney(q.taxable)}</div>
    <div>GST (${(q.gst/q.taxable*100).toFixed(0)}%): ${formatMoney(q.gst)}</div>
    <div class="quote-grand">Total After Tax: ${formatMoney(q.total)}</div>
  </div>

  <div class="terms">
    <h4>Terms & Conditions:</h4>
    <ol>
      <li>1 Year warranty against manufacturing defects.</li>
      <li>Price Ex-New Delhi. Freight extra as applicable.</li>
      <li>Fabrication, cabling, and electrical at site by client.</li>
      <li>Installation includes travel & technician charges.</li>
      <li>Delivery within 10–15 days after advance payment.</li>
      <li>Payment Terms: 50% advance, 50% before delivery.</li>
    </ol>
    <p><strong>RAK LED Solutions</strong> — Email: sales.rakled@gmail.com</p>
  </div></div>`;

  $('quoteSummary').innerHTML=html;
}

// === INIT + PDF DOWNLOAD ===
document.addEventListener('DOMContentLoaded',()=>{
  populateModules('indoor');
  document.querySelectorAll('input[name="environment"]').forEach(r=>r.addEventListener('change',e=>populateModules(e.target.value)));
  $('calcBtn').addEventListener('click',()=>renderQuote());
  $('downloadBtn').addEventListener('click',()=>{
    const element=document.getElementById('quotationPDF');
    if(!element){alert('Please generate a quotation first.');return;}
    html2pdf().set({filename:'RAK_Quotation.pdf',margin:10}).from(element).save();
  });
});
