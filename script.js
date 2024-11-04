// Receipt number එක local storage එකට save කිරීම
function saveReceiptNumber(receiptNumber) {
    let receiptNumbers = JSON.parse(localStorage.getItem('receiptNumbers')) || []; // දැනට ඇති receipt numbers ලබා ගන්න
    if (!receiptNumbers.includes(receiptNumber)) { // duplicate check
        receiptNumbers.push(receiptNumber); // නව receipt number එක එක් කරන්න
        localStorage.setItem('receiptNumbers', JSON.stringify(receiptNumbers)); // local storage එකට save කරන්න
        alert('Receipt number saved!');
    } else {
        alert('This receipt number is already saved!'); // duplicate message
    }
}

// Local storage එකෙන් receipt numbers ලබා ගන්න
function loadReceiptNumbers() {
    let receiptNumbers = JSON.parse(localStorage.getItem('receiptNumbers')) || []; // local storage එකෙන් data ලබා ගන්න
    const receiptList = document.getElementById('receiptList');
    receiptList.innerHTML = ''; // පරණ ලැයිස්තුව ආපසු නැවත ගන්න
    receiptNumbers.forEach(number => {
        const listItem = document.createElement('div'); // එකක් එක් කරන්න
        listItem.textContent = number; // receipt number එක text ලෙස යෙදීම
        receiptList.appendChild(listItem); // list එකට එකතු කරන්න
    });
}

// Local storage එකෙන් receipt numbers මැකීම
function clearReceiptNumbers() {
    localStorage.removeItem('receiptNumbers'); // local storage එකෙන් data එක මකන්න
    alert('All receipt numbers cleared!');
}
