// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
   // Function to save the user input in local storage
   $(".saveBtn").on("click", function () {
    var description = $(this).siblings(".description").val().trim();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, description);
  });

   // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function applyTimeBlockStyles() {
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var hour = parseInt(timeBlockId.split("-")[1]);

      if (hour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (hour == currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past future");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past present");
      }
    });
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Function to create time blocks from 9am to 5pm
  function createTimeBlocks() {
    var startHour = 9;
    var endHour = 17;

    $(".time-block").remove();

    for (var hour = startHour; hour <= endHour; hour++) {
      var timeBlockId = "hour-" + hour;
      var amPmHour = hour > 12 ? hour - 12 : hour;
      var amPm = hour >= 12 ? "PM" : "AM";
      var displayHour = amPmHour + amPm;

      var timeBlock = $("<div>").attr("id", timeBlockId).addClass("row time-block");
      var hourCol = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(displayHour);
      var descriptionTextarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
      var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
      var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

      saveBtn.append(saveIcon);
      timeBlock.append(hourCol, descriptionTextarea, saveBtn);
      $(".container-fluid").append(timeBlock);
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function displaySavedEvents() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedDescription = localStorage.getItem(timeBlockId);
      $(this).find(".description").val(savedDescription);
    });
  }

  // Call the necessary functions to initialize the scheduler
  applyTimeBlockStyles();
  displayCurrentDate();
  createTimeBlocks();
  displaySavedEvents();
  
});
