import React from 'react'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink } from 'react-router-dom'

export default function UserProfile() {
    const { user, setUser } = useContext(UserContext)
  
    return (

        <div className='min-h-screen bg-slate-200 pt-10 flex flex-row'>
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
                <div class="rounded-lg shadow p-6 bg-white mb-20 w-full">
                    <h2 class="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                    Your Profile
                    </h2>
                    <div class="pb-6">
                        <label for="name" class="font-semibold text-gray-700 block pb-1">First Name</label>
                        <div class="flex">
                            <input disabled id="username" class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" type="text" value={user?.first_name} />
                        </div>
                    </div>
                    <div class="pb-4">
                        <label for="about" class="font-semibold text-gray-700 block pb-1">Last Name</label>
                        <input disabled id="email" class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" type="email" value={user?.last_name} />
                    </div>
                    <div class="pb-4">
                        <label for="about" class="font-semibold text-gray-700 pb-1 inline-block">Email</label>
                        <NavLink to={`/email_change`}>
                            <span className='text-sm text-gray-700 pb-1 inline-block ml-1.5 opacity-70 hover:text-black font-semibold'>change</span>
                        </NavLink>
                        <input disabled id="email" class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" type="email" value={user?.email} />
                    </div>
                    <div class="pb-4">
                        <label for="about" class="font-semibold text-gray-700 block pb-1">Role</label>
                        <input disabled id="email" class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" type="email" value={user?.admin ? "Professor" : "Student"} />
                    </div>
                    <span class="text-gray-600 pt-1 block opacity-70 text-center">Click                     
                    <NavLink to={`/password_change`}>
                        <span className='hover:text-black font-semibold'> here </span>
                    </NavLink>to change your password</span>
                </div>
            </div>
        </div>
        

    )
}
