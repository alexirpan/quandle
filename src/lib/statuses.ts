import { solutions } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'unknown';

// The status of a given square depends on its position in the word.
export type Superposition = {
    absent: number;
    present: number;
    correct: number;
    total: number;
};

export type KnownChar = {
    char: string;
    index: number;
    status: CharStatus;
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

const consistent = (sol: string, known: KnownChar[]): boolean => {
    return known.every(({ char, index, status }, i) => {
        if (status === 'correct' && sol[index] !== char) {
            return false;
        } else if (status === 'present' && (!sol.includes(char) || sol[index] === char)) {
            return false;
        } else if (status === 'absent' && sol.includes(char)) {
            return false;
        } else {
            return true;
        }
    });
};

export const possibleSolutions = (known: KnownChar[]): string[] => {
    return solutions.filter(sol => consistent(sol, known));
};

export const getGuessStatuses = (guess: string, solution: string): CharStatus[] => {
  // statuses for single solution word.
  // This doesn't need to account for known chars because that is already handled
  // by possibleSolutions filter.
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


export const getGuessStatusSuperpos = (guess: string, known: KnownChar[]): Superposition[] => {
  // return the green / yellow / gray status for each letter in the guess.
  // do this based on all possible solutions.
  const possible = possibleSolutions(known);
  // only return clear status if it is true in all possibilities.
  const splitGuess = guess.split('')

  const superpos: Superposition[] = [];
  for (let i = 0; i < guess.length; i++) {
    superpos[i] = { absent: 0, present: 0, correct: 0, total: 0 };
  }
  for (let i = 0; i < possible.length; i++) {
    const statuses = getGuessStatuses(guess, possible[i]);
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
