import styles from './style.module.scss'

const items = [
  {
    colorTitle: 'primary',
    colorHash: '4f853f',
  },
  {
    colorTitle: 'secondary',
    colorHash: 'd6fcca',
  },
  {
    colorTitle: 'light-alt',
    colorHash: 'f7fff4',
  },
  {
    colorTitle: 'light',
    colorHash: 'fff',
  },
  {
    colorTitle: 'dark',
    colorHash: '000',
  },
  {
    colorTitle: 'dark-alt',
    colorHash: '344b2d'
  }
]

export const Header = () => {

  return (
    <header className={styles['header']}></header>
  );
};
