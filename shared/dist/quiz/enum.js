"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizVisibilityLabel = exports.QuizVisibilityEnum = exports.quizDifficultyLabel = exports.QuizDifficultyEnum = exports.quizCategoryLabel = exports.QuizCategoryEnum = exports.QuizStepEnum = void 0;
var QuizStepEnum;
(function (QuizStepEnum) {
    QuizStepEnum["WAITING_TO_START"] = "WAITING_TO_START";
    QuizStepEnum["ROUND_GENERATION"] = "ROUND_GENERATION";
    QuizStepEnum["QUESTION"] = "QUESTION";
    QuizStepEnum["CORRECTION"] = "CORRECTION";
    QuizStepEnum["ROUND_SCORE"] = "ROUND_SCORE";
    QuizStepEnum["FINISHED"] = "FINISHED";
})(QuizStepEnum || (exports.QuizStepEnum = QuizStepEnum = {}));
var QuizCategoryEnum;
(function (QuizCategoryEnum) {
    QuizCategoryEnum["ANIMALS"] = "ANIMALS";
    QuizCategoryEnum["ART"] = "ART";
    QuizCategoryEnum["FASHION"] = "FASHION";
    QuizCategoryEnum["FOOD"] = "FOOD";
    QuizCategoryEnum["GEOGRAPHY"] = "GEOGRAPHY";
    QuizCategoryEnum["HEALTH"] = "HEALTH";
    QuizCategoryEnum["HISTORY"] = "HISTORY";
    QuizCategoryEnum["LANGUAGES"] = "LANGUAGES";
    QuizCategoryEnum["LITERATURE"] = "LITERATURE";
    QuizCategoryEnum["MATH"] = "MATH";
    QuizCategoryEnum["MOVIES"] = "MOVIES";
    QuizCategoryEnum["MUSIC"] = "MUSIC";
    QuizCategoryEnum["NATURE"] = "NATURE";
    QuizCategoryEnum["PHILOSOPHY"] = "PHILOSOPHY";
    QuizCategoryEnum["POLITICS"] = "POLITICS";
    QuizCategoryEnum["RANDOM"] = "RANDOM";
    QuizCategoryEnum["SCIENCE"] = "SCIENCE";
    QuizCategoryEnum["SPACE"] = "SPACE";
    QuizCategoryEnum["SPORTS"] = "SPORTS";
    QuizCategoryEnum["TECHNOLOGY"] = "TECHNOLOGY";
    QuizCategoryEnum["TRAVEL"] = "TRAVEL";
})(QuizCategoryEnum || (exports.QuizCategoryEnum = QuizCategoryEnum = {}));
exports.quizCategoryLabel = (_a = {},
    _a[QuizCategoryEnum.ANIMALS] = "Animals",
    _a[QuizCategoryEnum.ART] = "Art",
    _a[QuizCategoryEnum.FASHION] = "Fashion",
    _a[QuizCategoryEnum.FOOD] = "Food",
    _a[QuizCategoryEnum.GEOGRAPHY] = "Geography",
    _a[QuizCategoryEnum.HEALTH] = "Health",
    _a[QuizCategoryEnum.HISTORY] = "History",
    _a[QuizCategoryEnum.LANGUAGES] = "Languages",
    _a[QuizCategoryEnum.LITERATURE] = "Literature",
    _a[QuizCategoryEnum.MATH] = "Mathematics",
    _a[QuizCategoryEnum.MOVIES] = "Movies",
    _a[QuizCategoryEnum.MUSIC] = "Music",
    _a[QuizCategoryEnum.NATURE] = "Nature",
    _a[QuizCategoryEnum.PHILOSOPHY] = "Philosophy",
    _a[QuizCategoryEnum.POLITICS] = "Politics",
    _a[QuizCategoryEnum.RANDOM] = "Random",
    _a[QuizCategoryEnum.SCIENCE] = "Science",
    _a[QuizCategoryEnum.SPACE] = "Space",
    _a[QuizCategoryEnum.SPORTS] = "Sports",
    _a[QuizCategoryEnum.TECHNOLOGY] = "Technology",
    _a[QuizCategoryEnum.TRAVEL] = "Travel",
    _a);
var QuizDifficultyEnum;
(function (QuizDifficultyEnum) {
    QuizDifficultyEnum["EASY"] = "EASY";
    QuizDifficultyEnum["MEDIUM"] = "MEDIUM";
    QuizDifficultyEnum["HARD"] = "HARD";
})(QuizDifficultyEnum || (exports.QuizDifficultyEnum = QuizDifficultyEnum = {}));
exports.quizDifficultyLabel = (_b = {},
    _b[QuizDifficultyEnum.EASY] = "Easy",
    _b[QuizDifficultyEnum.MEDIUM] = "Medium",
    _b[QuizDifficultyEnum.HARD] = "Hard",
    _b);
var QuizVisibilityEnum;
(function (QuizVisibilityEnum) {
    QuizVisibilityEnum["PRIVATE"] = "PRIVATE";
    QuizVisibilityEnum["PUBLIC"] = "PUBLIC";
})(QuizVisibilityEnum || (exports.QuizVisibilityEnum = QuizVisibilityEnum = {}));
exports.quizVisibilityLabel = (_c = {},
    _c[QuizVisibilityEnum.PRIVATE] = "Private",
    _c[QuizVisibilityEnum.PUBLIC] = "Public",
    _c);
