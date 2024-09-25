import { Link } from "react-router-dom";
import logo from "../../assets/images/conqueror_logo.png"
import SearchIcon from "../../assets/icons/SearchIcon";

const PublicLayout = ({ children }) => {
    return (
        <section className="bg-[#F4F5F7]">
            <header className="bg-white shadow py-5 sticky top-0 z-50">
                <div className="container max-sm:px-2.5 flex items-center justify-between">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-[120px] sm:w-[150px] h-auto" />
                    </Link>

                    <div className="relative flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-[#F7FAFC] rounded-xl pl-3 pr-7 py-2 text-sm text-[#A1A1AA] 
                            w-[170px] sm:w-[215px] border border-[#E2E8F0] outline-none" 
                        />

                        <div className="absolute right-2">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </header>

                {children}

            <footer className="container max-sm:px-2.5 flex gap-2 flex-col md:flex-row justify-between items-center py-5">
                <p className="text-[15px] text-[#0B4871]">
                    <span className="text-2xl font-bold text-[#0B4871]">Conqueror </span> 
                    &copy; 2024, All rights reserved
                </p>

                <div className="flex items-center gap-7">
                    <a href="/" className="text-[15px] text-[#0B4871]">Privacy Policy</a>
                    <a href="/" className="text-[15px] text-[#0B4871]">Terms & Conditions</a>
                    <a href="/" className="text-[15px] text-[#0B4871]">Support</a>
                </div>
            </footer>
        </section>
    );
}
 
export default PublicLayout;