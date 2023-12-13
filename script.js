"use strict";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

// Manage validation styles when form is submitted
form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const thankYouMessage = document.querySelector("#thank-you-message");

      // Remove form
      form.remove();

      // Show spinner
      const formSection = document.querySelector("#contact-form");
      const spinner = document.createElement("div");
      spinner.className = "spinner";
      spinner.innerHTML =
        "<img src='images/spinner.svg' aria-valuetext='loading'/>";
      formSection.appendChild(spinner);

      // Remove spinner and show thank you message
      function removeSpinnerAndShowThankYouMessage() {
        spinner.remove();
        thankYouMessage.classList.remove("hidden");
      }

      setTimeout(removeSpinnerAndShowThankYouMessage, 1500);
      return;
    }

    form.classList.add("was-validated");

    const formFields = document.querySelectorAll(".form-field");

    formFields.forEach((formField) => {
      const invalidFeedbackDiv = formField.children[2];
      const fillerDiv = formField.children[3];
      const invalidFeedbackDivIsDisplayed =
        window.getComputedStyle(invalidFeedbackDiv).display !== "none";

      // If feedback div is displayed, hide filler div
      if (invalidFeedbackDivIsDisplayed) {
        fillerDiv.style.display = "none";
      }
    });
  },
  false
);

// Manage validation styles when input value changes
inputs.forEach((input) => {
  input.addEventListener(
    "input",
    (event) => {
      const invalidFeedbackDiv = input.nextElementSibling;
      const fillerDiv = invalidFeedbackDiv.nextElementSibling;
      const invalidFeedbackDivIsDisplayed =
        window.getComputedStyle(invalidFeedbackDiv).display !== "none";

      // Hide filler div if feedback div is shown;
      // and viceversa.
      if (invalidFeedbackDivIsDisplayed) {
        fillerDiv.style.display = "none";
      } else {
        fillerDiv.style.display = "block";
      }
    },
    false
  );
});
