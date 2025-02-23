// Quiz Data: Add/edit questions and answers here
const quizData = [
    { question: "Who is the director?", answer: "Danny Boyle" },
    { question: "What was Trainspotting based off?", answer: "Irvine Welsh's 1993 book Transpotting" },
    { question: "Why did he create Trainpotting?", answer: "Boyle was born into a working class Catholic family, often arguing for working class rights. He hated the drug war, believing that addicts had to be helped and not punished." },
    { question: "What year was Trainspotting released?", answer: "1996" },
    { question: "Where is Trainspotting set?", answer: "Edinburgh" },
    { question: "What was some of the political context occuring at the time of this film?", answer: "In the 1980s, Scotland was going through a huge drug crisis. Addicts were arrested, not helped. This is known as the War on Drugs. It also has links to Thatcherism, as PM Margaret Thatcher's classist policies destroyed the Scottish economy." },
    { question: "What was some of the social context surrounding this film?", answer: "- youth culture dominated the media, Young british art, Britpop, Kurt Kobain, oasis Lad culture: glorified drugs and alcohol and sexism" },
    { question: "Explain the three narrative theories on Trainspotting?", answer: "Todorov: Renton never goes through the whole set of stages. His addiction and relapses mean he's in a loop of being unable to progress in life. Freud: Renton is very much the id, slowly becoming the ego. Strauss: Drugs/Recovery, Renton/A normal life." },
    { question: "How are drugs represented in TS?", answer: "Open: Lust For Life by Iggy Pop, about drugs. Choose Life speech mocks government PSAs and a normal life. Grey + Brown. Renton falls backwards, in real life and into drugs. Toilet: Swimming towards the light. Dirty, dark. Blue water contrasts with brown exterior. Shows desperation. Overdose: Grave framing. Red lighting. Match on action from green fence to red room. Perfect Day by Lou Reed. Boyle criticises government handling of addiction." },
    { question: "How is friendship represented in TS?", answer: "Highlands: All dressed for different occasions, divided. Addicts can't cross the bridge. Arguing, mean to eachother. Tommy: Renton never apologises, lets him try heroine, deterioration of the flat, lowkey. End: Lowkey > Highkey, So called mates, Music is less muffled, leaves Spud money. These relationships aren't healthy. You have to end them eventually." },
    { question: "How is recovery represented in TS?", answer: "Toilet: Swimming towards light, flickering lights, sinks into toilet, low angle. Come Down: Hallway stretches, One more hit. One window = one chance. Spud's chain, they're both trapped. End: Deep > Shallow depth of field. Lowkey > Highkey, Repeats Choose Life speech. Crosses the bridge he couldn't earlier. Recovery is hard, and addicts need help (not prison)" },
    { question: "How is guilt represented in TS?", answer: "Come Down: Dianne singing nursery rhymes shows her age, Crying baby shows his guilt, Spud's chains mimic ticking. Tommy's death, parents on a quiz show about viruses showing he's guilty about lying. Dawn's Death: Opens on blue, red walls, uses drugs to cope, Pile misery on misery. End: I've tried to justify this, leaves Spud money, lowkey > highkey Renton's a good person in a bad situation." },
    { question: "How is mudanity represented in TS?", answer: "Open: Choose Life speech, Lust for Life by Iggy Pop, desaturated, opens on him running. Highlands: His rant shows disenfranchisement. Can't cross the bridge. We're the scum of the ****in Earth Close: Repeats Choose Life speech, fades to shallow depth of field, grey, neutral tones. Shows the acceptance of a normal life" },
];

let currentQuestionIndex = 0;
const userAnswers = new Array(quizData.length).fill("");

// DOM Elements
const questionText = document.getElementById("question-text");
const userAnswerInput = document.getElementById("user-answer");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const feedbackList = document.getElementById("feedback");

// Functions
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    userAnswerInput.value = userAnswers[currentQuestionIndex] || "";
    updateButtons();
}

function updateButtons() {
    backButton.style.display = currentQuestionIndex === 0 ? "none" : "inline";
    nextButton.style.display = currentQuestionIndex === quizData.length - 1 ? "none" : "inline";
    submitButton.classList.toggle("hidden", currentQuestionIndex !== quizData.length - 1);
}

function submitQuiz() {
    let score = 0;
    feedbackList.innerHTML = ""; // Clear previous feedback

    quizData.forEach((q, index) => {
        const isCorrect = q.answer.toLowerCase() === (userAnswers[index] || "").trim().toLowerCase();
        if (isCorrect) score++;
        const feedbackItem = document.createElement("li");
        feedbackItem.textContent = `Q${index + 1}: Your answer "${userAnswers[index]}" is ${
            isCorrect ? "correct" : `incorrect (correct answer: "${q.answer}")`
        }.`;
        feedbackList.appendChild(feedbackItem);
    });

    scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}.`;
    resultContainer.classList.remove("hidden");
    document.getElementById("quiz-container").classList.add("hidden");
}

// Event Listeners
backButton.addEventListener("click", () => {
    userAnswers[currentQuestionIndex] = userAnswerInput.value;
    currentQuestionIndex--;
    loadQuestion();
});

nextButton.addEventListener("click", () => {
    userAnswers[currentQuestionIndex] = userAnswerInput.value;
    currentQuestionIndex++;
    loadQuestion();
});

submitButton.addEventListener("click", () => {
    userAnswers[currentQuestionIndex] = userAnswerInput.value;
    submitQuiz();
});

// Initialize Quiz
loadQuestion();

function submitQuiz() {
    let score = 0;
    feedbackList.innerHTML = ""; // Clear previous feedback

    quizData.forEach((q, index) => {
        // Convert answer and user input to lowercase and split the correct answer into keywords
        const correctAnswerKeywords = q.answer.toLowerCase().split(/[\s,]+/); // Split by spaces or commas
        const userAnswer = (userAnswers[index] || "").trim().toLowerCase();
        
        // Check if at least one keyword is present in the user's answer
        const isCorrect = correctAnswerKeywords.some(keyword => userAnswer.includes(keyword));
        
        if (isCorrect) score++;
        
        // Create feedback for each question
        const feedbackItem = document.createElement("li");
        feedbackItem.textContent = `Q${index + 1}: Your answer "${userAnswers[index]}" is ${
            isCorrect ? "correct" : `incorrect (correct answer: "${q.answer}")`
        }.`; 
        feedbackList.appendChild(feedbackItem);
    });

    // Display score and feedback
    scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}.`;
    resultContainer.classList.remove("hidden");
    document.getElementById("quiz-container").classList.add("hidden");
}
