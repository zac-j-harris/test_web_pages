// alert("Hello World!");
// var i;

// document.getElementById('answer_form').onsubmit = function() {
//             document.getElementById("Correct").innerHTML="<h4>test2!</h4>";
// }

function validate() {
	var math_answer = document.getElementById("math_answer");
	var answer = math_answer.value;
	// alert("" + answer);

if (answer == "10") {
	document.getElementById("Correct").innerHTML="<h4>Correct!</h4>";
}
else {
	document.getElementById("Correct").innerHTML="<h4>Inorrect!</h4>";

	var coll = document.getElementById("hint_button").style.display = "inline";
	// coll.classList.toggle("active")
	// coll.style.display("inline");
	// var i;

	// for (i = 0; i < coll.length; i++) {
	//     this.classList.toggle("active");
	//     var content = this.nextElementSibling;
	//     if (content.style.display === "block") {
	//       content.style.display = "none";
	//     } else {
	//       content.style.display = "block";
	//     }
	// }
}
}