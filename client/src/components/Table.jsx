import clsx from "clsx";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { useTrashTestMutation } from "../redux/slices/api/taskApiSlice.js";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils/index.js";
// import Button from "./Button.jsx";
// import ConfirmatioDialog from "./ConfirmationDialog.jsx";
// import UserInfo from "./UserInfo.jsx";
// import TaskAssets from "./tasks/TaskAssets.jsx";
// import TaskColor from "./tasks/TaskColor.jsx";
import { ConfirmationDialog, UserInfo, Button } from "./index";
import { AddTask, TaskAssets, TaskColor } from "./tasks";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteTask] = useTrashTestMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClickHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300 dark:border-gray-600'>
      <tr className='w-full text-left text-black dark:text-white'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='text-gray-600 border-b border-gray-200 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <TaskColor className={TASK_TYPE[task.stage]} />
          <p className='w-full text-base text-black line-clamp-2'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-gray-600'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <TaskAssets
          activities={task?.activities?.length}
          subTasks={task?.subTasks?.length}
          assets={task?.assets?.length}
        />
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='flex justify-end gap-2 py-2 md:gap-4'>
        <Button
          className='text-sm text-blue-600 hover:text-blue-500 sm:px-0 md:text-base'
          label='Edit'
          type='button'
          onClick={() => editClickHandler(task)}
        />

        <Button
          className='text-sm text-red-700 hover:text-red-500 sm:px-0 md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='px-2 pt-4 bg-white rounded shadow-md md:px-4 pb-9'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
