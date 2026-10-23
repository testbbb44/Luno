import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { FormProvider } from "./FormContext";
import SmallLogo from "../../assets/small-logo.svg";
import { Button } from "../ui/button";
import { Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StepRenderer = ({ currentStep, setCurrentStep }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  console.log("useSelector((state) => state.loading", useSelector((state) => state.loading));
  
  const navigate = useNavigate();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />
        );
      case 2:
        return (
          <StepTwo currentStep={currentStep} setCurrentStep={setCurrentStep} />
        );
      case 3:
        return (
          <StepThree
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 4:
        return (
          <StepFour currentStep={currentStep} setCurrentStep={setCurrentStep} />
        );
      case 5:
        return (
          <StepFive currentStep={currentStep} setCurrentStep={setCurrentStep} />
        );
      default:
        return <div className="">Invalid step</div>;
    }
  };

  return (
    <FormProvider>
      <div className=" relative">
        {isLoading && (
          <div className=" z-40 bg-[#ffffff75] gap-6 flex flex-col justify-center items-center absolute w-[100%] h-[100%]">
            <div className="loader-container shadow-md">
              <img src={SmallLogo} alt="Loading..." className="loader-logo" />
            </div>
            <div className="flex flex-col text-sm gap-4 justify-center items-center">
              <i>Generating contract Please wait...</i>
              <Button
                onClick={() => navigate("/overview")}
                className="bg-primary-background text-white border border-black
                        p-1 h-fit text-xs "
              >
                Minimize <Minimize2 />
              </Button>
            </div>
          </div>
        )}

        {renderStep()}
      </div>
    </FormProvider>
  );
};

export default StepRenderer;
