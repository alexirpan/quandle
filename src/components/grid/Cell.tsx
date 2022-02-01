import { CharStatus, Superposition } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: Superposition
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white border-slate-200': !status,
      'border-black': value && !status,
      'text-white': !!status,
      'bg-slate-400': status && status.absent === status.total,
      'bg-green-500': status && status.correct === status.total,
      'bg-yellow-500': status && status.present === status.total,
      'bg-gradient-to-r from-green-500 to-yellow-500': status && status.correct > 0 && status.present > 0 && status.absent === 0,
      'bg-gradient-to-r from-green-500 to-slate-400': status && status.correct > 0 && status.present === 0 && status.absent > 0,
      'bg-gradient-to-r from-yellow-500 to-slate-400': status && status.correct === 0 && status.present > 0 && status.absent > 0,
      'bg-gradient-to-r from-green-500 via-yellow-500 to-slate-400': status && status.correct > 0 && status.present > 0 && status.absent > 0,
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
