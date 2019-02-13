const title = document.getElementById("statement_title");
const question = document.getElementById("statement_description");

var question_number = 0;
var answers = [];
var partij_results = [];

for (var i = 0; i < parties.length; i++) {
partij_results[i] = {"name": parties[i].name, "points": 0}
}
console.log(partij_results);


function start() {
	editWebpage();
}
function editWebpage() {
	title.innerHTML = subjects[question_number].title;
	question.innerHTML = subjects[question_number].statement;
}
function nextQuestion(counting) {
	if (subjects[question_number]) {
		if (counting == "up" && question_number != subjects.length - 1) {
			editWebpage();
			question_number++;
		} else if (question_number != 0) {
			question_number--;
			editWebpage();
		}
	}
}
function addAnswer(answer, direction) {
	answers[question_number] = answer;
	nextQuestion(direction);
}