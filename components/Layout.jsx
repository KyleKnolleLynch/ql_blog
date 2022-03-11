import Header from './Header'
import Background from './Background'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen w-full after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-blue-500 after:mix-blend-multiply">
            <Background />
            <Header />
            <main className='relative z-10 px-2 py-10 sm:container sm:mx-auto sm:px-10'>{children}</main>
            <Footer />
        </div>
    )
}
export default Layout