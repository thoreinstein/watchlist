import { Link, useRouteMatch } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuth0 } from '@auth0/auth0-react'

import logo from './logo.svg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavBar() {
  const { user, logout } = useAuth0()
  const { path } = useRouteMatch()

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-14 w-auto'
                    src={logo}
                    alt='Watchlist'
                  />
                  <img
                    className='hidden lg:block h-14 w-auto'
                    src={logo}
                    alt='Watchlist'
                  />
                </div>
                {user && (
                  <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href='#'
                      className='border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                      Search
                    </a>
                    <a
                      href='#'
                      className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                      Watchlist
                    </a>
                  </div>
                )}
              </div>
              {user && (
                <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              alt=''
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter='transition ease-out duration-200'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'>
                          <Menu.Items
                            static
                            className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}>
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              )}
              {user && (
                <div className='-mr-2 flex items-center sm:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </div>

          {user && (
            <Disclosure.Panel className='sm:hidden'>
              <div className='pt-2 pb-3 space-y-1'>
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <a
                  href='#'
                  className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Search
                </a>
                <a
                  href='#'
                  className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Watchlist
                </a>
              </div>
              <div className='pt-4 pb-3 border-t border-gray-200'>
                <div className='flex items-center px-4'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={user.picture}
                      alt={user.nickname}
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-gray-800'>
                      {user.nickname}
                    </div>
                    <div className='text-sm font-medium text-gray-500'>
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className='mt-3 space-y-1'>
                  <button
                    onClick={() => {
                      logout({ returnTo: window.location.origin })
                    }}
                    className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'>
                    Sign out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
