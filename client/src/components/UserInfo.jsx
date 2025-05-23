import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getInitials } from "../utils";

export default function UserInfo({ user }) {
  return (
    <div className='px-4'>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              className={` group inline-flex items-center outline-none `}
            >
              <span className='text-center'>{getInitials(user?.name)}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute z-10 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 w-80 sm:px-0 '>
                <div className='flex items-center gap-4 p-8 bg-white rounded-lg shadow-lg'>
                  <div className='flex items-center justify-center w-16 h-16 text-2xl text-white bg-purple-600 rounded-full '>
                    <span className='font-bold text-center'>
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-xl font-bold text-black'>{user?.name}</p>
                    <span className='text-base text-gray-500'>
                      {user?.title}
                    </span>
                    <span className='text-purple-500'>
                      {user?.email ?? "email@example.com"}
                    </span>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
