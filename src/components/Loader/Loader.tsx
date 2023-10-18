import { FC } from 'react';
import styles from './Loader.module.scss';

const { Loader: loader } = styles;

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className = '' }) => {
  return (
    <div className={[loader, className].join(' ')} />
  );
};

Loader.defaultProps = {
  className: '',
};