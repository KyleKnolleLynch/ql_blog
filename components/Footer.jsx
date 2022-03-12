const Footer = () => {
  return (
    <footer className="container mx-auto relative z-10 mt-auto flex h-24 items-center justify-center border-t">
      <p>Footer</p>
      <style jsx>{`
        footer {
          color: var(--clr-gray-100);
          border-color: var(--clr-secondary);
        }
      `}</style>
    </footer>
  )
}
export default Footer