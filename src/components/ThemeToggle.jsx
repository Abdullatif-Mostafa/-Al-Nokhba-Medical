import { useTheme } from '../context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={dark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      title={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}
    >
      <div className={`${styles.track} ${dark ? styles.trackDark : ''}`}>
        <div className={`${styles.thumb} ${dark ? styles.thumbDark : ''}`}>
          <i className={`fas ${dark ? 'fa-moon' : 'fa-sun'} ${styles.icon}`} />
        </div>
        <span className={styles.labelLight}><i className="fas fa-sun" /></span>
        <span className={styles.labelDark}><i className="fas fa-moon" /></span>
      </div>
    </button>
  )
}
