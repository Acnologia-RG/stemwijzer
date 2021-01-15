const title = document.getElementById("statement_title");
const question = document.getElementById("statement_description");
const title_pic = document.getElementById("logoStemwijzer");
const startButton = document.getElementById("startButton");
const main = document.getElementById("main");
const section = document.getElementById("section");
const footer = document.getElementById("footer");
var buttons = document.getElementsByClassName("buttons");

var questionNumber = 0;
var answers = [];
var partijResults = [];

for (var i = 0; i < parties.length; i++) {
	partijResults[i] = {"name": parties[i].name, "points": 0, "secular": parties[i].secular, "size": parties[i].size}
}

function start() {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.toggle("displayToggle");
	}

	title_pic.classList.toggle("displayToggle");
	editWebpage();
}

function editWebpage() {
	title.innerHTML = subjects[questionNumber].title;
	question.innerHTML = subjects[questionNumber].statement;
}

function nextQuestion(counting) {
	if (subjects[questionNumber]) {

		if (counting == "up" && questionNumber != subjects.length - 1) {
			questionNumber++;
			editWebpage();

		} else if (counting == "up" && questionNumber == subjects.length -1) {
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].classList.toggle("displayToggle");
			}

			title.innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
			question.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";
			startButton.innerHTML = "next";
			startButton.classList.toggle("displayBlock");
			startButton.setAttribute('onclick','results()');
			var H2 = document.createElement("h2")
			var H2Text = document.createTextNode("Extra belangrijke onderwerpen");
			H2.appendChild(H2Text);
			var ul = document.createElement("ul");

			for (var i = 0; i < subjects.length; i++) {
				var li = document.createElement("li");
				var checkbox = document.createElement("input");
				checkbox.type ="checkbox";
				checkbox.id = i;
				var label = document.createElement("label");
				var span = document.createElement("span");
				var title2 = document.createTextNode(subjects[i].title);
				span.appendChild(title2);
				label.appendChild(span);
				li.appendChild(checkbox);
				li.appendChild(label);
				ul.appendChild(li);
			}
			footer.appendChild(H2);
			footer.appendChild(ul);

		} else if (questionNumber != 0) {
			questionNumber--;
			editWebpage();
		}
	}
}

function addAnswer(answer, direction) {
	if (answer == null && direction == "down" && questionNumber == 0) {
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.toggle("displayToggle");
		}

		title_pic.classList.toggle("displayToggle");
		title.innerHTML = "StemWijzer Tweede Kamer 2017";
		question.innerHTML = "Test uw politieke voorkeur aan de hand van 12 stellingen";

	} else {
		answers[questionNumber] = answer;
		nextQuestion(direction);
	}
}

function results() {
	//make a part that counts the extra points
	for (var h = 0; h < partijResults.length; h++) {
		for (var a = 0; a < answers.length; a++) {
			var check = document.getElementById(a);
			for (var i = 0; i < subjects[a].parties.length; i++){
				if (subjects[a].parties[i].name == partijResults[h].name) {
					if (answers[a] == subjects[a].parties[i].position) {
						if (check.checked == true) {
							partijResults[h].points++
						}
						partijResults[h].points++
					}
				}
			}
		}
	}
	main.classList.toggle("displayHidden");
	footer.classList.toggle("displayHidden");
	section.classList.toggle("displayHidden");

	partijResults.sort((a, b) => b.points-a.points)

	/**
	 * @param partie = one partie from partijResults
	 */
	partijResults.forEach((partie) => {
	result = document.createElement("h4");
	result.innerHTML = partie.name +" was het eens met "+ partie.points +" points";
	if (partie.secular === false && partie.size <= 15) {
		result.setAttribute('class', 'none-secular sizeSmall');
	} else if (partie.secular === false) {
		result.setAttribute('class', 'none-secular');
	} else if (partie.size <= 15 ) {
		result.setAttribute('class', 'sizeSmall');
	}
	section.appendChild(result);
	});
}

// make this toggle on/off the secular parties only or not
function secularToggle() {
	var secular = document.getElementsByClassName("none-secular");
	for (var i = 0; i < secular.length; i++) {
		secular[i].classList.toggle("displayHidden");
	}
}

// make this toggle on/off the small parties only or not
function sizeToggle() {
	var size = document.getElementsByClassName("sizeSmall");
	for (var i = 0; i < size.length; i++) {
		size[i].classList.toggle("displayHidden2");
	}
}