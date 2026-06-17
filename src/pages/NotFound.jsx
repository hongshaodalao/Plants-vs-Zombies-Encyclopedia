import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>
        哎呀，僵尸把这里吃掉了！
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-sun)',
          color: 'var(--color-text-primary)',
          borderRadius: 'var(--radius-md)',
          fontWeight: 'bold'
        }}
      >
        返回首页
      </Link>
    </div>
  )
}

export default NotFound
