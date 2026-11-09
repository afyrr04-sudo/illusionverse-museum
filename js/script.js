
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks){
	menuToggle.addEventListener("click", function() {
		navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
	});
}



/* ============================= */
/* TICKET BOOKING SYSTEM */
/* ============================= */

const ticketForm = document.getElementById("ticketForm");

if (ticketForm) {

    const quantity = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");
    const bookingMessage = document.getElementById("bookingMessage");
    const visitDate = document.getElementById("visitDate");

    // POPUP ELEMENTS
    const bookingPopup = document.getElementById("bookingPopup");
    const closePopup = document.getElementById("closePopup");

    // PREVENT PAST DATES
    const today = new Date();

    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    visitDate.min = localDate;

    // CALCULATE TOTAL PRICE
    function calculateTotal() {

        const selectedTicket = ticketForm.querySelector(
            'input[name="ticketType"]:checked'
        );

        if (!selectedTicket) {
            totalPrice.textContent = "RM 0.00";
            return;
        }

        const price = Number(selectedTicket.value);
        const amount = Number(quantity.value);

        const total = price * amount;

        totalPrice.textContent =
            "RM " + total.toFixed(2);
    }

    // UPDATE WHEN QUANTITY CHANGES
    quantity.addEventListener("input", calculateTotal);

    // UPDATE WHEN TICKET TYPE CHANGES
    const ticketRadios = ticketForm.querySelectorAll(
        'input[name="ticketType"]'
    );

    ticketRadios.forEach(function(radio) {

        radio.addEventListener("change", calculateTotal);

    });

    // SUBMIT BOOKING
    ticketForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const selectedTicket = ticketForm.querySelector(
            'input[name="ticketType"]:checked'
        );

        const amount = Number(quantity.value);

        if (!selectedTicket || amount < 1 || amount > 20) {

            bookingMessage.textContent =
                "Please select a ticket and valid quantity.";

            return;
        }

        // CALCULATE TOTAL
        calculateTotal();

        // SHOW SUCCESS POPUP
        if (bookingPopup) {
            bookingPopup.classList.add("show");
        }

        // RESET FORM
        ticketForm.reset();
        totalPrice.textContent = "RM 0.00";
    });

    // RESET BUTTON
    ticketForm.addEventListener("reset", function() {

        totalPrice.textContent = "RM 0.00";
        bookingMessage.textContent = "";

    });

    // CLOSE POPUP
    if (closePopup && bookingPopup) {

        closePopup.addEventListener("click", function() {

            bookingPopup.classList.remove("show");

        });

    }

}





// =============================
// CONTACT FORM
// =============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const contactMessage = document.getElementById("contactMessage");

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const visitors = document.getElementById("visitorCount").value;

        contactMessage.textContent =
            "Thank you, " + name +
            "! Your inquiry for " + visitors +
            " visitor(s) has been submitted successfully (demo only).";

        contactForm.reset();
    });

    contactForm.addEventListener("reset", function() {
        contactMessage.textContent = "";
    });
}


// =============================
// HOME PAGE SCROLL ANIMATION
// =============================

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function(entries, observer) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(function(element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function(element) {
            element.classList.add("visible");
        });

    }
}


// GALLERY FLIP CARD

const galleryCards = document.querySelectorAll(
    ".gallery-flip-card"
);

galleryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        card.classList.toggle("is-flipped");

        const flipped =
            card.classList.contains("is-flipped");

        card.setAttribute(
            "aria-expanded",
            String(flipped)
        );

    });

});

