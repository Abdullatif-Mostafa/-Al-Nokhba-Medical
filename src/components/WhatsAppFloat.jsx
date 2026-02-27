import { WHATSAPP_NUMBER } from '../data'
import styles from './WhatsAppFloat.module.css'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      className={styles.float}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp" />
      <span className={styles.tooltip}>تواصل معنا الآن!</span>
    </a>
  )
}
