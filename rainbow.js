var ix1,ix2,ix3;
var suit1,suit2,suit3;
var num_quizzes = 0;
var num_nonrainbow_flops = 0;
var num_rainbow_flops = 0;
var correct_answers = 0;
var incorrect_answers = 0;
var correct_streak = 0;
var max_correct_streak = 0;

newFlop();

simpleAddEvent(document, "keydown", handlekey);

function simpleAddEvent(obj, evt, cbk) {
  if (obj.addEventListener) { obj.addEventListener(evt, cbk, false); }
  else if (obj.attachEvent) { obj.attachEvent("on" + evt, cbk); } // IE
}

function getSuits()
{
  suit1 = Math.floor(ix1 / 13);

  suit2 = Math.floor(ix2 / 13);

  suit3 = Math.floor(ix3 / 13);
}

function incrementNumNonRainbowFlops()
{
  num_nonrainbow_flops++;
  var num_nonrainbow_flops_obj = document.getElementById("num_nonrainbow_flops")
  num_nonrainbow_flops_obj.innerHTML = num_nonrainbow_flops + " num_nonrainbow_flops";
}

function incrementNumRainbowFlops()
{
  num_rainbow_flops++;
  var num_rainbow_flops_obj = document.getElementById("num_rainbow_flops")
  num_rainbow_flops_obj.innerHTML = num_rainbow_flops + " num_rainbow_flops";
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

function isNonRainbow(ix1,ix2,ix3)
{
  getSuits();

  return ((suit1 === suit2) || (suit1 === suit3) || (suit2 === suit3))
}

function isRainbow(ix1,ix2,ix3)
{
  getSuits();

  return ((suit1 != suit2) && (suit1 != suit3) && (suit2 != suit3));
}

function processNonRainbow()
{
  var isnonrainbow = isNonRainbow(ix1,ix2,ix3);

  if (isnonrainbow) {
    incrementNumNonRainbowFlops();
    incrementCorrectAnswers();
  }
  else {
    incrementNumRainbowFlops();
    incrementIncorrectAnswers();
  }

  incrementNumQuizzes();

  newFlop();
}

function processRainbow()
{
  var israinbow = isRainbow(ix1,ix2,ix3);

  if (israinbow) {
    incrementNumRainbowFlops();
    incrementCorrectAnswers();
  }
  else {
    incrementNumNonRainbowFlops();
    incrementIncorrectAnswers();
  }

  incrementNumQuizzes();

  newFlop();
}

function newFlop()
{
  var card1 = document.getElementById("card1")
  var card2 = document.getElementById("card2")
  var card3 = document.getElementById("card3")

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
    case 78: // n
      processNonRainbow();
      break;

    case 39: // right-arrow
    case 82: // r
      processRainbow();
      break;

    default:
      return true;
  }
  return false;
}
