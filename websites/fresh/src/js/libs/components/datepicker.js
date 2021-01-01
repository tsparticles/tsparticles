import datepicker from "js-datepicker";

export function eventStartDatepicker() {
  const startPicker = document.querySelector(".event-datepicker-start");

  if (typeof startPicker != "undefined" && startPicker != null) {
    const eventStartDate = datepicker(".event-datepicker-start", {
      id: 1,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}

export function eventEndDatepicker() {
  const endPicker = document.querySelector(".event-datepicker-end");

  if (typeof endPicker != "undefined" && endPicker != null) {
    const eventEndDate = datepicker(".event-datepicker-end", {
      id: 1,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}
