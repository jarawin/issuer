import { MdEdit, MdEditOff } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { TbTrashOff, TbTrash } from "react-icons/tb";

function SpeedDial(props: any) {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = props.isSpeedDialOpen;
  const { itemSelected } = props;

  const dialList = [
    {
      title: "Add",
      icon: FaPlus,
      func: props.handleClickAdd,
      iconOff: FaPlus,
    },
    {
      title: "Edit",
      icon: MdEdit,
      func: props.handleClickEdit,
      iconOff: MdEditOff,
    },
    {
      title: "Delete",
      icon: TbTrash,
      func: props.handleClickDelete,
      iconOff: TbTrashOff,
    },
  ];

  return (
    <div
      data-dial-init
      className="fixed right-3 sm:right-6 bottom-5 group h-fit overflow-visible z-40"
    >
      <div
        className=" flex flex-col items-center mb-4 space-y-2 transform duration-200 "
        style={{
          transform: !isSpeedDialOpen ? "translateY(300px)" : "translateY(0)",
          opacity: !isSpeedDialOpen ? 0 : 1,
        }}
      >
        {dialList.map((dial: any, idx: number) => (
          <div key={idx}>
            <button
              type="button"
              className={
                ((idx === 0 ? false : itemSelected === "")
                  ? "cursor-not-allowed"
                  : "") +
                " flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              }
              onClick={() => dial.func()}
              disabled={idx === 0 ? false : itemSelected === ""}
            >
              {(idx === 0 ? false : itemSelected === "") ? (
                <dial.iconOff className="w-6 h-6 text-gray-500" />
              ) : (
                <dial.icon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            <div
              className={
                " opacity-0 absolute z-10 visible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-700 -translate-x-16 -translate-y-full group-hover:opacity-50 dark:group-hover:opacity-50 dark:group-hover:translate-x-0 dark:group-hover:translate-y-0 focus:outline-none ring-0 right-0"
              }
            >
              {dial.title}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
      >
        <IoMdAdd className="w-8 h-8 transition-transform group-hover:rotate-45 text-white" />
      </button>
    </div>
  );
}

export default SpeedDial;
