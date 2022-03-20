const Footer = () => {
  return (
    <footer className="container mx-auto text-gray-100 relative z-10 mt-auto flex h-24 items-center justify-center border-t">
      <p>QL Blog by Kyle Lynch &copy; 2022</p>
      <style jsx>{`
        footer {
          border-color: var(--clr-secondary);
        }
      `}</style>
    </footer>
  )
}
export default Footer