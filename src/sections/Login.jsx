import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    const ok = login(username, password)
    if (!ok) {
      setError('اسم المستخدم أو كلمة المرور غلط')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb orb1" />
        <div className="login-orb orb2" />
        <div className="login-orb orb3" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">🏥</div>
          <h1>عيادة النخبة</h1>
          <p>لوحة تحكم الإدارة</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="field">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="login-error">⚠️ {error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
