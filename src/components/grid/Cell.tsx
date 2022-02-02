import { CharStatus, Superposition } from '../../lib/statuses'
import classnames from 'classnames'
import { useState } from 'react'

type Props = {
  value?: string;
  status?: Superposition;
  setModalOpen?: (arg0: boolean) => void;
}

export const Cell = ({ value, status, setModalOpen }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white border-slate-200': !status,
      'border-black': value && !status,
      'text-white': !!status,
      'bg-slate-400': status && status.absent === status.total,
      'bg-green-500': status && status.correct === status.total,
      'bg-yellow-500': status && status.present === status.total,
      'present-correct': status && status.correct > 0 && status.present > 0 && status.absent === 0,
      'absent-correct': status && status.correct > 0 && status.present === 0 && status.absent > 0,
      'absent-present': status && status.correct === 0 && status.present > 0 && status.absent > 0,
      'absent-present-correct': status && status.correct > 0 && status.present > 0 && status.absent > 0,
      'cell-animation': !!value,
      'cursor-pointer': !!status,
    }
  )

  return (
    <>
        <div className={classes} onClick={status && setModalOpen && (() => setModalOpen(true))}>{value}</div>
    </>
  );
}
