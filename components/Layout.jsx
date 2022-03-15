import Header from './Header'
import Background from './Background'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div className="background-overlay relative flex flex-col min-h-screen w-full after:absolute after:inset-0 after:mix-blend-multiply leading-8 md:leading-loose tracking-wide">
            <Background />
            <Header />
            <main className='relative z-10 px-2 py-10 sm:container sm:mx-auto sm:px-10'>{children}</main>
            <Footer />
            <style jsx>{`
                .background-overlay::after {
                    background-color: var(--clr-primary);
                }
            `}</style>
        </div>
    )
}
export default Layout