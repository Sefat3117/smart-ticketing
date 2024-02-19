const allSeats = document.getElementsByClassName('seat');

// Add Event Listener for All Seats
for (const seat of allSeats) {
  seat.addEventListener('click', function handleSelect(event) {
    let seatRemaining = document.getElementById('seat-remaining');
    let currentSeatRemaining = seatRemaining.innerText;
    let currentSeat = parseInt(currentSeatRemaining);

    let currentSeatUpdate = currentSeat - 1;
    seatRemaining.innerText = currentSeatUpdate;
    if (currentSeatUpdate === 0) {
      alert('No seats available');
      return;
    }

    // Append Child for Selecting seats

    const priceContainer = document.getElementById('price-container');

    const seatName = event.target.innerText;
    const className = 'Economy';
    const price = 550;

    const li = document.createElement('li');
    li.innerText = seatName;
    const li2 = document.createElement('li');
    li2.innerText = className;
    const li3 = document.createElement('li');
    li3.innerText = price;

    // Conditions for Selecting Seats
    let selectedSeat = document.getElementById('seat-selected');
    let selectedSeatText = selectedSeat.innerText;
    let currentSelectedSeat = parseInt(selectedSeatText);

    let selectedSeatUpdate = currentSelectedSeat + 1;
    selectedSeat.innerText = selectedSeatUpdate;

    if (!seat.classList.contains('selected') && selectedSeatUpdate <= 4) {
      seat.classList.add('selected');
      event.target.style.backgroundColor = '#1DD100';
      priceContainer.appendChild(li);
      priceContainer.appendChild(li2);
      priceContainer.appendChild(li3);

      function totalPrice(id, value) {
        const totalCost = document.getElementById('total-price').innerText;
        const total = parseInt(totalCost) + parseInt(value);
        document.getElementById('total-price').innerText = total;
        updateGrandTotal();
      }
      // Calculate Total Price
      const totalCost = totalPrice('total-price', price);
      return;
    } else if (seat.classList.contains('selected')) {
      alert('You can not book the Same seat');
      selectedSeat.innerText = currentSelectedSeat;
      seatRemaining.innerText = currentSeat;
      event.target.style.backgroundColor = '#1DD100';
    } else if (!seat.classList.contains('selected') && selectedSeatUpdate > 4) {
      alert('You can not select more');
      selectedSeat.innerText = 4;
      seatRemaining.innerText = currentSeat;
      event.target.style.backgroundColor = '';
    }
  });
}

const applyBtn = document.getElementById('apply-btn');
applyBtn.addEventListener('click', function () {
  const couponCode = document.getElementById('coupon-name').value;
  const totalCost = parseInt(document.getElementById('total-price').innerText);
  const grandTotal = document.getElementById('grand-total');

  // Check if the coupon code is valid and the seat count is 4
  if (
    (couponCode === 'NEW15' || couponCode === 'Couple 20') &&
    parseInt(document.getElementById('seat-selected').innerText) === 4
  ) {
    document.getElementById('coupon-section').style.display = 'none';
    let discountPercentage = 0;
    if (couponCode === 'NEW15') {
      discountPercentage = 0.15;
    } else if (couponCode === 'Couple 20') {
      discountPercentage = 0.2;
    }
    const discount = totalCost * discountPercentage;
    grandTotal.innerText = totalCost - discount;
  } else {
    grandTotal.innerText = totalCost; // Always display the total cost
    if (couponCode !== 'NEW15' && couponCode !== 'Couple 20') {
      alert('Invalid coupon code');
    } else {
      alert('Seat count is not 4');
    }
  }
});
function updateGrandTotal() {
  const totalCost = parseInt(document.getElementById('total-price').innerText);
  const grandTotal = document.getElementById('grand-total');
  grandTotal.innerText = totalCost;
}
