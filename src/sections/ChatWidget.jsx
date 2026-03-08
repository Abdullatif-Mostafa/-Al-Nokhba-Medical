// src/components/ChatWidget.jsx
// أضف هذا المكون للمشروع وأضفه في App.jsx

import { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'

// ⚠️ غيّر هذا الـ URL لرابط الـ Webhook بتاعك من n8n
const N8N_WEBHOOK_URL = 'http://localhost:5677/webhook/clinic-chat'
// const N8N_WEBHOOK_URL = 'https://n8n.tifacom.cfd/webhook-test/clinic-chat'
const WHATSAPP_NUMBER = '01032558781'

const QUICK_REPLIES = [
  { label: '📅 حجز موعد', message: 'أريد حجز موعد' },
  { label: '💰 الأسعار', message: 'ما هي أسعار الكشف؟' },
  { label: '👨‍⚕️ الأطباء', message: 'من هم أطباء العيادة؟' },
  { label: '🕐 أوقات العمل', message: 'ما هي أوقات عمل العيادة؟' },
]

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: 'أهلاً وسهلاً! 👋\nأنا المساعد الذكي لعيادة النخبة.\nكيف يمكنني مساعدتك اليوم؟',
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const [sessionId] = useState(generateSessionId)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const addMessage = (from, text, extra = {}) => {
    const msg = {
      id: Date.now(),
      from,
      text,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      ...extra
    }
    setMessages(prev => [...prev, msg])
    if (from === 'bot' && !open) setUnread(u => u + 1)
    return msg
  }

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return

    addMessage('user', text)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId,
          name: 'زائر',
          source: 'website'
        })
      })

      if (!res.ok) throw new Error('فشل الاتصال')

      const data = await res.json()

      addMessage('bot', data.reply || 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.', {
        showBookingBtn: data.show_booking_btn,
        showWhatsappBtn: data.whatsapp_redirect,
        intent: data.intent
      })

    } catch (err) {
      // Fallback لو n8n مش شغال
      addMessage('bot', 'عذراً، يبدو أن هناك مشكلة في الاتصال. 😔\n\nيمكنك التواصل معنا مباشرة عبر واتساب أو الاتصال بنا.', {
        showWhatsappBtn: true
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ===== زر فتح الشات ===== */}
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="فتح المحادثة"
      >
        {open
          ? <i className="fas fa-times" />
          : <i className="fas fa-comments" />
        }
        {unread > 0 && !open && (
          <span className={styles.badge}>{unread}</span>
        )}
        {!open && (
          <span className={styles.triggerLabel}>تحدث معنا</span>
        )}
      </button>

      {/* ===== نافذة الشات ===== */}
      <div className={`${styles.window} ${open ? styles.windowOpen : ''}`}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>
              <i className="fas fa-robot" />
              <span className={styles.onlineDot} />
            </div>
            <div>
              <strong>مساعد عيادة النخبة</strong>
              <span>متاح الآن • يرد خلال ثوانٍ</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map(msg => (
            <div key={msg.id} className={`${styles.msg} ${msg.from === 'user' ? styles.msgUser : styles.msgBot}`}>
              {msg.from === 'bot' && (
                <div className={styles.botAvatar}><i className="fas fa-robot" /></div>
              )}
              <div className={styles.msgContent}>
                <div className={styles.bubble}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>

                {/* أزرار إضافية */}
                {msg.showBookingBtn && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، أريد حجز موعد في عيادة النخبة')}`}
                    target="_blank" rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    <i className="fab fa-whatsapp" /> احجز الآن عبر واتساب
                  </a>
                )}
                {msg.showWhatsappBtn && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank" rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    <i className="fab fa-whatsapp" /> تحدث مع موظف
                  </a>
                )}

                <div className={styles.time}>{msg.time}</div>
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div className={`${styles.msg} ${styles.msgBot}`}>
              <div className={styles.botAvatar}><i className="fas fa-robot" /></div>
              <div className={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className={styles.quickReplies}>
            {QUICK_REPLIES.map(q => (
              <button key={q.label} className={styles.quickBtn} onClick={() => sendMessage(q.message)}>
                {q.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            disabled={loading}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || loading}
          >
            <i className="fas fa-paper-plane" />
          </button>
        </form>

        <div className={styles.footer}>
          مدعوم بالذكاء الاصطناعي • عيادة النخبة الطبية
        </div>
      </div>
    </>
  )
}
