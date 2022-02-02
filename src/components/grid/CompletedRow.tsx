import { useState } from 'react';
import { getGuessStatusSuperpos } from '../../lib/statuses';
import { Cell } from './Cell';
import { ObserveModal } from '../modals/ObserveModal';

type Props = {
  guess: string
  realities: string[]
}

export const CompletedRow = ({ guess, realities }: Props) => {
  // TODO known char
  const superpos = getGuessStatusSuperpos(guess, realities);
  console.log(guess);
  console.log(superpos);
  let modalBools : boolean[] = [];
  let setModalBools : ((arg0: boolean) => void)[] = [];
  // Avoid hardcoding length
  let [isModalOpen0, setIsModalOpen0] = useState<boolean>(false);
  modalBools[0] = isModalOpen0;
  setModalBools[0] = setIsModalOpen0;
  let [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
  modalBools[1] = isModalOpen1;
  setModalBools[1] = setIsModalOpen1;
  let [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  modalBools[2] = isModalOpen2;
  setModalBools[2] = setIsModalOpen2;
  let [isModalOpen3, setIsModalOpen3] = useState<boolean>(false);
  modalBools[3] = isModalOpen3;
  setModalBools[3] = setIsModalOpen3;
  let [isModalOpen4, setIsModalOpen4] = useState<boolean>(false);
  modalBools[4] = isModalOpen4;
  setModalBools[4] = setIsModalOpen4;

  // the modals need to exist here because if they exist on Cell, we get a recursion between
  // ObserveModal and the Cells in ObserveModal
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <>
            <Cell
                key={i}
                value={letter}
                status={superpos[i]}
                setModalOpen={setModalBools[i]}
                />
            <ObserveModal
                key={`observe-${i}`}
                isOpen={modalBools[i]}
                handleClose={() => setModalBools[i](false)}
                status={superpos[i]}
                guess={guess}
                index={i}
            />
        </>
      ))}
    </div>
  )
}
