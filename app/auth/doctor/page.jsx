"use client";
import { useAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import { doctorLogin } from "../api/actions/doctor";
import { useActionState, useEffect } from "react";
import LoadingModal from "@/app/global_components/LoadingModal";

import React from "react";
import Input from "@/app/global_components/Input";
import Link from "next/link";
const page = () => {
  const { login } = useAuth();
  const initialState = { error: null, success: false };
  const [state, formAction, isPending] = useActionState(
    doctorLogin,
    initialState
  );
  useEffect(() => {
    if (state.success) {
      login(state.doctor);
    }
  }, [state]);

  return (
    <>
      {isPending && <LoadingModal />}
      <div className="h-full w-full bg-background px-30 pt-[76px] box-border">
        <div className="flex flex-col items-start justify-center h-full w-full ">
          <h2 className="text-[58px] font-bold">Doctor Login</h2>
          <p className="mb-[50px]">Welcome back! Please enter your details</p>
          <form
            action={formAction}
            className="w-full flex flex-col items-start justify-center "
          >
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
            <button className="btn btn-primary mt-10 w-full" type="submit">
              Login
            </button>
          </form>
          <div className="text-center mx-auto mt-30">
            <p className="mb-2">Don't have account?</p>
            <Link href="register" className="text-blue-600">
              Register here
            </Link>
            {state.success && <p>Moce</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
