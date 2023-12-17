export enum QuizStepEnum {
    WAITING_TO_START = 'WAITING_TO_START',
    ROUND_GENERATION = 'ROUND_GENERATION',
    QUESTION = 'QUESTION',
    CORRECTION = 'CORRECTION',
    ROUND_SCORE = 'ROUND_SCORE',
    FINISHED = 'FINISHED'
}

export enum QuizCategoryEnum {
    ANIMALS = "ANIMALS",
    ART = "ART",
    FASHION = "FASHION",
    FOOD = "FOOD",
    GEOGRAPHY = "GEOGRAPHY",
    HEALTH = "HEALTH",
    HISTORY = "HISTORY",
    LANGUAGES = "LANGUAGES",
    LITERATURE = "LITERATURE",
    MATH = "MATH",
    MOVIES = "MOVIES",
    MUSIC = "MUSIC",
    NATURE = "NATURE",
    PHILOSOPHY = "PHILOSOPHY",
    POLITICS = "POLITICS",
    RANDOM = "RANDOM",
    SCIENCE = "SCIENCE",
    SPACE = "SPACE",
    SPORTS = "SPORTS",
    TECHNOLOGY = "TECHNOLOGY",
    TRAVEL = "TRAVEL"
}

export const quizCategoryLabel: { [key in QuizCategoryEnum]: string } = {
    [QuizCategoryEnum.ANIMALS]: "Animals",
    [QuizCategoryEnum.ART]: "Art",
    [QuizCategoryEnum.FASHION]: "Fashion",
    [QuizCategoryEnum.FOOD]: "Food",
    [QuizCategoryEnum.GEOGRAPHY]: "Geography",
    [QuizCategoryEnum.HEALTH]: "Health",
    [QuizCategoryEnum.HISTORY]: "History",
    [QuizCategoryEnum.LANGUAGES]: "Languages",
    [QuizCategoryEnum.LITERATURE]: "Literature",
    [QuizCategoryEnum.MATH]: "Mathematics",
    [QuizCategoryEnum.MOVIES]: "Movies",
    [QuizCategoryEnum.MUSIC]: "Music",
    [QuizCategoryEnum.NATURE]: "Nature",
    [QuizCategoryEnum.PHILOSOPHY]: "Philosophy",
    [QuizCategoryEnum.POLITICS]: "Politics",
    [QuizCategoryEnum.RANDOM]: "Random",
    [QuizCategoryEnum.SCIENCE]: "Science",
    [QuizCategoryEnum.SPACE]: "Space",
    [QuizCategoryEnum.SPORTS]: "Sports",
    [QuizCategoryEnum.TECHNOLOGY]: "Technology",
    [QuizCategoryEnum.TRAVEL]: "Travel"
};

export enum QuizDifficultyEnum {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
}

export const quizDifficultyLabel: { [key in QuizDifficultyEnum]: string } = {
    [QuizDifficultyEnum.EASY]: "Easy",
    [QuizDifficultyEnum.MEDIUM]: "Medium",
    [QuizDifficultyEnum.HARD]: "Hard",
};

export enum QuizVisibilityEnum {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
}

export const quizVisibilityLabel: { [key in QuizVisibilityEnum]: string } = {
    [QuizVisibilityEnum.PRIVATE]: "Private",
    [QuizVisibilityEnum.PUBLIC]: "Public",
};