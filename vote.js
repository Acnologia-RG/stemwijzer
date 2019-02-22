const title = document.getElementById("statement_title");
const question = document.getElementById("statement_description");
const title_pic = document.getElementById("logoStemwijzer");
var buttons = document.getElementsByClassName("buttons");
const startButton = document.getElementById("startButton");

var question_number = 0;
var answers = [];
var partij_results = [];

for (var i = 0; i < parties.length; i++) {
partij_results[i] = {"name": parties[i].name, "points": 0}
}

function start() {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.toggle("displaytoggle");
	}
	title_pic.classList.toggle("displaytoggle");
	editWebpage();
}
function editWebpage() {
	title.innerHTML = subjects[question_number].title;
	question.innerHTML = subjects[question_number].statement;
}
function nextQuestion(counting) {
	if (subjects[question_number]) {
		console.log(question_number);
		if (counting == "up" && question_number != subjects.length - 1) {
			question_number++;
			console.log(answers);
			editWebpage();
		} else if (counting == "up" && question_number == subjects.length -1) {
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.toggle("displaytoggle");
		}
		title.innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
		question.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";
		startButton.innerHTML = "next";
		startButton.classList.toggle("displayblock");
		var H2 = document.createElement("h2")
		var H2Text = document.createTextNode("Extra belangrijke onderwerpen");
		H2.appendChild(H2Text);
		var ul = document.createElement("ul");
		for (var i = 0; i < subjects.length; i++) {
			var li = document.createElement("li");
			var input = document.createElement("input");
			var label = document.createElement("label");
			var span = document.createElement("span");
			var title2 = document.createTextNode(subjects[i].title);
			span.appendChild(title2);
			label.appendChild(span);
			input.appendChild(label);
			li.appendChild(input);
			ul.appendChild(li);
		}
		document.getElementById("footer").appendChild(H2);
		document.getElementById("footer").appendChild(ul);
	} else if (question_number != 0) {
			question_number--;
			console.log(answers);
			editWebpage();
		}
	}
}
function addAnswer(answer, direction) {
	if (answer == null && direction == "down" && question_number == 0) {
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.toggle("displaytoggle");
		}
		title_pic.classList.toggle("displaytoggle");
		title.innerHTML = "StemWijzer Tweede Kamer 2017";
		question.innerHTML = "Test uw politieke voorkeur aan de hand van 12 stellingen";
	} else {
		answers[question_number] = answer;
		nextQuestion(direction);
	}
}
function results(){
	//make a result function
	console.log(partij_results);
}