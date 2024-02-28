// Define prices for each component
var componentPrices = {
    'Intel Core i7': 300,
    'Intel Core i5': 250,
    'AMD Ryzen 9': 350,
    'NVIDIA GeForce RTX 3080': 800,
    'NVIDIA GeForce GTX 1080': 600,
    'AMD Radeon RX 6800 XT': 700,
    '4GB DDR4': 50,
    '8GB DDR4': 80,
    '16GB DDR4': 120
};

// Adding event listener to the form submission event
var formSubmitted = false; // Variable to track whether form has been submitted

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    // If form is already submitted, show alert and return
    if (formSubmitted) {
        var confirmation = confirm("Order already submitted, reset for a fresh order?");
        if (confirmation) {
            document.getElementById('orderForm').reset();
            formSubmitted = false;
            clearOrderSummary(); // Clear the order summary
        }
        return;
    }

    // Arrays to store selected components and their quantities
    var selectedComponents = [];
    var selectedQuantities = [];

    // Collecting data for CPU components
    collectComponentData('cpuQuantity_i7', 'Intel Core i7', selectedComponents, selectedQuantities);
    collectComponentData('cpuQuantity_i5', 'Intel Core i5', selectedComponents, selectedQuantities);
    collectComponentData('cpuQuantity_ryzen9', 'AMD Ryzen 9', selectedComponents, selectedQuantities);

    // Collecting data for GPU components
    collectComponentData('gpuQuantity_rtx3080', 'NVIDIA GeForce RTX 3080', selectedComponents, selectedQuantities);
    collectComponentData('gpuQuantity_gtx1080', 'NVIDIA GeForce GTX 1080', selectedComponents, selectedQuantities);
    collectComponentData('gpuQuantity_rx6800xt', 'AMD Radeon RX 6800 XT', selectedComponents, selectedQuantities);

    // Collecting data for RAM components
    collectComponentData('ramQuantity_4gb', '4GB DDR4', selectedComponents, selectedQuantities);
    collectComponentData('ramQuantity_8gb', '8GB DDR4', selectedComponents, selectedQuantities);
    collectComponentData('ramQuantity_16gb', '16GB DDR4', selectedComponents, selectedQuantities);

    // Validating if components are selected
    if (selectedComponents.length === 0) {
        alert("Please select at least one component.");
        return;
    }

    // Validating if quantities are specified for all selected components
    for (var i = 0; i < selectedComponents.length; i++) {
        if (selectedQuantities[i] === "" || selectedQuantities[i] === "0") {
            alert("Please specify a valid quantity for the selected component.");
            return;
        }
    }

    // Validating if the checkbox is checked
    if (!document.getElementById('validationFormCheck1').checked) {
        alert("Please check this box if you want to proceed.");
        return;
    }

    // Generating and displaying the order summary
    generateOrderSummary(selectedComponents, selectedQuantities);

    // Mark form as submitted
    formSubmitted = true;
});

// Function to collect data for a component
function collectComponentData(quantityInputId, componentName, selectedComponents, selectedQuantities) {
    var quantity = document.getElementById(quantityInputId).value.trim();
    if (quantity !== "" && quantity !== "0") {
        selectedComponents.push(componentName);
        selectedQuantities.push(quantity);
    }
}

// Custom alert order submitted
function showAlert(message) {
    var customAlert = document.getElementById('customAlert');
    var alertText = document.getElementById('alertText');
    alertText.textContent = message;
    customAlert.style.display = 'block';

    setTimeout(function() {
        customAlert.style.display = 'none';
    }, 2000); // Hide the alert after 2 seconds
}

// Function to clear the order summary
function clearOrderSummary() {
    document.getElementById('orderSummary').innerHTML = "";
}


// Generate Order Summary
function generateOrderSummary(components, quantities) {
    var orderSummary = "<strong>Order Summary:</strong><br><br>";
    orderSummary += "<table>";
    orderSummary += "<tr><th>Component</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>";
    var totalCost = 0;
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        var quantity = parseInt(quantities[i]);
        var price = componentPrices[component];
        var componentCost = quantity * price;
        totalCost += componentCost;
        orderSummary += "<tr>";
        orderSummary += "<td>" + component + "</td>";
        orderSummary += "<td>" + quantity + "</td>";
        orderSummary += "<td>$" + price + "</td>";
        orderSummary += "<td>$" + componentCost + "</td>";
        orderSummary += "</tr>";
    }
    orderSummary += "<tr><td colspan='3'><strong>Total Cost:</strong></td><td><strong>$" + totalCost + "</strong></td></tr>";
    orderSummary += "</table>";
    document.getElementById('orderSummary').innerHTML = orderSummary;
    showAlert("Order submitted!");

}