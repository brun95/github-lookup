import SvgImage from '../layout/assets/code-svgrepo-com.svg'

const Footer = () => {
    const  footerYear = new Date().getFullYear

    return (
        <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
            <div>
                <img src={SvgImage} alt='Footer logo'/>
                <p>Copyright &copy; {footerYear} All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer