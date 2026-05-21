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
import { Mail, Lock, User, Image } from "lucide-react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const users = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", users);
    const {data , error} = await authClient.signUp.email({
        ...users,
        
    })
    console.log({data,error});
    
    try {
        toast.success("Registration Successful!");
        router.push("/login");
    } catch (error) {
        toast.error(error.message || "Registration failed. Try again.");
    }
    
  };
  const handleGoogleLogin = async () => {
      try {
        const data = await authClient.signIn.social({
          provider:"google"
        })
         if(data?.user){
  
             toast.success("Logged in with Google successfully!");
             router.push("/"); 
         }
      } catch (error) {
        toast.error("Google Login Failed");
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-background to-default-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl" radius="lg">
        
        <Form className="w-full flex flex-col gap-6" onSubmit={handleRegisterSubmit}>
          <Fieldset className="w-full flex flex-col gap-4">
            
            <div className="flex flex-col gap-1 items-center justify-center text-center mb-2">
              <h2 className="text-2xl font-bold text-foreground">Create an Account</h2>
              <Description>Sign up to get started</Description>
            </div>

            <FieldGroup className="w-full flex flex-col gap-4">
              
              <TextField isRequired name="name" className="w-full">
                <Label>Name</Label>
                <div className="relative flex items-center w-full">
                  <User className="absolute left-3 text-default-400 w-4 h-4 z-10 pointer-events-none" />
                  <Input placeholder="Enter your full name" className="w-full pl-7" />
                </div>
                <FieldError />
              </TextField>

              <TextField isRequired name="email" type="email" className="w-full">
                <Label>Email</Label>
                <div className="relative flex items-center w-full">
                  <Mail className="absolute left-3 text-default-400 w-4 h-4 z-10 pointer-events-none" />
                  <Input placeholder="Enter your email" className="w-full pl-7" />
                </div>
                <FieldError />
              </TextField>

              <TextField isRequired name="image" type="url" className="w-full">
                <Label>Photo URL</Label>
                <div className="relative flex items-center w-full">
                  <Image width={200} hanging={200} className="absolute left-3 text-default-400 w-4 h-4 z-10 pointer-events-none" />
                  <Input placeholder="https://example.com/photo.jpg" className="w-full pl-7" />
                </div>
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full"
                validate={(value) => {
                  if (value.length < 6) {
                    return "Password must be at least 6 characters long.";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must have at least one uppercase letter.";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "Password must have at least one lowercase letter.";
                  }
                  return null;
                }}
              >
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
                Register
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
         onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full flex items-center justify-center gap-2 border-default-200 font-medium mb-4"
        >
          <BsGoogle />
          Sign up with Google
        </Button>

        <p className="text-center text-small text-default-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Login here
          </Link>
        </p>
        
      </Card>
    </div>
  );
}