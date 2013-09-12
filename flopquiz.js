var ix1,ix2,ix3;
var suit1,suit2,suit3;
var denom1,denom2,denom3;
var num_quizzes = 0;
var num_dry_flops = 0;
var num_wet_flops = 0;
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

function getSuitsAndDenoms()
{
  suit1 = Math.floor(ix1 / 13);
  denom1 = ix1 % 13;

  suit2 = Math.floor(ix2 / 13);
  denom2 = ix2 % 13;

  suit3 = Math.floor(ix3 / 13);
  denom3 = ix3 % 13;
}

function flush()
{
  return ((suit1 === suit2) && (suit1 === suit3));
}

function straight()
{
  if (pair_or_better())
    return false;

  var min = Math.min(Math.min(denom1,denom2),denom3);
  var max = Math.max(Math.max(denom1,denom2),denom3);
  var max2;

  // handle wheel case
  if (max === 12) {
    if (denom1 === 12)
      max2 = Math.max(denom2,denom3);
    else if (denom2 === 12)
      max2 = Math.max(denom1,denom3);
    else
      max2 = Math.max(denom1,denom2);

    if (max2 <= 3)
      return true;
  }

  return (max - min <= 4);

  return false;
}

function pair_or_better()
{
  return ((denom1 === denom2) || (denom1 === denom3) || (denom2 === denom3));
}

function incrementNumDryFlops()
{
  num_dry_flops++;
  var num_dry_flops_obj = document.getElementById("num_dry_flops")
  num_dry_flops_obj.innerHTML = num_dry_flops + " num_dry_flops";
}

function incrementNumWetFlops()
{
  num_wet_flops++;
  var num_wet_flops_obj = document.getElementById("num_wet_flops")
  num_wet_flops_obj.innerHTML = num_wet_flops + " num_wet_flops";
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

function isDry(ix1,ix2,ix3)
{
  getSuitsAndDenoms();

  if (flush())
    return false;

  if (straight())
    return false;

  if (pair_or_better())
    return false;

  return true;
}

function isWet(ix1,ix2,ix3)
{
  getSuitsAndDenoms();

  if (flush())
    return true;

  if (straight())
    return true;

  if (pair_or_better())
    return true;

  return false;
}

function processDry()
{
  var isdry = isDry(ix1,ix2,ix3);

  if (isdry) {
    incrementNumDryFlops();
    incrementCorrectAnswers();
  }
  else {
    incrementNumWetFlops();
    incrementIncorrectAnswers();
  }

  incrementNumQuizzes();

  newFlop();
}

function processWet()
{
  var iswet = isWet(ix1,ix2,ix3);

  if (iswet) {
    incrementNumWetFlops();
    incrementCorrectAnswers();
  }
  else {
    incrementNumDryFlops();
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
      processDry();
      break;

    case 39: // right-arrow
      processWet();
      break;

    default:
      return true;
  }
  return false;
}
