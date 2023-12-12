document.getElementById("messegeFORM").addEventListener("submit", function (event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let messege = document.getElementById("messege").value;
  let phone = document.getElementById("phone").value;
  let Birth = document.getElementById("Birth").value;
  let radio = document.getElementById("halfWidth-radio").value;

  fetch("/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, subject: subject, messege: messege, phone:phone, Birth:Birth, radio:radio }),
  }) .then(function (response) {
    if (response.ok) {
      alert("Data Sent successfully!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("messege").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("Birth").value = "";
      document.getElementById("radio").value = "";
      getData();
    } else {
      alert("Failed to Send Message!");
    }
  })
  .catch(function (error) {
    console.error("Error:", error);
    alert("An error occurred!");
  });
});

function getData() {
  //clear any existing data
  const dataList = document.getElementById("dataList");
  while (dataList.firstChild) {
    dataList.removeChild(dataList.lastChild);
  }
  //refresh
  fetch("/view")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function (item) {
        let listItem = document.createElement("li");
        listItem.textContent = item.name + " - " + item.email;
        dataList.appendChild(listItem);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    });
}
//calling function
getData();
