function showNotification(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: window.innerWidth <= 640 ? "center" : "right",
        className: type,
        stopOnFocus: true,
    }).showToast();
}

// Save receipt number with timestamp for expiry
function saveReceiptNumber(receiptNumber) {
    // අංක පමණක් බව පරීක්ෂා කරයි
    if (!/^\d+$/.test(receiptNumber)) {
        showNotification('Please enter a valid receipt number (numbers only)', 'error');
        return;
    }

    let receiptNumbers = JSON.parse(localStorage.getItem('receiptNumbers')) || [];

    // If the number is already present, show error
    if (receiptNumbers.some(item => item.number === receiptNumber)) {
        showNotification('This receipt has already been checked!', 'error');
        return;
    }

    // Save receipt with current date (timestamp)
    const receipt = { number: receiptNumber, dateAdded: new Date().toISOString() };
    receiptNumbers.push(receipt);
    localStorage.setItem('receiptNumbers', JSON.stringify(receiptNumbers));

    document.getElementById('receiptInput').value = '';
    loadReceiptNumbers();
    showNotification('✓ Receipt verified and saved successfully!', 'success');
}

// Load receipt numbers and show countdown if less than 30 days
function loadReceiptNumbers() {
    let receiptNumbers = JSON.parse(localStorage.getItem('receiptNumbers')) || [];
    const receiptList = document.getElementById('receiptList');
    const countDisplay = document.getElementById('countDisplay');
    
    // Filter and remove expired receipts (more than 30 days)
    const today = new Date();
    receiptNumbers = receiptNumbers.filter(receipt => {
        const dateAdded = new Date(receipt.dateAdded);
        const daysDifference = Math.floor((today - dateAdded) / (1000 * 60 * 60 * 24));
        return daysDifference < 30;
    });

    // Update storage with non-expired receipts
    localStorage.setItem('receiptNumbers', JSON.stringify(receiptNumbers));

    // Update count display
    countDisplay.textContent = `Total Receipts: ${receiptNumbers.length}`;

    // Display receipt list with countdown
    if (receiptNumbers.length === 0) {
        receiptList.innerHTML = '<div class="empty-state">No receipts checked yet. Enter a receipt number above.</div>';
        return;
    }

    receiptList.innerHTML = '';
    receiptNumbers.forEach(receipt => {
        const dateAdded = new Date(receipt.dateAdded);
        const daysLeft = 30 - Math.floor((today - dateAdded) / (1000 * 60 * 60 * 24));
        
        const listItem = document.createElement('div');
        listItem.textContent = `✓ ${receipt.number} - Expires in ${daysLeft} days`;
        receiptList.appendChild(listItem);
    });
}

// Clear all receipt numbers and reset count
function clearReceiptNumbers() {
    if (confirm('Are you sure you want to clear all receipt history?')) {
        localStorage.removeItem('receiptNumbers');
        loadReceiptNumbers();
        showNotification('All receipt history cleared', 'success');
    }
}

// Load receipts on page load
window.onload = loadReceiptNumbers;

// Add Enter key support
document.getElementById('receiptInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        saveReceiptNumber(this.value);
    }
});
