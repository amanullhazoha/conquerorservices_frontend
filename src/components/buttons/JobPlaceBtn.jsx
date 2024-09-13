import ArrowRightIcon from "../../assets/icons/ArrowRight";
import SelectIcon from "../../assets/icons/SelectIcon";

const JobPlaceBtn = ({
    handleNext,
    submit=false,
    previous=true,
    handlePrevious
}) => {
    return (
        <div className="flex gap-3 max-md:flex-col md:justify-end">
            {previous && (
                <button 
                    type="button" 
                    onClick={handlePrevious}
                    className="bg-[#27303F] text-white text-base font-semibold px-5 py-1.5 rounded-lg">
                        Previous
                    </button>
            )}

            <button 
                type="submit" 
                // onClick={handleNext}
                className="bg-[#1278BC] text-white text-base font-semibold px-5 py-1.5 rounded-lg flex gap-2 items-center max-md:justify-center"
            >
                {submit ? "Submit" : "Save & Continue"}
                {submit ? <SelectIcon /> : <ArrowRightIcon />}
            </button>
        </div>
    );
}
 
export default JobPlaceBtn;