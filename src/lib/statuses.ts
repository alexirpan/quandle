import { solutions } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'unknown';

// The status of a given square depends on its position in the word.
export type Superposition = {
    absent: number;
    present: number;
    correct: number;
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

const consistent = (sol: string, known: KnownChar[]): bool -> {
    return known.every(({ char, index, status }, i) => {
        if (status == 'correct' && sol[index] != char) {
            return false;
        } else if (status == 'present' && (!sol.includes(char) || sol[index] == char)) {
            return false;
        } else if (status == 'absent' && sol.includes(char)) {
            return false;
        } else {
            return true;
        }
    });
};

export const possibleSolutions = (known: KnownChar[]): string[] => {
    return solutions.filter(sol => consistent(sol, known));
};

export const getGuessStatuses = (guess: string, known: KnownChar[]): CharStatus[] => {
  // return the green / yellow / gray status for each letter in the guess.
  // do this based on all possible solutions.
  const possible = possibleSolutions(known);
  // only return clear status if it is true in all possibilities.
  const splitGuess = guess.split('')

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  for (var i = 0; i < splitGuess.length; i++) {
    if (possible.every(sol => sol[i] == splitGuess[i])) {
        statuses[i] = 'correct';
    } else if (possible.every(sol => sol[i].includes(splitGuess[i]) && sol[i] != splitGuess[i])) {
        statuses[i] = 'present';
    } else if (possible.every(sol => !sol[i].includes(splitGuess[i]))) {
        statuses[i] = 'absent';
    } else {
        // TODO report the probability distribution.
        statuses[i] = 'unknown';
    }
  }

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
