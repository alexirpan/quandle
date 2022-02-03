
export type CharStatus = 'absent' | 'present' | 'correct';

// The status of a given square depends on its position in the word.
export type Superposition = {
    absent: number;
    present: number;
    correct: number;
    total: number;
};


export type CharValue =
  | 'Q'
  | 'W'
  | 'E'
  | 'R'
  | 'T'
  | 'Y'
  | 'U'
  | 'I'
  | 'O'
  | 'P'
  | 'A'
  | 'S'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'K'
  | 'L'
  | 'Z'
  | 'X'
  | 'C'
  | 'V'
  | 'B'
  | 'N'
  | 'M'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  // TODO update charObj based on guesses.
  return charObj;
};

const consistent = (sol: string, guess: string, observeIndex: number, observeStatus: CharStatus): boolean => {
    // easiest to reuse algorithm code because of edge cases around
    // letter appearing multiple times.
    const statuses = getGuessStatuses(guess, sol);
    return statuses[observeIndex] === observeStatus;
};

export const possibleRealities = (realities: string[], guess: string, observeIndex: number, observeStatus: CharStatus): string[] => {
    return realities.filter(sol => consistent(sol, guess, observeIndex, observeStatus));
};

export const getGuessStatuses = (guess: string, solution: string): CharStatus[] => {
  // statuses for single solution word.
  // This doesn't need to account for known chars because that is already handled
  // by possibleSolutions filter.
  // How do we handle case where the guess has the letter multiple times?
  // In regular Wordle, one char gets green/yellow and the other gets gray, and
  // letters are taken green then yellow then gray, with tiebreak by position in word.
  // This...is kinda weird in the quantum case but let's go with that because it's less
  // work and decide whether it should change later.
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}


export const getGuessStatusSuperpos = (guess: string, realities: string[]): Superposition[] => {
  // only return clear status if it is true in all possibilities.

  const superpos: Superposition[] = [];
  for (let i = 0; i < guess.length; i++) {
    superpos[i] = { absent: 0, present: 0, correct: 0, total: 0 };
  }
  for (let i = 0; i < realities.length; i++) {
    const statuses = getGuessStatuses(guess, realities[i]);
    for (let j = 0; j < statuses.length; j++) {
        superpos[j].total++;
        if (statuses[j] === 'absent') {
            superpos[j].absent++;
        } else if (statuses[j] === 'present') {
            superpos[j].present++;
        } else if (statuses[j] === 'correct') {
            superpos[j].correct++;
        }
    }
  }
  return superpos;
}

export const observeSquare = (guess: string, realities: string[],
                              setRealities: (value: string[]) => void,
                              observeIndex: number, observeStatus: CharStatus) => {
    setRealities(possibleRealities(realities, guess, observeIndex, observeStatus));
}
