"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const users = Object.fromEntries(formData.entries());
    const { data , error} = await authClient.signIn.email({
        ...users,
    })
    

    try {
     

      toast.success("Login Successful!");
      router.push("/"); 
    } catch (error) {
      toast.error(error.message || "Invalid email or password. Try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
     

      toast.success("Logged in with Google successfully!");
      router.push("/"); 
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-background to-default-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl" radius="lg">
        
        <Form className="w-full flex flex-col gap-6" onSubmit={handleLoginSubmit}>
          <Fieldset className="w-full flex flex-col gap-4">
            
            <div className="flex flex-col gap-1 items-center justify-center text-center mb-2">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <Description>Log in to your account to continue</Description>
            </div>

            <FieldGroup className="w-full flex flex-col gap-4">
              
              <TextField isRequired name="email" type="email" className="w-full">
                <Label>Email</Label>
                <div className="relative flex items-center w-full">
                  <Mail className="absolute left-3 text-default-400 w-4 h-4 z-10 pointer-events-none" />
                  <Input placeholder="Enter your email" className="w-full pl-7" />
                </div>
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password" className="w-full">
                <Label>Password</Label>
                <div className="relative flex items-center w-full">
                  <Lock className="absolute left-3 text-default-400 w-4 h-4 z-10 pointer-events-none" />
                  <Input placeholder="Enter your password" className="w-full pl-7" />
                </div>
                <FieldError />
              </TextField>

            </FieldGroup>

            <Fieldset.Actions className="mt-2 w-full">
              <Button color="primary" type="submit" className="w-full font-semibold">
                Login
              </Button>
            </Fieldset.Actions>

          </Fieldset>
        </Form>

        <div className="flex items-center my-4 w-full">
          <div className="flex-1 h-[1px] bg-default-200" />
          <span className="text-tiny text-default-400 px-3 uppercase">OR</span>
          <div className="flex-1 h-[1px] bg-default-200" />
        </div>

        <Button
          variant="bordered"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border-default-200 font-medium mb-4"
        >
          <BsGoogle />
          Log in with Google
        </Button>

        <p className="text-center text-small text-default-500">
          New here?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Register an account
          </Link>
        </p>
        
      </Card>
    </div>
  );
}