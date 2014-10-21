//**************************************************
// These are the questions and answers for the game.
// This file should be included AFTER the utility.js
// file, which is where the qAndA object is defined.
//**************************************************

// Define the title of the game.
var Title = "Wilderness First Responder";

// (Starting Question Value) How much more each question is worth than the previous.
// e.g. if the first question is 100, the next is 200 then 300 then 400...
var SQV = 100;

// Acronyms
var cat1 = new Array(
    new qAndA(SQV*1, "To minimize symptoms of a sprain or strain, the rescuer should ______ the injury.", "What is 'R.I.C.E'?"),
    new qAndA(SQV*2, "ABCDE.", "What is 'Airway, Breathing, Circulation, Disability/Deformity, Environment'?"),
    new qAndA(SQV*3, "Includes Allergies, Medications, Patient History, Last In Last Out, and Events Leading To.", "What is 'AMPLE'?"),
    new qAndA(SQV*4, "Signs and symptoms of infection.", "What is 'SHARP'?"),
    new qAndA(SQV*5, "AVPU", "What is 'Alert, Voice, Pain, Unresponsive'?")
);

// Tools of the Trade
var cat2 = new Array(
    new qAndA(SQV*1, "A device used to imobilize a (fx) after (til) has been used to reset bone.", "What is 'Splint'?"),
    new qAndA(SQV*2, "The essence of litter packing.", "What is 'Avoid the Void'?"),
    new qAndA(SQV*3, "Body Substance Isolation (BSI).", "What is 'Gloves, Hand washing, Indirect contact, Masks, Gowns, Resuscitation equipment'?"),
    new qAndA(SQV*4, "Includes immediate danger from the environment, BSI, and should be assessed before reaching the patient.", "What is 'Scene Safety'?"),
    new qAndA(SQV*5, "Failure to act as a reasonably prudent person with knowledge, experience, and background.", "What is 'Negligence'?")
);

// Signs & Symptoms
var cat3 = new Array(
    new qAndA(SQV*1, "Excessive flexion, extention, compression, and tumbling falls are _______ for spinal injuries.", "What are 'MOIs'?"),
    new qAndA(SQV*2, "Three types of allergic reaction.", "What is 'Local, Systemic, Anaphylactic'?"),
    new qAndA(SQV*3, "Localized freezing of tissue caused by constriction of blood vessels and shunting of blood away from cold areas.", "What is 'Frostbite'?"),
    new qAndA(SQV*4, "Sternum and/or multiple adjacent ribs broken in two or more places.", "What is 'Flail Chest'?"),
    new qAndA(SQV*5, "These compensatory mechanisms occur whenever the body perceives a crisis.", "What is 'Vasoconstriction, Increased Heart Rate, Increased Respiratory Rate'?")
);

// Human Anatomy
var cat4 = new Array(
    new qAndA(SQV*1, "The body's primary defense.", "What is 'The Integumentary System (skin)'?"),
    new qAndA(SQV*2, "The longest bone in the body.", "What is 'Femur'?"),
    new qAndA(SQV*3, "A condition in which the cardiovascular system fails to provide sufficient pressure.", "What is 'SHOCK'?"),
    new qAndA(SQV*4, "The vital signs for compensatory shock.", "What is 'LOC, Skin, HR, RR, Pupils'?"),
    new qAndA(SQV*5, "Cardiogenic, Hypovolemic, Neurogenic.", "What are 'Types of Shock'?")
);

// Patient Care
var cat5 = new Array(
    new qAndA(SQV*1, "Treatment for Poison Ivy.", "What is 'Wash with soap and water. Provide anti-histamines'?"),
    new qAndA(SQV*2, "Painful cramps, fever, chills, rigid abdomen, and elevated BP.", "What is 'S/S of Black Widow bite'?"),
    new qAndA(SQV*3, "Areas that need critical evaluation with burns.", "What is 'Face and Feet'?"),
    new qAndA(SQV*4, "Purpose of primary survey.", "What is 'To identify immediate life threats'?"),
    new qAndA(SQV*5, "Long term exposure to weather. Dramatic impact on patient care and on rescuers.", "What is 'Environmental Concerns'?")
);

// Define an array that contains the arrays of questions and answers.
// Don't change this unless you need to add more categories.
var QuestionsAndAnswers = new Array(cat1, cat2, cat3, cat4, cat5);  

// Define the category titles.
var Titles = new Array("Acronyms", 
                        "Tools of the Trade",
                        "Signs & Symptoms",
                        "Human Anatomy",
                        "Patient Care");

var FinalCategory = "C-Spine";
var FinalJeopardyA = "Clearing your patient of a C-Spine.";
var FinalJeopardyQ = "What is 'Do a ton of stuff'?";

// Define the amount of time given to answer each question.
var TimePerQuestion = 20;

// Define the amount of time given to answer the Final Question.
var TimeForFinalQuestion = 40;

// This will control how many categories and questions 
// per category are displayed on the main page.
var NumCategories = 5;				// How many categories to show.
var NumQuestionsPerCategory = 5;	// How many rows to show.

var DailyDouble = true; 	// If false the DailyDouble question won't be included.
var FinalAnswer = true;	    // If false the "Final Question" button won't be displayed.
