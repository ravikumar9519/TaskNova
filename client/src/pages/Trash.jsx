import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { toast } from "sonner";
import {
  AddUser,
  Button,
  ConfirmationDialog,
  Loading,
  Title,
} from "../components";
import { TaskColor } from "../components/tasks";
import {
  useDeleteRestoreTestMutation,
  useGetAllTaskQuery,
} from "../redux/slices/api/taskApiSlice";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils/index";
import { useSearchParams } from "react-router-dom";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: searchTerm,
  });
  const [deleteRestoreTask] = useDeleteRestoreTestMutation();

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };
  // WE GO HERE ON RESUME
  const deleteRestoreHandler = async () => {
    try {
      let res = null;

      switch (type) {
        case "delete":
          res = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;
        case "deleteAll":
          res = await deleteRestoreTask({
            id: "",
            actionType: "deleteAll",
          }).unwrap();
          break;
        case "restore":
          res = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;
        case "restoreAll":
          res = await deleteRestoreTask({
            id: "",
            actionType: "restoreAll",
          }).unwrap();
          break;
      }

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 dark:border-gray-600'>
      <tr className='text-left text-black dark:text-white'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='text-gray-600 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <TaskColor className={TASK_TYPE[item.stage]} />
          <p className='w-full text-base text-black line-clamp-2 dark:text-gray-400'>
            {item?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 text-center capitalize md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

      <td className='flex justify-end gap-1 py-2'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <>
      <div className='w-full px-0 mb-6 md:px-1'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />

          {data?.tasks?.length > 0 && (
            <div className='flex items-center gap-2 md:gap-4'>
              <Button
                label='Restore All'
                icon={<MdOutlineRestore className='hidden text-lg md:flex' />}
                className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
                onClick={() => restoreAllClick()}
              />
              <Button
                label='Delete All'
                icon={<MdDelete className='hidden text-lg md:flex' />}
                className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                onClick={() => deleteAllClick()}
              />
            </div>
          )}
        </div>
        {data?.tasks?.length > 0 ? (
          <div className='bg-white dark:bg-[#1f1f1f] px-2 md:px-6 py-4 shadow-md rounded'>
            <div className='overflow-x-auto'>
              <table className='w-full mb-5'>
                <TableHeader />
                <tbody>
                  {data?.tasks?.map((tk, id) => (
                    <TableRow key={id} item={tk} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='flex justify-center w-full py-10'>
            <p className='text-lg text-gray-500'>No Trashed Task</p>
          </div>
        )}
      </div>

      <AddUser open={open} setOpen={setOpen} />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
