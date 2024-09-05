import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import SearchIcon from "../../assets/icons/SearchIcon";

const PublicLayout = ({ children }) => {
    return (
        <section className="bg-[#F4F5F7]">
            <header className="bg-white shadow py-5">
                <div className="container max-sm:px-2.5 flex items-center justify-between">
                    <a href="/">
                        <img src={logo} alt="logo" />
                    </a>

                    <div className="relative flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-[#F7FAFC] rounded-xl pl-3 pr-7 py-2 text-sm text-[#A1A1AA] 
                            w-[215px] border border-[#E2E8F0] outline-none" 
                        />

                        <div className="absolute right-2">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </header>

                {children}

            <footer className="container flex justify-between items-center py-5">
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