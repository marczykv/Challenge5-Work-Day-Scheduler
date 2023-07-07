$(function () {
  // Function to save the user input in local storage
  $(".saveBtn").on("click", function () {
    var description = $(this).siblings(".description").val().trim();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, description);
  });

  // Function to apply the past, present, or future class to each time block
  function applyTimeBlockStyles() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var hour = parseInt(timeBlockId.split("-")[1]);

      if (hour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (hour === currentHour) {
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

    for (var hour = startHour; hour <= endHour; hour++) {
      var timeBlockId = "hour-" + hour;
      var amPmHour = hour > 12 ? hour - 12 : hour;
      var amPm = hour >= 12 ? "PM" : "AM";
      var displayHour = amPmHour + amPm;

      var timeBlock = $("<div>")
        .attr("id", timeBlockId)
        .addClass("row time-block");
      var hourCol = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(displayHour);
      var descriptionTextarea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("rows", "3");
      var saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save");
      var saveIcon = $("<i>")
        .addClass("fas fa-save")
        .attr("aria-hidden", "true");

      saveBtn.append(saveIcon);
      timeBlock.append(hourCol, descriptionTextarea, saveBtn);
      $("#schedulerContainer").append(timeBlock);
    }
  }

  // Function to display the saved events from local storage
  function displaySavedEvents() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedDescription = localStorage.getItem(timeBlockId);
      if (savedDescription) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  // Call the necessary functions to initialize the scheduler
  displayCurrentDate();
  createTimeBlocks();
  applyTimeBlockStyles();
  displaySavedEvents();
});
