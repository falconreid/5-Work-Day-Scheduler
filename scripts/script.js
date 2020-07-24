$(document).ready(function () {
  // Global variables (html elements, etc.)
  const presentDay = document.getElementById("presentDay");

  // Global Time variables
  const presentMoment = moment().format("MM DD YYYY hh:mm a");
  const presentTime = parseInt(moment().format("HH"));
  console.log(presentTime);
  const pastMoment = parseInt(moment().isBefore(presentTime));
  const futureMoment = parseInt(moment().isAfter(presentTime));

  // place current date and time on the page & refresh time every minute

  const update = function () {
    presentDay.textContent = presentMoment;
    console.log(presentMoment);
  };
  setInterval(update, 1000);

  // create function to change color of To Do column

  function updateColor() {
    // create array from all columns with class "description"
    var arrayBlock = $(".description");
    // use for each loop to check the "hour" attribute against the presentTime variable
    $(".description").each(function () {
      // this = arrayBlock and it is parsed into a string
      var hour = parseInt($(this).attr("hour"));
      console.log("hour:", hour);
      console.log(hour, presentTime);
      if (hour < presentTime) {
        $(this).addClass("past");
      } else if (hour === presentTime) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  updateColor();
  setInterval(update, 1000);

  // create click events for save and delete buttons.
  // save buttons
  function saveButtons() {
    var svArray = $(".svBtn");

    $(".svBtn").each(function () {
      var txtAreaArray = $("textarea[hour]").val();

      $(".svBtn").on("click", function (e) {
        e.preventDefault();

        $(".description[hour]").localStorage.setItem("Task", txtAreaArray);
        console.log(txtAreaArray);
      });
    });
  }

  saveButtons();
});
