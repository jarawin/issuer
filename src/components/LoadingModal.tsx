import { ImSpinner3 } from "react-icons/im";

function LoadingModal(props: any) {
  const [isLoadingModalOpen, setIsLoadingModalOpen] = props.isLoadingModalOpen;

  if (isLoadingModalOpen) {
    return (
      <div className=" grid place-items-center justify-center z-50 items-center justify-items-center">
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 "></div>
        <div
          id="popup-modal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="flex flex-col items-center text-white animate-pulse justify-center mx-auto text-center">
            <ImSpinner3 className="w-16 h-16 mx-1 animate-spin  mb-3" />
            <span className=" font-semibold text-xl">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingModal;
