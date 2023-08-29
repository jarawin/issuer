import { IoMdClose } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";

function YesNoModal(props: any) {
  const [isYesNoModalOpen, setIsYesNoModalOpen] = props.isYesNoModalOpen;
  const { handleSuccess, itemSelected } = props;

  return (
    <div
      className={
        (!isYesNoModalOpen ? "hidden" : "") +
        " grid place-items-center justify-center z-50 items-center justify-items-center"
      }
      style={{ opacity: isYesNoModalOpen ? 1 : 0 }}
    >
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 "></div>
      <div
        id="popup-modal"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsYesNoModalOpen(false)}
            >
              <IoMdClose className="w-6 h-6" />
            </button>
            <div className="p-6 text-center">
              <PiWarningCircleBold className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this acquiring?
              </h3>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2"
                onClick={() => setIsYesNoModalOpen(false)}
              >
                No, cancel
              </button>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                onClick={() => handleSuccess(itemSelected)}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YesNoModal;
