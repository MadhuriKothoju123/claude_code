function HomePage() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: '0 auto',
        paddingTop: 64,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        style={{
          border: '1px solid #d1d5db',
          borderRadius: 4,
          padding: 32,
        }}
      >
        <h1
          style={{
            fontSize: '2.125rem',
            fontWeight: 400,
            margin: '0 0 8px 0',
          }}
        >
          my-app
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(0, 0, 0, 0.6)',
            margin: 0,
          }}
        >
          CICD INTEGRTION
        </p>
      </div>
    </main>
  )
}

export default HomePage