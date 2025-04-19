"use client";
import { useAuth } from "@/app/context.js/AuthContext";

import { createUser } from "../api/actions/register";
import { useActionState } from "react";
import React from "react";
import Input, { DatePicker } from "@/app/global_components/Input";
import Link from "next/link";
import LoadingModal from "@/app/global_components/LoadingModal";
import Modal from "@/app/global_components/Modal";
const page = () => {
  const { login } = useAuth();
  const initialState = { error: null, success: false };
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState
  );
  const goToHome = () => {
    login(state.user);
  };
  return (
    <>
      {isPending && <LoadingModal />}
      <Modal isOpen={state.success} first={goToHome} />
      <div className="h-full w-full bg-background px-30 pt-[76px] box-border">
        <div className="flex flex-col items-start justify-center h-full w-full ">
          <h2 className="text-[58px] font-bold">Register</h2>
          <p className="mb-[50px]">
            Please input your information in the fields below <br />
            to enter your Journey platform.
          </p>
          <form
            action={formAction}
            className="w-full flex flex-col items-start justify-center "
          >
            <div className="flex gap-5">
              <Input
                placeholder="First Name"
                name="fname"
                title="First Name"
                type="text"
              />
              <Input
                placeholder="Last Name"
                name="lname"
                title="Last Name"
                type="text"
              />
            </div>
            <DatePicker />
            <Input
              placeholder="Enter your email"
              name="email"
              title="Email"
              type="email"
            />
            <Input
              placeholder="Enter your password"
              name="password"
              title="Password"
              type="password"
            />

            <p className="text-red-700">{state.error}</p>
            <button
              className="btn btn-primary mt-10 w-full"
              disabled={state.success}
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="text-center mx-auto mt-20">
            <p className="mb-2">Allready a member?</p>
            <Link href="login" className="text-blue-600">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
