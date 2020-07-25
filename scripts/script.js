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

      // if statement determines if the corresponding textarea matches the present time and colors accordingly
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
  // save buttons target id of given class and saves data from corresponding textarea to localStorage
  function saveButtons() {
    $(".svBtn").on("click", function (e) {
      e.preventDefault();
      var hour = e.target.id.substring(4); //img-18
      var text = $("#text-" + hour);
      localStorage.setItem(hour, text.val());
    });
  }

  // delete buttons target id of given class and deletes data from corresponding textarea from localStorage
  function deleteButtons() {
    $(".delBtn").on("click", function (e) {
      e.preventDefault();
      var hour = e.target.id.substring(7);
      console.log("Deleteing: " + hour);
      $("#text-" + hour).val("");
      localStorage.removeItem(hour);
    });
  }

  // for loop takes tasks (as array) from localStorage, converts to string and cycles through each text area with id of text- and places value
  function loadTasks() {
    for (i = 8; i <= 18; i++) {
      var task = localStorage.getItem(i.toString());
      if (task) {
        $("#text-" + i).val(task);
      }
    }
  }

  saveButtons();
  deleteButtons();
  loadTasks();
});
