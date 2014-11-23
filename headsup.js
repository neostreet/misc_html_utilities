var ix1,ix2,ix3,ix4;
var num_quizzes = 0;
var num_lefts = 0;
var num_rights = 0;
var correct_answers = 0;
var incorrect_answers = 0;
var correct_streak = 0;
var max_correct_streak = 0;

newHeadsUp();

simpleAddEvent(document, "keydown", handlekey);

function simpleAddEvent(obj, evt, cbk) {
  if (obj.addEventListener) { obj.addEventListener(evt, cbk, false); }
  else if (obj.attachEvent) { obj.attachEvent("on" + evt, cbk); } // IE
}

function incrementNumLefts()
{
  num_lefts++;
  var num_lefts_obj = document.getElementById("num_lefts")
  num_lefts_obj.innerHTML = num_lefts + " num_lefts";
}

function incrementNumRights()
{
  num_rights++;
  var num_rights_obj = document.getElementById("num_rights")
  num_rights_obj.innerHTML = num_rights + " num_rights";
}

function incrementNumQuizzes()
{
  num_quizzes++;
  var num_quizzes_obj = document.getElementById("num_quizzes")
  num_quizzes_obj.innerHTML = num_quizzes + " num_quizzes";
}

function incrementCorrectAnswers()
{
  correct_answers++;
  var correct_answers_obj = document.getElementById("correct_answers")
  correct_answers_obj.innerHTML = correct_answers + " correct_answers";

  correct_streak++;
  var correct_streak_obj = document.getElementById("correct_streak")
  correct_streak_obj.innerHTML = correct_streak + " correct_streak";

  if (correct_streak > max_correct_streak) {
    max_correct_streak = correct_streak;
    var max_correct_streak_obj = document.getElementById("max_correct_streak")
    max_correct_streak_obj.innerHTML = max_correct_streak + " max_correct_streak";
  }
}

function incrementIncorrectAnswers()
{
  incorrect_answers++;
  var incorrect_answers_obj = document.getElementById("incorrect_answers")
  incorrect_answers_obj.innerHTML = incorrect_answers + " incorrect_answers";

  correct_streak = 0;
  var correct_streak_obj = document.getElementById("correct_streak")
  correct_streak_obj.innerHTML = correct_streak + " correct_streak";
}

function processLeft()
{
  incrementNumLefts();
  incrementCorrectAnswers();

  incrementNumQuizzes();

  newFlop();
}

function processRight()
{
  incrementNumRights();
  incrementCorrectAnswers();

  incrementNumQuizzes();

  newFlop();
}

function newHeadsUp()
{
  var card1 = document.getElementById("card1")
  var card2 = document.getElementById("card2")
  var card3 = document.getElementById("card3")
  var card4 = document.getElementById("card4")

  ix1 = Math.floor(Math.random()*52)
  card1.src = ix1 + ".bmp"

  do {
    ix2 = Math.floor(Math.random()*52)
  } while (ix2 === ix1);

  card2.src = ix2 + ".bmp"

  do {
    ix3 = Math.floor(Math.random()*52)
  } while (ix3 === ix2 || ix3 === ix1);

  card3.src = ix3 + ".bmp"

  do {
    ix4 = Math.floor(Math.random()*52)
  } while (ix4 === ix3 || ix4 === ix2 || ix4 === ix1);

  card4.src = ix4 + ".bmp"
}

function handlekey(e)
{
  var keycode, oldPly, oldVar, colRow, colRowList;

  if (!e) { e = window.event; }

  keycode = e.keyCode;

  if (e.altKey || e.ctrlKey || e.metaKey) { return true; }

  switch (keycode) {

    case  8: // backspace
    case  9: // tab
    case 16: // shift
    case 17: // ctrl
    case 18: // alt
    case 32: // space
    case 33: // page-up
    case 34: // page-down
    case 35: // end
    case 36: // home
    case 92: // super
    case 93: // menu
    case 188: // comma
      return true;

    case 37: // left-arrow
    case 76: // l
      processLeft();
      break;

    case 39: // right-arrow
    case 82: // r
      processRight();
      break;

    default:
      return true;
  }
  return false;
}
