//***********************
// Define some constants.
//***********************

// IDs associated with the Q and A window that pops up
var qa = {
    'Main'      : '#qawindow',
    'Timer'     : '#qawindow #timer',
    'Header'    : '#qawindow #header',          // The entire header
    'Category'  : '#qawindow #header #category',
    'Wager'     : '#qawindow #header #wager',
    'Question'  : '#qawindow #question',
    'Answer'    : '#qawindow #answer',
    'Controls'  : '#qawindow #controls',
    'Reveal'    : '#qawindow #reveal'
};

var dlg = {
    'Window'    : '#dialog',
    'Header'    : '#dlgtitle',
    'Body'      : '#dlgbody',
    'Buttons'   : '#dlgokcancel'
};

// Global variables.
var teamCount = 0;            // Number of teams playing.
var MissingLink = "___";    // Replaces numeric value on board.
var activeLink = null;      // The link that was clicked to open another window.
var wagerAmount;            // An array of wagers, containing the most recent wager for each team.
var autoClose = true;       // After moderator chooses "right/wrong" score window closes automatically.

//******************************************************
// This function is called first to get number of teams.
//******************************************************

function initialize()
{
    // Hide elements that need to be hidden.
    closeWindow();
    closeDialog();

    document.title = Title;
    var userInput = prompt('How many teams are playing?', '2');

    if (userInput != '' && userInput != null)
    {
        teamCount = parseInt(userInput);
    }

    // Once we know how many teams there are, we can create the score table
    $("#score").html( makeScoreTable());    

    // And then the controls for adjusting scores after answers.
    $("#controls").html(makeControls());
}

function getRandom(min,max)
{
   return (Math.round(Math.random()*(max-min)))+min;
}

function autoCloseOnScore(whetherTo)
{
    // Set value if passed in, else leave as is.    
    autoClose = argv(whetherTo, autoClose);
    
    // Return value.
    return autoClose;
}

//********************************************
// This gets called when a link is clicked on.
//********************************************

function selectItem(category, row, dd)
{
    autoCloseOnScore(true);
    
    // Store wager amount for use in subsequent dialogs.
    wagerAmount = new Array();
	wagerAmount[0] = SQV * row;

    // Store this so the link can be blanked once the question has been answered.
    activeLink = "#b" + category + "" + row;
    
    category --;
    row --;

    // If its a daily double, get the wager.
	if (DailyDouble && dd==1)
		wager = prompt('DAILY DOUBLE!!!\nHow much would you like to wager?', wagerAmount);

    var Question = "<b>Question:</b> " + QuestionsAndAnswers[category][row].getQuestion();
    var Answer = QuestionsAndAnswers[category][row].getAnswer();
    
    // Show the answer window and start the timer.
    showAnswer(Titles[category], Answer, Question, TimePerQuestion, wagerAmount);
}

function showAnswer(category, answer, question, time, wager)
{    
    $(qa.Category).html(category);
    $(qa.Wager).html(wager);
    $(qa.Question).html(question);
    $(qa.Answer).html(answer);

    // Hide question and controls.
    $(qa.Question).hide();
    $(qa.Controls).hide();

    // Show panel with reveal and cancel buttons.
    $(qa.Reveal).show();
    
    // Show the QA window.
    $(qa.Main).show();

    // Start countdown timer.
    startTimer();
}

/*******************************************************************
 * Called from "Reveal Question" button on main quiz div.
 * Shows the "question" after the team has had their chance to 
 * conjecture.
 ******************************************************************/

function revealQuestion()
{
    stopTimer();
    $(qa.Question).show();
    $(qa.Controls).show();
    $(qa.Reveal).hide();
}

/*******************************************************************
 * Title:       Title in the dialog title portion.
 * Body:        The content that goes in the dialog's body portion.
 * OnFinish:    The function that is called after the dialog closes.
 *              -- default ""
 * ok, cancel:  The text in the buttons for ok and cancel.
 *              -- defaults: "Ok", "Cancel"
 ******************************************************************/

function showDialog(title, body, onfinish, oktext, canceltext)
{
    // If variabls not passed in use a default.
    onfinish=argv(onfinish,"");
    oktext=argv(oktext, "Ok");
    canceltext=argv(canceltext, "Cancel");
    
    $(dlg.Header).html(title);
    $(dlg.Body).html(body);
    
    var ok = "<input type='button' value='" + oktext + "' onclick='closeDialog();" + onfinish + "' />";
    var cancel = "<input type='button' value='" + canceltext + "' onclick='closeDialog();' />";
    $(dlg.Buttons).html(ok + cancel);
    
    $(dlg.Window).show();
}

function closeDialog(onfinish)
{
    $(dlg.Window).hide();
}

/*******************************************************************
 * Process:
 * Get wager amounts from each team
 * Show question, teams must write their answer down
 * Read answers / Reveal answer
 * Show options for correct or incorrect to change totals.
 ******************************************************************/

function getFinalWagers()
{
    var title = "Final Category: " + FinalCategory;

    var body =  "<table id='finalwager'>";
    body += "<tr><th>Team</th><th>Wager</th><th>Current $</th></tr>";
    for (var i=1; i<=teamCount; i++)
    {
        var money = parseInt($("#team" + i).html());
        body += "<tr>";
        body += "<td align=center> Team " + i + "</th>";
        body += "<td> <input type='text' name='finalwageramt" + i + "' value='0' /> </td>";
        body += "<td>" + money + "</td>";
        body += "</tr>";
    }    
    body += "</table>";
    
    // Show the get wagers dialog, when finished call revealFinalAnswer().
    showDialog(title, body, "revealFinalAnswer()");
}

function revealFinalAnswer()
{
    // Select all elements with a name that begins with finalwageramt.
    wagers = $("[name^='finalwageramt']");
    //var finalwagers = new Array(teamCount);
    var finalwagers="<br />";
    
    // Set wagerAmount as an array.
    wagerAmount = new Array();
    for(var i=0; i<teamCount; i++)
    {
        finalwagers += "Team " + (i+1) + ": " + wagers[i].value;
        if (i+1 < teamCount) finalwagers += "<br />";
        //finalwagers[i] = wagers[i].value;
        wagerAmount[i] = parseInt(wagers[i].value);
    }

    $(qa.Header).html("Final Showdown");
    $(qa.Question).html(FinalJeopardyQ);
    $(qa.Answer).html(FinalJeopardyA);

    // Hide question and controls.
    $(qa.Question).hide();
    $(qa.Controls).hide();
    
    // Don't close after selecting right/wrong, since we have multiple teams.
    autoCloseOnScore(false);
    
    // Show panel with reveal and cancel buttons.
    $(qa.Reveal).show();
    
    // Show the QA window.
    $(qa.Main).show();

    // Start countdown timer.
    startTimer(TimeForFinalQuestion);
}


/********************************************************************* 
 * Make a series of buttons for correct or incorrect answers given
 * by a given team. The buttons will have ids of "right1", "right2", or 
 * "wrong1, wrong2", etc...
 *********************************************************************/
 
function makeControls()
{
    html = "<table> <tr> <td> <b>CORRECT</b> </td>";
    for (var i = 1; i<=teamCount; i++)
    {
        btnid = "btnright"+i;
        html += "<td>";
        html += "<input class='btnRight' type='button' id='" + btnid + 
                "'value='Team " + i + "' onclick='incScore(" + i + ");' />";
        html += "</td>";
    }
    html += "<td rowspan='2'> &nbsp;&nbsp;&nbsp;<input type='button' onclick='closeWindow();' value='Close' /> </td>";
    html += "</tr><tr><td><b>INCORRECT</b></td>";
    
    for (var i = 1; i<=teamCount; i++)
    {
        btnid = "btnwrong" + i;
        html += "<td>";
        html += "<input class='btnWrong' type='button' id='" + btnid + 
                "' value='Team " + i + "' onclick='decScore(" + i + ");' />";
        html += "</td>";
    }
    html += "</tr></table>";  
    return html;  
}

/*******************************************************************
 * Generate the table that will display the team scores at the
 * bottom of the main panel.
 ******************************************************************/
 
function makeScoreTable()
{
    var html = "<tr>";
    
    // Team names.
    for (var i = 1; i<=teamCount; i++)
    {
        html += "<th contenteditable align=center> Team " + i + "</th>";
    }
    
    // Button for final answer if needed.
    if (FinalAnswer)
    {
        html += "<th rowspan='2'>";
        html += "<input type='button' value='Final Answer' onclick='getFinalWagers();' />";
        html += "</th>";
    }

    html += "</tr><tr>";
    
    // Team scores.
    for (var i = 1; i<=teamCount; i++)
    {
        html += "<td contenteditable id='team" + i + "' align=center>0</td>";
    }

    html += "</tr>";
    
    return html;
}

function getScore(team)
{
	var id = "#team" + team;
	var val = parseInt($(id).html());
	return val;
}

// team is a number identifying the team.
function incScore(team)
{     
    // Get the team's current winnings.
	var id = "#team" + team;
	var val = parseInt($(id).html());
    
    // Get the team's current wager.    
    var amount = wagerAmount.getTeamWager(team-1);

    // Adjust accordingly.
	$(id).html(val + amount);

    if (autoCloseOnScore()) closeWindow();
}

function decScore(team)
{
	var id = "#team" + team;
	var val = parseInt($(id).html());
    var amount = wagerAmount.getTeamWager(team-1);
	$(id).html(val - amount);
    
    if (autoCloseOnScore()) closeWindow();
}

function cancelQuestion()
{
    // Don't hide the link to this question.
    activeLink = null;

    closeWindow();
}

function closeWindow()
{
    // Hide the link that was clicked on.
    if (activeLink != null)
    {
        $(activeLink).html(MissingLink);
        $(activeLink).css("color", "lightgray");
    }
    
    // Un-opacify final answer button when all links have been clicked on.
    if (FinalAnswer)
    {
        doneitems = $("a:contains('" + MissingLink + "')");
        if (doneitems.length == NumCategories*NumQuestionsPerCategory)
        {
            $("#score input[type=button]").css("opacity", "1");
        }
    }

    stopTimer();
    $(qa.Main).hide();
}

//**********************
// Countdown timer code.
//**********************

var timerVariable=null;

function startTimer(numSeconds)
{
    // Use default if nothing passed in.
    numSeconds=argv(numSeconds, TimePerQuestion);
    
    if (timerVariable != null) stopTimer();

    // Reset countdown timer panel.
    $(qa.Timer).css("color", "white");
    $(qa.Timer).html(numSeconds);

    // Reset the timer to go off every second.
    timerVariable = setInterval("decTimer()",1000);
}

function stopTimer()
{
    if (timerVariable != null)
    {
        clearInterval(timerVariable);
        timerVariable = null;
    }
}

// This decrements the timer 1 second at a time.
function decTimer()
{
    var val = parseInt($(qa.Timer).html());
    val--;

    $(qa.Timer).html(val);

    // Change the color to red for the last 10 seconds.
    if (val < 10) $(qa.Timer).css("color", "red");

    // Stop the countdown at 0.
    if (val == 0) stopTimer();
}


//*******************************************************************
// Set an argument to its value, if it is undefined, use the default.
// Allows you to have defaults arguments with functions such as:
// function x(a,b,c) { a=argv(a,1); b=argv(b,2); c=argv(c,3); }
//*******************************************************************

function argv(arg, val) { return typeof arg !== 'undefined' ? arg : val; }


//*************************************************************************
// While this appears to be a function, it is actually a javascript object.
// value, answer and question are it's member variables.
//*************************************************************************

function qAndA(v, a, q)
{    
    // Set instance variables for this object.
    this.value = v;
    this.answer = a;
    this.question = q;

    // Add methods to this object.
    this.getValue = getValue;
    this.getQuestion = getQuestion;
    this.getAnswer = getAnswer;
}

function getValue() { return this.value; }
function getQuestion() { return this.question; }
function getAnswer() { return this.answer; }



Array.prototype.getTeamWager=function(team)
{
    if (this.length > 1)
        return this[team];
    else
        return this[0];
}
